import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Check, Globe, Lightbulb, MessageSquare, Sparkles, Users } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function AboutPage() {
  return (
    <div className="container py-8 space-y-12">
      <section className="text-center space-y-4 max-w-3xl mx-auto">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/design-mode-images/image%281%29-GMMcbYclf1j3EFyROCax71cpFH6Jpd.png"
          alt="SMU Logo"
          width={120}
          height={120}
          className="mx-auto"
        />
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">About SMU Grading Platform</h1>
        <p className="text-lg text-muted-foreground">
          The SMU Grading Platform is an AI-powered assessment and feedback system designed to enhance the grading
          experience for Singapore Management University instructors through intelligent automation and personalized
          insights.
        </p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="space-y-4">
          <Badge className="bg-muted text-muted-foreground border-0 mb-2">Our Mission</Badge>
          <h2 className="text-2xl md:text-3xl font-bold">Revolutionizing Academic Assessment</h2>
          <p className="text-muted-foreground">
            The SMU Grading Platform leverages cutting-edge AI technology to streamline the assessment process,
            providing consistent, fair, and efficient grading while maintaining the highest academic standards.
          </p>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <Check className="h-5 w-5 text-primary mt-0.5" />
              <span>AI-assisted grading with human oversight and control</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="h-5 w-5 text-primary mt-0.5" />
              <span>Intelligent rubric creation and feedback generation</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="h-5 w-5 text-primary mt-0.5" />
              <span>Smart correction propagation across similar submissions</span>
            </li>
          </ul>
        </div>
        <div className="rounded-lg overflow-hidden border shadow-sm">
          <Image
            src="/university-grading-platform.jpg"
            alt="SMU Grading Platform"
            width={600}
            height={400}
            className="w-full h-auto object-cover"
          />
        </div>
      </section>

      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto">
          <Badge className="bg-muted text-muted-foreground border-0 mb-2">Key Features</Badge>
          <h2 className="text-2xl md:text-3xl font-bold">SMU Grading Platform Features</h2>
          <p className="text-muted-foreground mt-2">Advanced AI technology designed for academic excellence</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardContent className="pt-6">
              <div className="mb-4 rounded-full bg-primary/10 p-2 w-10 h-10 flex items-center justify-center">
                <Sparkles className="h-5 w-5 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">AI-Powered Grading</h3>
              <p className="text-muted-foreground">
                Intelligent assessment algorithms that understand context and provide consistent, fair grading across
                all submissions.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="mb-4 rounded-full bg-primary/10 p-2 w-10 h-10 flex items-center justify-center">
                <MessageSquare className="h-5 w-5 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Collaborative Rubric Creation</h3>
              <p className="text-muted-foreground">
                Work with AI to develop comprehensive rubrics that capture your assessment criteria and academic
                standards.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="mb-4 rounded-full bg-primary/10 p-2 w-10 h-10 flex items-center justify-center">
                <Lightbulb className="h-5 w-5 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Intelligent Insights</h3>
              <p className="text-muted-foreground">
                Advanced analytics provide insights into student performance patterns and help identify areas for
                improvement.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="mb-4 rounded-full bg-primary/10 p-2 w-10 h-10 flex items-center justify-center">
                <Globe className="h-5 w-5 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Knowledge Base Integration</h3>
              <p className="text-muted-foreground">
                Seamlessly integrate course materials, textbooks, and reference documents to enhance grading accuracy.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="mb-4 rounded-full bg-primary/10 p-2 w-10 h-10 flex items-center justify-center">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Instructor Collaboration</h3>
              <p className="text-muted-foreground">
                Share best practices and collaborate with fellow instructors to maintain consistent grading standards.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="text-center space-y-4 max-w-xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold">Start Grading Smarter Today</h2>
        <p className="text-muted-foreground">
          Experience the future of academic assessment with the SMU Grading Platform.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button asChild size="lg">
            <Link href="/courses">Explore Courses</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/courses/cor101/assessments">Create Assessment</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
