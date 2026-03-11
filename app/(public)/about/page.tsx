export default function AboutPage() {
  return (
    <div className="py-16 px-4">
      <div className="container max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">About Match_Research</h1>

        <div className="prose prose-neutral dark:prose-invert max-w-none">
          <h2 className="text-2xl font-semibold mt-12 mb-4">WHAT WE DO</h2>
          <h3 className="text-xl font-medium mb-4">CONNECTING STUDENTS, RESEARCHERS, INNOVATORS, AND CITIZENS</h3>
          <p className="text-muted-foreground mb-6">
            We work for the digitalization of research facilities, connecting researchers and communities. Through our
            platform, researchers are enabled to widen their scope of investigation with enhanced access and verified data
            collection. Citizens can contribute their input in relevant studies while earning rewards for their time investment.
            Researchers and innovators can get peer support, share research ideas, upload multisectoral, survey-based
            questions, collect screened data, take interviews, and even open calls for physical samples.
          </p>

          <h2 className="text-2xl font-semibold mt-12 mb-4">MISSION</h2>
          <h3 className="text-xl font-medium mb-4">The Goal is to amplify accessibility and collaboration for inclusive knowledge.</h3>
          <p className="text-muted-foreground mb-6">
            Our mission is to unlock collaboration potentials to make research and innovation accessible: connecting people
            and real-world purpose. We facilitate active participation of citizens in scientific studies as well as co-create
            connections among researchers and innovators for high-quality research.
          </p>

          <h2 className="text-2xl font-semibold mt-12 mb-4">WHY DO WE MATTER?</h2>
          <h3 className="text-xl font-medium mb-4">TO UNLOCK COLLABORATION POTENTIALS TO AMPLIFY INCLUSIVITY IN RESEARCH & INNOVATION</h3>
          <p className="text-muted-foreground mb-4">
            Human insights are built on cumulative knowledge production. Science, society, and technology, in the need of
            greater benefit, thrive when they capture diverse, local voices and lived experiences. Bigger impacts need
            collaborative approaches.
          </p>
          <p className="text-muted-foreground mb-4">
            In many parts of the world, students, grassroots startups, innovators, researchers, and end users often operate
            within isolated ecosystems of knowledge production. Valuable ideas and knowledge often remain disconnected,
            limiting their impact.
          </p>
          <p className="text-muted-foreground mb-4">
            We are building a functional, stakeholder-centered network that bridges these divides. Our goal is to support
            meaningful collaboration and accelerate development through shared knowledge and direct engagement.
          </p>
          <p className="text-muted-foreground mb-6">
            Traditional data collection can be time-consuming, labor-intensive, and sometimes unreliable. It may also place a
            risk of exploitation of participant time, giving them no return. In today's digital era, we have the tools to do better.
            By enabling direct, transparent, and structured connections and accelerating faster and large-scale data
            harvesting, we accelerate development through connected knowledge production—making research more
            inclusive, efficient, and impactful.
          </p>

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
