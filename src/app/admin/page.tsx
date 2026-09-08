import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/adminAuth";
import AdminLoginForm from "@/components/admin/AdminLoginForm";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Panel de reservas",
  robots: { index: false, follow: false },
};

export default async function AdminPage() {
  if (await isAdminAuthenticated()) {
    redirect("/admin/depositos");
  }

  return (
    <main className="bg-obsidian flex min-h-screen items-center justify-center px-6 py-24">
      <div className="w-full max-w-sm">
        <h1 className="font-display text-cream mb-6 text-center text-2xl">
          Panel de reservas
        </h1>
        <AdminLoginForm />
      </div>
    </main>
  );
}
