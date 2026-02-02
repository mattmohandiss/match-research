import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { StudyForm } from "@/components/studies/study-form";

export default async function CreateStudyPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?redirect=/studies/create");
  }

  return (
    <div className="py-12 px-4">
      <div className="container max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Create a Research Study</h1>
          <p className="text-muted-foreground mt-1">
            Fill out the form below to submit your study for review. Once approved,
            it will be visible to all participants.
          </p>
        </div>

        <StudyForm />
      </div>
    </div>
  );
}
