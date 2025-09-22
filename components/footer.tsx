import Link from "next/link"
import Image from "next/image"

export default function Footer() {
  return (
    <footer className="border-t bg-background md:mt-0 mt-16">
      <div className="container py-8 md:py-10">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0 mb-6">
          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center mb-2">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/design-mode-images/image%281%29%281%29-YZySXz0DyhIaths1i7o0o00wyWCCHq.png"
                alt="SMU Logo"
                width={40}
                height={40}
                className="mr-2"
              />
              <div className="font-bold text-lg">SMU Grading Platform</div>
            </div>
            <p className="text-sm text-muted-foreground">AI-powered grading and feedback platform for instructors</p>
          </div>

          <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8">
            <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 md:gap-8">
              <Link href="/about" className="text-sm font-medium text-foreground/70 hover:text-primary">
                About
              </Link>
              <Link href="/privacy" className="text-sm font-medium text-foreground/70 hover:text-primary">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-sm font-medium text-foreground/70 hover:text-primary">
                Terms of Service
              </Link>
              <Link href="/contact" className="text-sm font-medium text-foreground/70 hover:text-primary">
                Contact
              </Link>
            </nav>
          </div>
        </div>

        <div className="border-t pt-6 text-center">
          <div className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} SMU Grading Platform. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  )
}
