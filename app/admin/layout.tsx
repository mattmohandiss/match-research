import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const adminEmail = process.env.ADMIN_EMAIL || "admin@matchresearch.com";

  if (!user) {
    redirect("/login?redirect=/admin");
  }

  if (user.email !== adminEmail) {
    redirect("/");
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="border-b bg-background">
        <div className="container py-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🛡️</span>
            <h1 className="text-xl font-bold">Admin Panel</h1>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            Manage studies, users, and platform content
          </p>
        </div>
      </div>
      {children}
    </div>
  );
}
