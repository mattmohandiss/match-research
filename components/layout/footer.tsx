import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="container py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 font-bold text-lg">
              <span className="text-xl">🔬</span>
              <span>Match_Research</span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">
							The Goal is to amplify accessibility and collaboration for inclusive knowledge.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Platform</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/studies" className="hover:text-foreground transition-colors">
                  Browse Studies
                </Link>
              </li>
              <li>
                <Link href="/buddies" className="hover:text-foreground transition-colors">
                  Find Buddies
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-foreground transition-colors">
                  Browse Event Calendar
                </Link>
              </li>
							<li>
								<Link href="/" className="hover:text-foreground transition-colors">
									Articles
								</Link>
							</li>							
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/about" className="hover:text-foreground transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-foreground transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-foreground transition-colors">
                  Terms of Service
                </Link>
              </li>
							<li>
								<Link href="/" className="hover:text-foreground transition-colors">
									Cookie Policy
								</Link>
							</li>							
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/" className="hover:text-foreground transition-colors">
                  Contact Information
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-foreground transition-colors">
                  Partner with us
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-foreground transition-colors">
                  Jobs Openings
                </Link>
              </li>
							<li>
								<Link href="/" className="hover:text-foreground transition-colors">
									FAQ and Help Center
								</Link>
							</li>							
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Match_Research. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
