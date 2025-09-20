import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Plus,
  FileText,
  Clock,
  CheckCircle,
  AlertCircle,
  Users,
  BarChart3,
  Calendar,
  Download,
  Eye,
  Bot,
} from "lucide-react"

interface CourseAssessmentsPageProps {
  params: {
    courseId: string
  }
}

export default function CourseAssessmentsPage({ params }: CourseAssessmentsPageProps) {
  const course = getCourseById(params.courseId)

  if (!course) {
    return <div>Course not found</div>
  }

  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-foreground">
            Dashboard
          </Link>
          <span>/</span>
          <Link href="/courses" className="hover:text-foreground">
            Courses
          </Link>
          <span>/</span>
          <span className="text-foreground">{course.code}</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tight text-balance">
              {course.code}: {course.name}
            </h1>
            <p className="text-muted-foreground text-lg">Manage assessments and view grading analytics</p>
          </div>
          <Button asChild className="academic-button bg-primary text-primary-foreground">
            <Link
              href={`/assessments/create?courseId=${params.courseId}&courseCode=${course.code}&courseName=${encodeURIComponent(course.name)}`}
            >
              <Plus className="mr-2 h-4 w-4" />
              Create New Assessment Session
            </Link>
          </Button>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="academic-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{course.students}</div>
            <p className="text-xs text-muted-foreground">Enrolled this semester</p>
          </CardContent>
        </Card>
        <Card className="academic-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Assessments</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{course.activeAssessments}</div>
            <p className="text-xs text-muted-foreground">Currently open for submission</p>
          </CardContent>
        </Card>
        <Card className="academic-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Reviews</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{course.pendingReviews}</div>
            <p className="text-xs text-muted-foreground">Require instructor attention</p>
          </CardContent>
        </Card>
        <Card className="academic-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Grade</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{course.averageGrade}%</div>
            <p className="text-xs text-muted-foreground">+3.2% from last assessment</p>
          </CardContent>
        </Card>
      </section>

      <section>
        <Tabs defaultValue="all" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">All Assessments</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="draft">Drafts</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-6">
            <div className="grid gap-6">
              {assessments.map((assessment) => (
                <Card key={assessment.id} className="academic-card">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-3">
                          <CardTitle className="text-xl">{assessment.name}</CardTitle>
                          <Badge
                            variant={
                              assessment.status === "active"
                                ? "default"
                                : assessment.status === "completed"
                                  ? "secondary"
                                  : "outline"
                            }
                            className="academic-badge"
                          >
                            {assessment.status}
                          </Badge>
                        </div>
                        <p className="text-muted-foreground">{assessment.description}</p>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-4 w-4" />
                            <span>Due: {assessment.dueDate}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Users className="h-4 w-4" />
                            <span>{assessment.submissions} submissions</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <span className="text-muted-foreground">AI Graded:</span>
                        <div className="flex items-center space-x-1">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <span className="font-medium">{assessment.aiGraded}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-muted-foreground">Needs Review:</span>
                        <div className="flex items-center space-x-1">
                          <AlertCircle className="h-4 w-4 text-yellow-600" />
                          <span className="font-medium">{assessment.needsReview}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-muted-foreground">Approved:</span>
                        <div className="flex items-center space-x-1">
                          <CheckCircle className="h-4 w-4 text-blue-600" />
                          <span className="font-medium">{assessment.approved}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex space-x-2 pt-2">
                      <Button asChild className="academic-button bg-primary text-primary-foreground">
                        <Link href={`/courses/${params.courseId}/assessments/${assessment.id}/grade`}>
                          <Eye className="mr-2 h-4 w-4" />
                          Grade Submissions
                        </Link>
                      </Button>
                      <Button asChild variant="outline" className="academic-button bg-transparent">
                        <Link href={`/courses/${params.courseId}/assessments/${assessment.id}/rubric`}>
                          <Bot className="mr-2 h-4 w-4" />
                          Assignment Rubric
                        </Link>
                      </Button>
                      <Button asChild variant="outline" className="academic-button bg-transparent">
                        <Link href={`/courses/${params.courseId}/assessments/${assessment.id}/analytics`}>
                          <BarChart3 className="mr-2 h-4 w-4" />
                          View Analytics
                        </Link>
                      </Button>
                      <Button variant="outline" className="academic-button bg-transparent">
                        <Download className="mr-2 h-4 w-4" />
                        Export Results
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="active">
            <div className="text-center py-12">
              <FileText className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-medium">Active Assessments</h3>
              <p className="mt-2 text-muted-foreground">
                Assessments currently open for student submissions will appear here.
              </p>
            </div>
          </TabsContent>

          <TabsContent value="completed">
            <div className="text-center py-12">
              <CheckCircle className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-medium">Completed Assessments</h3>
              <p className="mt-2 text-muted-foreground">Fully graded and finalized assessments will appear here.</p>
            </div>
          </TabsContent>

          <TabsContent value="draft">
            <div className="text-center py-12">
              <Clock className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-medium">Draft Assessments</h3>
              <p className="mt-2 text-muted-foreground">
                Assessments being prepared but not yet published will appear here.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </section>
    </div>
  )
}

// Mock data functions
function getCourseById(courseId: string) {
  const courses = {
    cor101: {
      id: "cor101",
      code: "COR101",
      name: "Business Fundamentals",
      semester: "AY2024/25 S1",
      students: 45,
      activeAssessments: 2,
      pendingReviews: 8,
      averageGrade: 78.5,
    },
    acc101: {
      id: "acc101",
      code: "ACC101",
      name: "Financial Accounting",
      semester: "AY2024/25 S1",
      students: 38,
      activeAssessments: 1,
      pendingReviews: 12,
      averageGrade: 82.1,
    },
  }

  return courses[courseId as keyof typeof courses]
}

const assessments = [
  {
    id: "midterm-2024",
    name: "Mid-term Examination",
    description: "Comprehensive assessment covering chapters 1-6 of the course material.",
    status: "completed",
    dueDate: "Oct 15, 2024",
    submissions: 45,
    aiGraded: 42,
    needsReview: 3,
    approved: 39,
  },
  {
    id: "assignment-2",
    name: "Case Study Analysis",
    description: "Individual analysis of the Tesla business model and strategic decisions.",
    status: "active",
    dueDate: "Nov 30, 2024",
    submissions: 23,
    aiGraded: 18,
    needsReview: 5,
    approved: 13,
  },
  {
    id: "quiz-3",
    name: "Chapter 7-8 Quiz",
    description: "Short quiz on financial statements and ratio analysis.",
    status: "draft",
    dueDate: "Dec 5, 2024",
    submissions: 0,
    aiGraded: 0,
    needsReview: 0,
    approved: 0,
  },
]
