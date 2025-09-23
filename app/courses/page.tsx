import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

export default function CoursesPage() {
  return (
    <div className="container py-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">SMU Courses</h1>
          <p className="text-muted-foreground mt-2">
            Manage assessments and grading for your Singapore Management University courses.
          </p>
        </div>
        <Button asChild className="academic-button bg-primary text-primary-foreground whitespace-nowrap">
          <Link href="/courses/create" className="flex items-center">
            <Plus className="mr-2 h-4 w-4" />
            Add New Course
          </Link>
        </Button>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid grid-cols-4 w-full md:w-auto">
          <TabsTrigger value="all">All Courses</TabsTrigger>
          <TabsTrigger value="undergraduate">Undergraduate</TabsTrigger>
          <TabsTrigger value="graduate">Graduate</TabsTrigger>
          <TabsTrigger value="archived">Archived</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="pt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {allCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="undergraduate" className="pt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {allCourses
              .filter((course) => course.level === "Undergraduate")
              .map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
          </div>
        </TabsContent>

        <TabsContent value="graduate" className="pt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {allCourses
              .filter((course) => course.level === "Graduate")
              .map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
          </div>
        </TabsContent>

        <TabsContent value="archived" className="pt-6">
          <div className="text-center py-12">
            <h3 className="text-lg font-medium mb-2">No Archived Courses</h3>
            <p className="text-muted-foreground">Archived courses will appear here when available.</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function CourseCard({ course }: { course: any }) {
  const hasAssessmentAccess = !["mkt201", "ops301"].includes(course.id)

  return (
    <Card className="academic-card h-full overflow-hidden hover:shadow-lg transition-shadow">
      <CardContent className="p-4">
        <Badge variant="outline" className="academic-badge mb-2 bg-secondary/20 text-secondary-foreground border-0">
          {course.level}
        </Badge>
        <h3 className="font-bold text-lg mb-1">{course.code}</h3>
        <h4 className="font-medium text-base mb-1">{course.title}</h4>
        <p className="text-muted-foreground text-sm line-clamp-2 mb-3">{course.description}</p>
        <div className="flex items-center justify-between text-sm mb-3">
          <span className="text-muted-foreground">{course.students} students</span>
          <span className="text-primary font-medium">{course.semester}</span>
        </div>
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs text-muted-foreground">Course Access:</span>
          <div className="flex -space-x-2">
            {course.teachers.map((teacher: any, index: number) => (
              <div
                key={teacher.id}
                className="w-8 h-8 rounded-full bg-primary/10 border-2 border-background flex items-center justify-center text-xs font-medium text-primary hover:z-10 relative"
                title={teacher.name}
              >
                {teacher.initials}
              </div>
            ))}
          </div>
        </div>
        <div className="flex space-x-2">
          {hasAssessmentAccess ? (
            <Button asChild className="flex-1 academic-button bg-primary text-primary-foreground" size="sm">
              <Link href={`/courses/${course.id}/assessments`}>Assessments</Link>
            </Button>
          ) : (
            <div className="flex-1 flex items-center justify-center py-2 px-3 text-sm text-muted-foreground bg-muted/50 rounded-md">
              View Only Access
            </div>
          )}
          <Button asChild variant="outline" className="academic-button bg-transparent" size="sm">
            <Link href={`/courses/${course.id}/assessments/midterm-2024/rubric`}>Rubric</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

const allCourses = [
  {
    id: "cor101",
    code: "COR101",
    title: "Business Fundamentals",
    description: "Introduction to core business concepts including management, marketing, and organizational behavior.",
    image: "/university-grading-platform.jpg",
    level: "Undergraduate",
    students: 45,
    semester: "AY2024/25 S1",
    teachers: [
      { id: "t1", name: "Dr. Sarah Chen", initials: "SC" },
      { id: "t2", name: "Prof. Michael Wong", initials: "MW" },
      { id: "t3", name: "Dr. Lisa Tan", initials: "LT" },
      { id: "t4", name: "Prof. David Kumar", initials: "DK" },
    ],
  },
  {
    id: "acc101",
    code: "ACC101",
    title: "Financial Accounting",
    description: "Principles of financial accounting, financial statements, and basic accounting procedures.",
    image: "/accounting-classroom.jpg",
    level: "Undergraduate",
    students: 38,
    semester: "AY2024/25 S1",
    teachers: [
      { id: "t5", name: "Dr. Jennifer Lee", initials: "JL" },
      { id: "t6", name: "Prof. Robert Lim", initials: "RL" },
    ],
  },
  {
    id: "mgmt201",
    code: "MGMT201",
    title: "Organizational Behavior",
    description: "Study of individual and group behavior in organizational settings and management practices.",
    image: "/management-classroom.jpg",
    level: "Undergraduate",
    students: 42,
    semester: "AY2024/25 S1",
    teachers: [
      { id: "t7", name: "Dr. Amanda Ng", initials: "AN" },
      { id: "t8", name: "Prof. James Teo", initials: "JT" },
      { id: "t9", name: "Dr. Rachel Koh", initials: "RK" },
    ],
  },
  {
    id: "fin301",
    code: "FIN301",
    title: "Corporate Finance",
    description: "Advanced financial management including capital budgeting, cost of capital, and financial planning.",
    image: "/finance-classroom.jpg",
    level: "Graduate",
    students: 31,
    semester: "AY2024/25 S1",
    teachers: [
      { id: "t10", name: "Prof. Steven Ong", initials: "SO" },
      { id: "t11", name: "Dr. Michelle Yap", initials: "MY" },
    ],
  },
  {
    id: "mkt201",
    code: "MKT201",
    title: "Marketing Management",
    description: "Comprehensive study of marketing strategies, consumer behavior, and market analysis.",
    image: "/marketing-classroom.jpg",
    level: "Undergraduate",
    students: 52,
    semester: "AY2024/25 S1",
    teachers: [
      { id: "t12", name: "Dr. Kevin Sim", initials: "KS" },
      { id: "t13", name: "Prof. Grace Liu", initials: "GL" },
    ],
  },
  {
    id: "ops301",
    code: "OPS301",
    title: "Operations Management",
    description: "Analysis of production systems, supply chain management, and operational efficiency.",
    image: "/operations-classroom.jpg",
    level: "Graduate",
    students: 28,
    semester: "AY2024/25 S1",
    teachers: [
      { id: "t14", name: "Prof. Daniel Ho", initials: "DH" },
      { id: "t15", name: "Dr. Priya Sharma", initials: "PS" },
    ],
  },
]
