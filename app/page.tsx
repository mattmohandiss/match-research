import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-muted/50 to-background">
        <div className="container max-w-5xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Connect. Research.{" "}
            <span className="text-primary">Discover.</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Match_Research brings together researchers, students, and participants
            to advance knowledge and create meaningful research opportunities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/join">Join the Community</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/studies">Browse Studies</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* What is Match_Research */}
      <section className="py-16 px-4">
        <div className="container max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            What is Match_Research?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🔬</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Create Studies</h3>
              <p className="text-muted-foreground">
                Design and publish research studies with customizable participant
                criteria and compensation options.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🤝</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Find Collaborators</h3>
              <p className="text-muted-foreground">
                Connect with research buddies, thesis partners, and mentors who
                share your academic interests.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">📋</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Participate Safely</h3>
              <p className="text-muted-foreground">
                Join studies that match your profile with complete privacy
                protection and fair compensation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Role Cards */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">
            Choose Your Role
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Join Match_Research as the role that best fits your research journey.
            Each role offers unique features tailored to your needs.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="text-4xl mb-2">🔬</div>
                <CardTitle>Research Facilitator</CardTitle>
                <CardDescription>
                  Create studies, recruit participants, and advance your research.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground mb-6">
                  <li className="flex items-center gap-2">
                    <span className="text-primary">✓</span> Create & manage studies
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-primary">✓</span> Find collaborators
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-primary">✓</span> Moderated publishing
                  </li>
                </ul>
                <Button className="w-full" asChild>
                  <Link href="/join/facilitator">Join as Facilitator</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="text-4xl mb-2">🤝</div>
                <CardTitle>Research Buddy</CardTitle>
                <CardDescription>
                  Find thesis partners and connect with fellow researchers.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground mb-6">
                  <li className="flex items-center gap-2">
                    <span className="text-primary">✓</span> Public profile
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-primary">✓</span> Connect with peers
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-primary">✓</span> Share interests
                  </li>
                </ul>
                <Button className="w-full" asChild>
                  <Link href="/join/buddy">Join as Buddy</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="text-4xl mb-2">📋</div>
                <CardTitle>Survey Participant</CardTitle>
                <CardDescription>
                  Participate in studies and earn compensation securely.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground mb-6">
                  <li className="flex items-center gap-2">
                    <span className="text-primary">✓</span> Private profile
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-primary">✓</span> Matched studies
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-primary">✓</span> Fair compensation
                  </li>
                </ul>
                <Button className="w-full" asChild>
                  <Link href="/join/participant">Join as Participant</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-muted-foreground mb-8">
            Join our growing community of researchers, students, and participants.
            Create your account in minutes and start contributing to research.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/join">Create Your Account</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/about">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
