import { notFound } from "next/navigation";
import Link from "next/link";
import { getStudyById } from "@/lib/actions/studies";
import { createClient } from "@/lib/supabase/server";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default async function StudyDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const study = await getStudyById(id);

  if (!study) {
    notFound();
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const isOwner = user?.id === study.creator_id;

  return (
    <div className="py-12 px-4">
      <div className="container max-w-4xl mx-auto">
        <Link
          href="/studies"
          className="text-sm text-muted-foreground hover:text-foreground mb-6 inline-flex items-center gap-1"
        >
          ← Back to Studies
        </Link>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="md:col-span-2 space-y-6">
            <div>
              <div className="flex items-start gap-4 mb-4">
                <h1 className="text-3xl font-bold flex-1">{study.title}</h1>
                {isOwner && (
                  <Badge
                    variant={
                      study.status === "approved"
                        ? "default"
                        : study.status === "pending"
                        ? "secondary"
                        : "destructive"
                    }
                  >
                    {study.status.charAt(0).toUpperCase() + study.status.slice(1)}
                  </Badge>
                )}
              </div>

              {study.keywords && study.keywords.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {study.keywords.map((keyword) => (
                    <Badge key={keyword} variant="outline">
                      {keyword}
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            <Separator />

            <div>
              <h2 className="text-xl font-semibold mb-4">About This Study</h2>
              <p className="text-muted-foreground whitespace-pre-wrap">
                {study.description}
              </p>
            </div>

            {/* Role & Impact */}
            {(study.participant_role || study.research_impact) && (
              <>
                <Separator />
                <div className="space-y-4">
                  {study.participant_role && (
                    <div>
                      <h3 className="font-semibold mb-1">Participant Role</h3>
                      <p className="text-muted-foreground">{study.participant_role}</p>
                    </div>
                  )}
                  {study.research_impact && (
                    <div>
                      <h3 className="font-semibold mb-1">Research Impact</h3>
                      <p className="text-muted-foreground">{study.research_impact}</p>
                    </div>
                  )}
                </div>
              </>
            )}

            {/* Participant Criteria */}
            {(study.participant_age_min ||
              study.participant_age_max ||
              study.participant_gender ||
              (study.participant_geography &&
                study.participant_geography.length > 0)) && (
              <>
                <Separator />
                <div>
                  <h2 className="text-xl font-semibold mb-4">
                    Participant Criteria
                  </h2>
                  <div className="space-y-2 text-muted-foreground">
                    {(study.participant_age_min || study.participant_age_max) && (
                      <p>
                        <strong>Age Range:</strong>{" "}
                        {study.participant_age_min || "Any"} -{" "}
                        {study.participant_age_max || "Any"} years
                      </p>
                    )}
                    {study.participant_gender && (
                      <p>
                        <strong>Gender:</strong> {study.participant_gender}
                      </p>
                    )}
                    {study.participant_geography &&
                      study.participant_geography.length > 0 && (
                        <p>
                          <strong>Location:</strong>{" "}
                          {study.participant_geography.join(", ")}
                        </p>
                      )}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Study Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {study.payment_bdt && (
                  <div>
                    <p className="text-sm text-muted-foreground">Compensation</p>
                    <p className="text-2xl font-bold">
                      ৳{study.payment_bdt.toLocaleString()}{" "}
                      <span className="text-sm font-normal text-muted-foreground">
                        BDT
                      </span>
                    </p>
                  </div>
                )}
                {study.duration_minutes && (
                  <div>
                    <p className="text-sm text-muted-foreground">Duration</p>
                    <p className="text-lg font-semibold">
                      {study.duration_minutes} minutes
                    </p>
                  </div>
                )}
                {study.survey_link && (
                  <div>
                    <p className="text-sm text-muted-foreground">Survey / Meeting Link</p>
                    <a
                      href={study.survey_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline break-all"
                    >
                      {study.survey_link.length > 40
                        ? study.survey_link.substring(0, 40) + "..."
                        : study.survey_link}
                    </a>
                  </div>
                )}
                <div>
                  <p className="text-sm text-muted-foreground">Posted</p>
                  <p className="text-sm">
                    {new Date(study.created_at).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Researcher</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-medium">{study.creator?.full_name}</p>
                <p className="text-sm text-muted-foreground">
                  {study.creator?.email}
                </p>
              </CardContent>
            </Card>

            {study.status === "approved" && !isOwner && (
              <Button className="w-full" size="lg">
                Apply to Participate
              </Button>
            )}

            {study.status === "pending" && isOwner && (
              <div className="p-4 bg-muted rounded-lg text-sm text-muted-foreground">
                <p className="font-medium text-foreground mb-1">Pending Review</p>
                <p>
                  Your study is being reviewed by an admin and will be published
                  once approved.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
