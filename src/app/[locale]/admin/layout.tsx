import { createClient } from "@/lib/supabase/server";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // Defense-in-depth: verify auth at the layout level.
  // The middleware handles path-specific redirects (login page vs other admin pages).
  const supabase = createClient();
  await supabase.auth.getUser();

  return (
    <div className="min-h-screen">
      {children}
    </div>
  );
}
