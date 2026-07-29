-- Atomically checks remaining capacity for a date+time and inserts the
-- reservation in the same statement, so two concurrent requests for the
-- last open spot can't both succeed (classic check-then-insert race).
--
-- pg_advisory_xact_lock serializes concurrent calls for the *same*
-- date+time slot (the lock key is derived from them) without blocking
-- bookings for other slots, and releases automatically at the end of the
-- transaction — no manual unlock needed.
create or replace function book_reservation(
  p_name text,
  p_email text,
  p_phone text,
  p_party_size int,
  p_date date,
  p_time time,
  p_occasion text,
  p_notes text
) returns table (id uuid, status text, remaining int) as $$
declare
  v_capacity int;
  v_booked int;
  v_new_id uuid;
begin
  if p_party_size is null or p_party_size < 1 then
    return query select null::uuid, 'invalid_party_size'::text, null::int;
    return;
  end if;

  perform pg_advisory_xact_lock(hashtextextended(p_date::text || p_time::text, 0));

  select capacity into v_capacity
  from slot_capacity
  where slot_time = p_time;

  if v_capacity is null then
    return query select null::uuid, 'unknown_slot'::text, null::int;
    return;
  end if;

  select coalesce(sum(party_size), 0) into v_booked
  from reservations
  where reservation_date = p_date
    and reservation_time = p_time
    and status = 'confirmed';

  if v_booked + p_party_size > v_capacity then
    return query select null::uuid, 'full'::text, greatest(v_capacity - v_booked, 0);
    return;
  end if;

  insert into reservations
    (name, email, phone, party_size, reservation_date, reservation_time, occasion, notes, status)
  values
    (p_name, p_email, p_phone, p_party_size, p_date, p_time, p_occasion, p_notes, 'confirmed')
  returning reservations.id into v_new_id;

  return query
    select v_new_id, 'confirmed'::text, greatest(v_capacity - v_booked - p_party_size, 0);
end;
$$ language plpgsql;
