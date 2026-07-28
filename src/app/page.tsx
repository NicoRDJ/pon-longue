import ClockMark from "@/components/ClockMark";

export default function Home() {
  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 px-6 py-6">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <a
            href="#top"
            className="font-display text-cream text-xl tracking-wide"
          >
            PON <em className="text-brass-light italic not-italic">Lounge</em>
          </a>
          <span className="text-cream-muted hidden text-xs tracking-[0.25em] uppercase sm:block">
            La Sala del Tiempo
          </span>
        </div>
      </header>

      <main id="top" className="flex-1">
        <section className="bg-obsidian relative flex min-h-screen items-center overflow-hidden">
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at 15% 20%, rgba(185,141,75,0.14), transparent 55%), radial-gradient(ellipse at 85% 75%, rgba(22,52,43,0.35), transparent 55%)",
            }}
          />

          <div className="relative mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-16 px-6 pt-32 pb-20 md:grid-cols-[1.1fr_0.9fr]">
            <div>
              <div className="text-brass mb-6 inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase">
                <span className="bg-brass h-px w-6" />
                PON Lounge · La Sala del Tiempo
              </div>

              <h1 className="font-display text-cream text-4xl leading-[1.08] sm:text-5xl md:text-6xl">
                Donde el tiempo se detiene
                <br />
                <em className="text-brass-light italic not-italic">
                  y el lujo no tiene hora.
                </em>
              </h1>

              <p className="text-cream-muted mt-6 max-w-lg text-lg">
                Un lounge exclusivo en Medellín, ambientado como una sala de
                colección: relojes exóticos, coctelería de autor y un espacio
                pensado para quienes miden las noches distinto.
              </p>

              <div className="mt-10 flex flex-wrap gap-4">
                <a
                  href="#reservas"
                  className="from-brass-light to-brass text-obsidian shadow-brass-deep/30 rounded-full bg-gradient-to-br px-7 py-3.5 text-sm font-semibold shadow-lg transition-transform hover:-translate-y-0.5"
                >
                  Reservar mesa
                </a>
                <a
                  href="#concepto"
                  className="text-cream hover:border-brass rounded-full border border-white/15 px-7 py-3.5 text-sm font-semibold transition-colors"
                >
                  Conocer el concepto
                </a>
              </div>
            </div>

            <div className="mx-auto w-full max-w-sm md:max-w-none">
              <ClockMark className="mx-auto w-full max-w-[360px] drop-shadow-[0_20px_60px_rgba(185,141,75,0.15)]" />
            </div>
          </div>
        </section>

        <section id="concepto" className="bg-obsidian-soft px-6 py-24">
          <div className="mx-auto max-w-3xl text-center">
            <div className="text-brass mb-4 inline-flex items-center justify-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase">
              <span className="bg-brass h-px w-6" />
              El concepto
              <span className="bg-brass h-px w-6" />
            </div>
            <h2 className="font-display text-cream text-3xl sm:text-4xl">
              Una colección de relojes exóticos, convertida en lugar.
            </h2>
            <p className="text-cream-muted mt-6">
              PON Lounge nace como una sala de tiempo: cada rincón rinde
              homenaje a la relojería de colección, mientras la coctelería de
              autor y el servicio marcan el ritmo de la noche. Este es el punto
              de partida del proyecto — la marca y el concepto ya están
              definidos; el resto del sitio (carta, reservas, galería) se
              construye a partir de aquí.
            </p>
          </div>
        </section>
      </main>

      <footer className="bg-obsidian text-cream-muted border-t border-white/10 px-6 py-10 text-center text-sm">
        © {new Date().getFullYear()} PON Lounge — La Sala del Tiempo. Proyecto
        en construcción.
      </footer>
    </>
  );
}
