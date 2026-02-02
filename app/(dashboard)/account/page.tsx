import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { getFullUserProfile } from "@/lib/actions/profile";
import { getMyStudies } from "@/lib/actions/studies";
import { logout } from "@/lib/actions/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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

export default async function AccountPage({
  searchParams,
}: {
  searchParams: Promise<{ created?: string }>;
}) {
  const { created } = await searchParams;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const userProfile = await getFullUserProfile();
  const myStudies = await getMyStudies();

  if (!userProfile) {
    redirect("/login");
  }

  const { profile, roleProfile } = userProfile;

  const initials = profile.full_name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase() || "??";

  const roleLabels: Record<string, string> = {
    facilitator: "Research Facilitator",
    buddy: "Research Buddy",
    participant: "Survey Participant",
  };

  const roleIcons: Record<string, string> = {
    facilitator: "🔬",
    buddy: "🤝",
    participant: "📋",
  };

  return (
    <div className="py-12 px-4">
      <div className="container max-w-4xl mx-auto">
        {created && (
          <div className="mb-6 p-4 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg">
            <p className="text-green-800 dark:text-green-200">
              Your study has been submitted for review. You&apos;ll be notified once
              it&apos;s approved.
            </p>
          </div>
        )}

        {/* Profile Header */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row items-start gap-6">
              <Avatar className="w-24 h-24">
                <AvatarImage src={profile.avatar_url || undefined} />
                <AvatarFallback className="text-2xl">{initials}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-2xl font-bold">{profile.full_name}</h1>
                  <Badge variant="secondary">
                    {roleIcons[profile.role]} {roleLabels[profile.role]}
                  </Badge>
                </div>
                <p className="text-muted-foreground">{profile.email}</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Member since{" "}
                  {new Date(profile.created_at).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                  })}
                </p>
              </div>
              <form action={logout}>
                <Button variant="outline" type="submit">
                  Sign Out
                </Button>
              </form>
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Role-specific Profile */}
          <Card>
            <CardHeader>
              <CardTitle>Profile Details</CardTitle>
              <CardDescription>
                Your {roleLabels[profile.role].toLowerCase()} information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {profile.role === "facilitator" && roleProfile && (
                <>
                  <ProfileField
                    label="Education"
                    value={(roleProfile as any).education}
                  />
                  <ProfileField
                    label="Discipline"
                    value={(roleProfile as any).discipline}
                  />
                  <ProfileField
                    label="Institution"
                    value={(roleProfile as any).institution}
                  />
                  <ProfileField
                    label="Mobile"
                    value={(roleProfile as any).mobile}
                  />
                  <ProfileField
                    label="Research Profile"
                    value={(roleProfile as any).research_profile_url}
                    isLink
                  />
                  {(roleProfile as any).research_interests?.length > 0 && (
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">
                        Research Interests
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {(roleProfile as any).research_interests.map(
                          (interest: string) => (
                            <Badge key={interest} variant="secondary">
                              {interest}
                            </Badge>
                          )
                        )}
                      </div>
                    </div>
                  )}
                </>
              )}

              {profile.role === "buddy" && roleProfile && (
                <>
                  <ProfileField
                    label="Looking For"
                    value={(roleProfile as any).looking_for}
                  />
                  <ProfileField
                    label="Education"
                    value={(roleProfile as any).education}
                  />
                  <ProfileField
                    label="Major"
                    value={(roleProfile as any).major}
                  />
                  <ProfileField
                    label="Institution"
                    value={(roleProfile as any).institution}
                  />
                  {(roleProfile as any).research_interests?.length > 0 && (
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">
                        Research Interests
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {(roleProfile as any).research_interests.map(
                          (interest: string) => (
                            <Badge key={interest} variant="secondary">
                              {interest}
                            </Badge>
                          )
                        )}
                      </div>
                    </div>
                  )}
                </>
              )}

              {profile.role === "participant" && roleProfile && (
                <>
                  <div className="p-3 bg-muted rounded-lg text-sm text-muted-foreground mb-4">
                    Your participant profile is private and only visible to you.
                  </div>
                  <ProfileField
                    label="Age"
                    value={(roleProfile as any).age?.toString()}
                  />
                  <ProfileField
                    label="Gender"
                    value={(roleProfile as any).gender}
                  />
                  <ProfileField
                    label="Location"
                    value={[
                      (roleProfile as any).upazilla,
                      (roleProfile as any).district,
                      (roleProfile as any).division,
                    ]
                      .filter(Boolean)
                      .join(", ")}
                  />
                  <ProfileField
                    label="Occupation"
                    value={(roleProfile as any).occupation}
                  />
                  <ProfileField
                    label="Education"
                    value={`${(roleProfile as any).education_degree} - ${
                      (roleProfile as any).education_subject
                    }`}
                  />
                </>
              )}
            </CardContent>
          </Card>

          {/* My Studies */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>My Studies</CardTitle>
                  <CardDescription>
                    Studies you&apos;ve created or participated in
                  </CardDescription>
                </div>
                <Button asChild size="sm">
                  <Link href="/studies/create">Create Study</Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {myStudies.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <p>You haven&apos;t created any studies yet.</p>
                  <Button asChild className="mt-4" variant="outline">
                    <Link href="/studies/create">Create Your First Study</Link>
                  </Button>
                </div>
              ) : (
                <div className="space-y-3">
                  {myStudies.map((study) => (
                    <Link
                      key={study.id}
                      href={`/studies/${study.id}`}
                      className="block p-3 rounded-lg border hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate">{study.title}</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(study.created_at).toLocaleDateString()}
                          </p>
                        </div>
                        <Badge
                          variant={
                            study.status === "approved"
                              ? "default"
                              : study.status === "pending"
                              ? "secondary"
                              : "destructive"
                          }
                        >
                          {study.status}
                        </Badge>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              <Button asChild variant="outline">
                <Link href="/studies">Browse Studies</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/buddies">Find Research Buddies</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/studies/create">Create a Study</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function ProfileField({
  label,
  value,
  isLink = false,
}: {
  label: string;
  value?: string | null;
  isLink?: boolean;
}) {
  if (!value) return null;

  return (
    <div>
      <p className="text-sm text-muted-foreground">{label}</p>
      {isLink ? (
        <a
          href={value}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:underline break-all"
        >
          {value}
        </a>
      ) : (
        <p className="font-medium">{value}</p>
      )}
    </div>
  );
}
