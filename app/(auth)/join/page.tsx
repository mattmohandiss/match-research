import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const roles = [
  {
    id: "facilitator",
    title: "Research Facilitator",
    description:
      "Create and manage research studies, recruit participants, and collaborate with other researchers.",
    features: [
      "Create research studies",
      "Recruit participants",
      "Connect with research buddies",
      "Publish findings",
    ],
    icon: "🔬",
  },
  {
    id: "buddy",
    title: "Research Buddy",
    description:
      "Find research collaborators, thesis partners, and connect with fellow students and researchers.",
    features: [
      "Find thesis partners",
      "Connect with researchers",
      "Share research interests",
      "Collaborate on projects",
    ],
    icon: "🤝",
  },
  {
    id: "participant",
    title: "Survey Participant",
    description:
      "Participate in research surveys and studies. Your data remains private and secure.",
    features: [
      "Participate in studies",
      "Earn compensation",
      "Private profile",
      "Choose your studies",
    ],
    icon: "📋",
  },
];

export default function JoinPage() {
  return (
    <div className="min-h-screen bg-muted/30 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Join Match_Research</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Choose how you want to participate in the research community. You can
            always update your role later.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {roles.map((role) => (
            <Card
              key={role.id}
              className="relative flex flex-col hover:shadow-lg transition-shadow"
            >
              <CardHeader>
                <div className="text-4xl mb-2">{role.icon}</div>
                <CardTitle className="text-xl">{role.title}</CardTitle>
                <CardDescription className="text-sm">
                  {role.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="space-y-2 mb-6">
                  {role.features.map((feature, index) => (
                    <li
                      key={index}
                      className="flex items-center gap-2 text-sm text-muted-foreground"
                    >
                      <svg
                        className="w-4 h-4 text-primary"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button asChild className="w-full">
                  <Link href={`/join/${role.id}`}>
                    Join as {role.title.split(" ")[1]}
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <p className="text-center text-sm text-muted-foreground mt-8">
          Already have an account?{" "}
          <Link href="/login" className="text-primary hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
