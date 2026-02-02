import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";

export async function Navbar() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const adminEmail = process.env.ADMIN_EMAIL || "admin@matchresearch.com";
  const isAdmin = user?.email === adminEmail;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <span className="text-2xl">🔬</span>
            <span>Match_Research</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <Link
              href="/studies"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Studies
            </Link>
            <Link
              href="/buddies"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Research Buddies
            </Link>
            <Link
              href="/about"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              About
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          {user ? (
            <>
              {isAdmin && (
                <Button variant="outline" size="sm" asChild>
                  <Link href="/admin">Admin Panel</Link>
                </Button>
              )}
              <Button variant="ghost" size="sm" asChild>
                <Link href="/account">My Account</Link>
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/login">Sign In</Link>
              </Button>
              <Button size="sm" asChild>
                <Link href="/join">Join Now</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
