export default function AboutPage() {
  return (
    <div className="py-16 px-4">
      <div className="container max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">About Match_Research</h1>

        <div className="prose prose-neutral dark:prose-invert max-w-none">
          <p className="text-lg text-muted-foreground mb-8">
            Match_Research is a role-based research platform designed to connect
            researchers, institutions, students, and community members to advance
            knowledge together.
          </p>

          <h2 className="text-2xl font-semibold mt-12 mb-4">Our Mission</h2>
          <p className="text-muted-foreground mb-6">
            We believe that great research happens when the right people connect.
            Our platform makes it easy for researchers to find participants,
            students to find collaborators, and communities to contribute to
            meaningful studies.
          </p>

          <h2 className="text-2xl font-semibold mt-12 mb-4">What We Offer</h2>
          <div className="grid md:grid-cols-2 gap-6 my-8">
            <div className="p-6 bg-muted/50 rounded-lg">
              <h3 className="font-semibold mb-2">For Researchers</h3>
              <p className="text-sm text-muted-foreground">
                Create studies, recruit participants with specific criteria, and
                manage your research workflow all in one place.
              </p>
            </div>
            <div className="p-6 bg-muted/50 rounded-lg">
              <h3 className="font-semibold mb-2">For Students</h3>
              <p className="text-sm text-muted-foreground">
                Find thesis partners, connect with mentors, and collaborate with
                peers who share your research interests.
              </p>
            </div>
            <div className="p-6 bg-muted/50 rounded-lg">
              <h3 className="font-semibold mb-2">For Participants</h3>
              <p className="text-sm text-muted-foreground">
                Discover studies that match your profile, participate securely,
                and receive fair compensation for your time.
              </p>
            </div>
            <div className="p-6 bg-muted/50 rounded-lg">
              <h3 className="font-semibold mb-2">For Institutions</h3>
              <p className="text-sm text-muted-foreground">
                Support your researchers with a platform that handles recruitment,
                compliance, and collaboration needs.
              </p>
            </div>
          </div>

          <h2 className="text-2xl font-semibold mt-12 mb-4">Our Values</h2>
          <ul className="space-y-4 text-muted-foreground">
            <li>
              <strong className="text-foreground">Privacy First:</strong> We
              protect participant data with robust security measures and give
              users control over their information.
            </li>
            <li>
              <strong className="text-foreground">Research Ethics:</strong> All
              studies go through a moderation process to ensure they meet
              ethical standards.
            </li>
            <li>
              <strong className="text-foreground">Fair Compensation:</strong> We
              advocate for fair pay for research participants and transparent
              compensation structures.
            </li>
            <li>
              <strong className="text-foreground">Accessibility:</strong> We're
              committed to making research opportunities available to everyone,
              regardless of background.
            </li>
          </ul>

          <h2 className="text-2xl font-semibold mt-12 mb-4">Contact Us</h2>
          <p className="text-muted-foreground">
            Have questions or feedback? We'd love to hear from you. Reach out to
            our team at{" "}
            <a
              href="mailto:hello@matchresearch.com"
              className="text-primary hover:underline"
            >
              hello@matchresearch.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
