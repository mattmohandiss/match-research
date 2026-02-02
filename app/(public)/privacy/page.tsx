export default function PrivacyPage() {
  return (
    <div className="py-16 px-4">
      <div className="container max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>

        <div className="prose prose-neutral dark:prose-invert max-w-none text-muted-foreground">
          <p className="text-lg mb-8">
            Last updated: {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
          </p>

          <h2 className="text-2xl font-semibold mt-12 mb-4 text-foreground">
            Introduction
          </h2>
          <p>
            Match_Research ("we", "our", or "us") is committed to protecting your
            privacy. This Privacy Policy explains how we collect, use, disclose,
            and safeguard your information when you use our platform.
          </p>

          <h2 className="text-2xl font-semibold mt-12 mb-4 text-foreground">
            Information We Collect
          </h2>
          <h3 className="text-xl font-semibold mt-8 mb-3 text-foreground">
            Personal Information
          </h3>
          <p>We may collect personal information that you voluntarily provide, including:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Name and contact information (email, phone number)</li>
            <li>Academic and professional details (institution, education level)</li>
            <li>Research interests and expertise</li>
            <li>Demographic information (for survey participants)</li>
          </ul>

          <h3 className="text-xl font-semibold mt-8 mb-3 text-foreground">
            Survey Participant Data
          </h3>
          <p>
            Survey participant profiles are treated with extra privacy protection.
            This information is only visible to the participant themselves and is
            used solely for matching with appropriate studies.
          </p>

          <h2 className="text-2xl font-semibold mt-12 mb-4 text-foreground">
            How We Use Your Information
          </h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>To provide and maintain our platform</li>
            <li>To match participants with appropriate research studies</li>
            <li>To facilitate connections between researchers and collaborators</li>
            <li>To communicate with you about your account and studies</li>
            <li>To improve our services and user experience</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-12 mb-4 text-foreground">
            Data Security
          </h2>
          <p>
            We implement appropriate technical and organizational security measures
            to protect your personal information. However, no method of transmission
            over the Internet is 100% secure.
          </p>

          <h2 className="text-2xl font-semibold mt-12 mb-4 text-foreground">
            Your Rights
          </h2>
          <p>You have the right to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Access your personal information</li>
            <li>Correct inaccurate data</li>
            <li>Request deletion of your data</li>
            <li>Withdraw consent at any time</li>
            <li>Export your data</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-12 mb-4 text-foreground">
            Contact Us
          </h2>
          <p>
            If you have questions about this Privacy Policy, please contact us at{" "}
            <a
              href="mailto:privacy@matchresearch.com"
              className="text-primary hover:underline"
            >
              privacy@matchresearch.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
