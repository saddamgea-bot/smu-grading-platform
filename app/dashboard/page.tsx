import Link from "next/link"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, BarChart2 } from "lucide-react"
import ProgressChart from "@/components/progress-chart"
import StrengthsWeaknesses from "@/components/strengths-weaknesses"
import RecentActivity from "@/components/recent-activity"

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-2 md:space-y-0">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Instructor Dashboard</h1>
          <p className="text-muted-foreground">Monitor student progress and grading analytics at a glance.</p>
        </div>
        <Button asChild>
          <Link href="/dashboard/advanced">
            Advanced Analytics
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 md:w-auto">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="progress">Student Progress</TabsTrigger>
          <TabsTrigger value="skills">Assessment Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat) => (
              <Card key={stat.title}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                  <stat.icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Student Performance Trends</CardTitle>
                <CardDescription>Grading activity and student performance over the last 30 days</CardDescription>
              </CardHeader>
              <CardContent>
                <ProgressChart />
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Assessment Performance</CardTitle>
                <CardDescription>Student performance by assessment type</CardDescription>
              </CardHeader>
              <CardContent>
                <StrengthsWeaknesses />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Grading Activity</CardTitle>
                <CardDescription>Latest grading sessions and student submissions</CardDescription>
              </CardHeader>
              <CardContent>
                <RecentActivity />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="progress" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Student Progress Overview</CardTitle>
              <CardDescription>Completion rates across all active courses</CardDescription>
            </CardHeader>
            <CardContent>{/* Student progress components */}</CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="skills" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Assessment Analytics</CardTitle>
              <CardDescription>Performance analysis across different assessment types</CardDescription>
            </CardHeader>
            <CardContent>{/* Assessment analytics components */}</CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

const stats = [
  {
    title: "Assignments Graded",
    value: "142",
    description: "This semester",
    icon: BarChart2,
  },
  {
    title: "Average Grade",
    value: "78.5%",
    description: "Across all courses",
    icon: BarChart2,
  },
  {
    title: "Pending Reviews",
    value: "23",
    description: "Awaiting feedback",
    icon: BarChart2,
  },
  {
    title: "Active Students",
    value: "156",
    description: "This semester",
    icon: BarChart2,
  },
]
