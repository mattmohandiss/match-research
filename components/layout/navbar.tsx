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
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 py-2">
      <div className="container flex h-20 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex flex-col w-min">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🔬</span>
                <span className="font-bold text-xl">Match_Research</span>
              </div>
              <span className="text-xs text-muted-foreground">
                The Goal is to amplify accessibility and collaboration for inclusive knowledge.
              </span>
            </div>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <Link
              href="/studies"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Browse Studies To Participate
            </Link>
            <Link
              href="/buddies"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Find Buddies To Collaborate
            </Link>
            <Link
              href="/about"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              About Us
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
