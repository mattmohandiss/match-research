import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FacilitatorForm } from "@/components/forms/facilitator-form";
import { BuddyForm } from "@/components/forms/buddy-form";
import { ParticipantForm } from "@/components/forms/participant-form";

const roleConfig = {
  facilitator: {
    title: "Research Facilitator",
    description:
      "Create and manage research studies, recruit participants, and collaborate with other researchers.",
    icon: "🔬",
    Form: FacilitatorForm,
  },
  buddy: {
    title: "Research Buddy",
    description:
      "Find research collaborators, thesis partners, and connect with fellow students and researchers.",
    icon: "🤝",
    Form: BuddyForm,
  },
  participant: {
    title: "Survey Participant",
    description:
      "Participate in research surveys and studies. Your data remains private and secure.",
    icon: "📋",
    Form: ParticipantForm,
  },
};

type RoleType = keyof typeof roleConfig;

export default async function JoinRolePage({
  params,
}: {
  params: Promise<{ role: string }>;
}) {
  const { role } = await params;

  if (!Object.keys(roleConfig).includes(role)) {
    notFound();
  }

  const config = roleConfig[role as RoleType];
  const FormComponent = config.Form;

  return (
    <div className="min-h-screen bg-muted/30 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader className="text-center">
            <div className="text-4xl mb-2">{config.icon}</div>
            <CardTitle className="text-2xl">Join as {config.title}</CardTitle>
            <CardDescription>{config.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <FormComponent />
          </CardContent>
        </Card>

        <p className="text-center text-sm text-muted-foreground mt-6">
          <Link href="/join" className="text-primary hover:underline">
            ← Choose a different role
          </Link>
          {" | "}
          <Link href="/login" className="text-primary hover:underline">
            Already have an account? Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
