import Link from "next/link";
import { getApprovedStudies } from "@/lib/actions/studies";
import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import { StudyCard } from "@/components/studies/study-card";

export default async function StudiesPage() {
  const studies = await getApprovedStudies();
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="py-12 px-4">
      <div className="container max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold">Research Studies</h1>
            <p className="text-muted-foreground mt-1">
              Discover research opportunities and contribute to advancing knowledge
            </p>
          </div>
          {user && (
            <Button asChild>
              <Link href="/studies/create">Create Study</Link>
            </Button>
          )}
        </div>

        {studies.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔬</div>
            <h2 className="text-xl font-semibold mb-2">No studies yet</h2>
            <p className="text-muted-foreground mb-6">
              Be the first to create a research study on the platform.
            </p>
            {user ? (
              <Button asChild>
                <Link href="/studies/create">Create Your First Study</Link>
              </Button>
            ) : (
              <Button asChild>
                <Link href="/join">Join to Create Studies</Link>
              </Button>
            )}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {studies.map((study) => (
              <StudyCard key={study.id} study={study} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
