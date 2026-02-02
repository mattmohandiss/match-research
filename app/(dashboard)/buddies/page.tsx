import Link from "next/link";
import { getBuddies } from "@/lib/actions/buddies";
import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { BuddyCard } from "@/components/buddies/buddy-card";

export default async function BuddiesPage() {
  const buddies = await getBuddies();
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Get user's role if logged in
  let userRole: string | null = null;
  if (user) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();
    userRole = profile?.role || null;
  }

  return (
    <div className="py-12 px-4">
      <div className="container max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold">Research Buddies</h1>
            <p className="text-muted-foreground mt-1">
              Find collaborators, thesis partners, and fellow researchers
            </p>
          </div>
          {!user && (
            <Button asChild>
              <Link href="/join/buddy">Join as Research Buddy</Link>
            </Button>
          )}
          {user && userRole !== "buddy" && (
            <p className="text-sm text-muted-foreground">
              Want to be listed here?{" "}
              <Link href="/join/buddy" className="text-primary hover:underline">
                Create a buddy profile
              </Link>
            </p>
          )}
        </div>

        {buddies.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🤝</div>
            <h2 className="text-xl font-semibold mb-2">No research buddies yet</h2>
            <p className="text-muted-foreground mb-6">
              Be the first to join as a research buddy and connect with others.
            </p>
            <Button asChild>
              <Link href="/join/buddy">Become a Research Buddy</Link>
            </Button>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Horizontal Scroll Section */}
            <div>
              <h2 className="text-xl font-semibold mb-4">
                Featured Research Buddies
              </h2>
              <ScrollArea className="w-full whitespace-nowrap">
                <div className="flex gap-4 pb-4">
                  {buddies.map((buddy) => (
                    <BuddyCard key={buddy.id} buddy={buddy} />
                  ))}
                </div>
                <ScrollBar orientation="horizontal" />
              </ScrollArea>
            </div>

            {/* Grid View */}
            <div>
              <h2 className="text-xl font-semibold mb-4">All Research Buddies</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {buddies.map((buddy) => (
                  <div key={buddy.id} className="w-full">
                    <BuddyCard buddy={buddy} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
