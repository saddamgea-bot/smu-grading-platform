import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Brain, Eye, Gavel, TrendingUp, Star } from "lucide-react"
import Link from "next/link"

export default function AIGuidelines() {
  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="mb-6">
        <Button variant="ghost" asChild className="mb-4">
          <Link href="/ai-chat">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to AI Assistant
          </Link>
        </Button>
        <h1 className="text-4xl font-bold tracking-tight text-balance mb-4">
          Guidelines for Using the AI Grader Platform
        </h1>
        <p className="text-xl text-muted-foreground">
          Think of the AI grader not as a replacement, but as a powerful assistant. Your role is to guide, supervise,
          and make the final judgments.
        </p>
      </div>

      <div className="space-y-8">
        {/* Guideline 1 */}
        <Card className="border-l-4 border-l-blue-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                <Brain className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <span className="text-2xl">1. Be the "Explainer": Set the AI Up for Success</span>
                
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-lg text-muted-foreground">
              The AI's performance depends entirely on your instructions. Before you begin grading, your primary role is
              to clearly communicate your expectations to the system.
            </p>
            <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Provide Detailed Context:</h4>
              <p>
                A human must explain the rubric to the AI. Go beyond just the rubric; provide the AI with examples of
                excellent, average, and poor answers. Explain your specific grading philosophy, such as how to handle
                partially correct responses or common student errors.
              </p>
            </div>
            <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Communicate Your Intent:</h4>
              <p>
                Remember that grading is a way to communicate expectations to students. Your prompts should reflect what
                you want students to demonstrate at this stage of their learning.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Guideline 2 */}
        <Card className="border-l-4 border-l-green-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
                <Eye className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <span className="text-2xl">2. Act as the "Supervisor": Trust but Verify</span>
                
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-lg text-muted-foreground">
              The AI grading process is not a "set it and forget it" task. Your active supervision is essential for
              ensuring accuracy and fairness.
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-green-50 dark:bg-green-950/20 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Always Run a Test Batch:</h4>
                <p className="text-sm">
                  Before grading the entire class, let the AI grade a small sample of responses first. Review these
                  initial results carefully.
                </p>
              </div>
              <div className="bg-green-50 dark:bg-green-950/20 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Refine Your Prompts:</h4>
                <p className="text-sm">
                  Based on the test batch, tweak your prompts to correct any misunderstandings or biases you see in the
                  AI's grading.
                </p>
              </div>
              <div className="bg-green-50 dark:bg-green-950/20 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Review Final Results:</h4>
                <p className="text-sm">
                  Manually review any responses where the AI indicates low confidence or uncertainty. Your human eyes
                  are needed for the edge cases.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Guideline 3 */}
        <Card className="border-l-4 border-l-purple-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
                <Gavel className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <span className="text-2xl">3. Serve as the "Final Arbitrator": Maintain the Human Connection</span>
                
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-lg text-muted-foreground">
              The AI's transparency means students will see detailed reasons for their grades, and many will have
              questions or want to appeal. You are the ultimate authority.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-purple-50 dark:bg-purple-950/20 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Be the Human Representative:</h4>
                <p className="text-sm">
                  Students who disagree with a grade will want to talk to a human instructor, not argue with a machine.
                </p>
              </div>
              <div className="bg-purple-50 dark:bg-purple-950/20 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Handle All Disputes:</h4>
                <p className="text-sm">
                  Position yourself as the final decision-maker for all grade inquiries and appeals. Use the AI's
                  detailed grading rationale as a transparent starting point for your conversation with the student.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Guideline 4 */}
        <Card className="border-l-4 border-l-orange-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 dark:bg-orange-900/20 rounded-lg">
                <TrendingUp className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <span className="text-2xl">4. Leverage Transparency for Continuous Improvement</span>
                
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-lg text-muted-foreground">
              The greatest advantage of using the AI grader is its unparalleled transparency, which allows you to
              constantly improve the process.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-orange-50 dark:bg-orange-950/20 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Fix and Improve:</h4>
                <p className="text-sm">
                  Unlike with human graders, you can spot most problems with AI grading, measure them, and fix them by
                  improving your prompts and process.
                </p>
              </div>
              <div className="bg-orange-50 dark:bg-orange-950/20 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Enhance Future Grading:</h4>
                <p className="text-sm">
                  Use the insights from one assignment to make the next batch of grading fairer and more accurate for
                  your students.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Guideline 5 */}
        <Card className="border-l-4 border-l-yellow-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <div className="p-2 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg">
                <Star className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <span className="text-2xl">5. Reinvest Your Time in "Uniquely Human" Teaching</span>
                
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-lg text-muted-foreground">
              The real promise of this tool is to free you from routine tasks so you can focus on the parts of teaching
              that a machine can't do.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-yellow-50 dark:bg-yellow-950/20 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Focus on What's Important:</h4>
                <p className="text-sm">Use the hours saved from grading to engage in high-impact activities, like helping your students with interactive projects that require high critical thinking skills.</p>
              </div>
              <div className="bg-yellow-50 dark:bg-yellow-950/20 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Innovate and Mentor:</h4>
                <p className="text-sm">
                  Spend more time thinking, discussing, and innovating with your students. Help them learn to think like a scientist by watching you think and internalizing your approach, a process that an AI cannot replicate.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 border-2 border-dashed">
          <CardContent className="pt-6 text-center">
            <h3 className="text-2xl font-bold mb-4">Ready to Get Started?</h3>
            <p className="text-lg text-muted-foreground mb-6">
              Apply these guidelines to become a more effective educator with AI assistance.
            </p>
            <Button size="lg" asChild>
              <Link href="/ai-chat">Start Using AI Assistant</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
