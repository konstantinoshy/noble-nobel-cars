import { redirect } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { createClient } from "@/lib/supabase/server";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Dashboard",
};

export default async function AdminPage({
  params,
}: {
  params: { locale: string };
}) {
  setRequestLocale(params.locale);

  // Server-side auth check (defense in depth — middleware also guards this)
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect(`/${params.locale}/admin/login`);
  }

  return (
    <main>
      <h1>Admin Dashboard</h1>
      <p>Logged in as: {user.email}</p>
    </main>
  );
}
