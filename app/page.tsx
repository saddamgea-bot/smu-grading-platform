import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  BookOpen,
  Users,
  FileText,
  BarChart3,
  Clock,
  CheckCircle,
  AlertCircle,
  Plus,
  MessageSquare,
} from "lucide-react"

export default function InstructorDashboard() {
  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-balance">Welcome back, Prof. Chen</h1>
            <p className="text-muted-foreground text-lg">
              Manage your courses and assessments with AI-powered grading assistance.
            </p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" className="academic-button bg-transparent" asChild>
              <Link href="/ai-chat">
                <MessageSquare className="mr-2 h-4 w-4" />
                AI Assistant
              </Link>
            </Button>
            <Button className="academic-button bg-primary text-primary-foreground" asChild>
              <Link href="/assessments/create">
                <Plus className="mr-2 h-4 w-4" />
                New Assessment
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="academic-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Courses</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-muted-foreground">2 new this semester</p>
          </CardContent>
        </Card>
        <Card className="academic-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
            <p className="text-xs text-muted-foreground">Across all courses</p>
          </CardContent>
        </Card>
        <Card className="academic-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Reviews</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23</div>
            <p className="text-xs text-muted-foreground">Require your attention</p>
          </CardContent>
        </Card>
        <Card className="academic-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">AI Accuracy</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">94.2%</div>
            <p className="text-xs text-muted-foreground">+2.1% from last month</p>
          </CardContent>
        </Card>
      </section>

      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Your Courses</h2>
          <Button variant="outline" className="academic-button bg-transparent" asChild>
            <Link href="/courses">View All Courses</Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <Card key={course.id} className="academic-card">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-lg">{course.code}</CardTitle>
                    <p className="text-sm text-muted-foreground font-medium">{course.name}</p>
                  </div>
                  <Badge variant="secondary" className="academic-badge">
                    {course.semester}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Students:</span>
                  <span className="font-medium">{course.students}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Assessments:</span>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="font-medium">{course.completedAssessments}</span>
                    <AlertCircle className="h-4 w-4 text-yellow-600" />
                    <span className="font-medium">{course.pendingAssessments}</span>
                  </div>
                </div>
                <div className="flex space-x-2 pt-2">
                  <Button asChild className="flex-1 academic-button bg-primary text-primary-foreground">
                    <Link href={`/courses/${course.id}/assessments`}>View Assessments</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-bold">Recent Activity</h2>
        <Card className="academic-card">
          <CardContent className="p-6">
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-4 pb-4 border-b border-border last:border-b-0 last:pb-0"
                >
                  <div className="flex-shrink-0">
                    <activity.icon className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground">{activity.title}</p>
                    <p className="text-sm text-muted-foreground">{activity.description}</p>
                  </div>
                  <div className="flex-shrink-0">
                    <span className="text-xs text-muted-foreground">{activity.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}

const courses = [
  {
    id: "cor101",
    code: "COR101",
    name: "Business Fundamentals",
    semester: "AY2024/25 S1",
    students: 45,
    completedAssessments: 3,
    pendingAssessments: 1,
  },
  {
    id: "acc101",
    code: "ACC101",
    name: "Financial Accounting",
    semester: "AY2024/25 S1",
    students: 38,
    completedAssessments: 2,
    pendingAssessments: 2,
  },
  {
    id: "mgmt201",
    code: "MGMT201",
    name: "Organizational Behavior",
    semester: "AY2024/25 S1",
    students: 42,
    completedAssessments: 4,
    pendingAssessments: 0,
  },
  {
    id: "fin301",
    code: "FIN301",
    name: "Corporate Finance",
    semester: "AY2024/25 S1",
    students: 31,
    completedAssessments: 1,
    pendingAssessments: 3,
  },
]

const recentActivity = [
  {
    icon: CheckCircle,
    title: "AI grading completed for COR101 Mid-term",
    description: "45 submissions processed with 96.3% accuracy",
    time: "2 hours ago",
  },
  {
    icon: AlertCircle,
    title: "Review needed for ACC101 Assignment 2",
    description: "12 submissions flagged for manual review",
    time: "4 hours ago",
  },
  {
    icon: FileText,
    title: "New rubric uploaded for MGMT201",
    description: "Final project rubric added to knowledge base",
    time: "1 day ago",
  },
  {
    icon: Users,
    title: "Student feedback received",
    description: "3 new feedback responses on AI grading accuracy",
    time: "2 days ago",
  },
]
