import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // Defense-in-depth: verify auth at the layout level.
  // The middleware handles path-specific redirects, but this strictly enforces it for all admin children.
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect(`/${params.locale}/admin/login`);
  }

  return (
    <div className="min-h-screen">
      {children}
    </div>
  );
}
