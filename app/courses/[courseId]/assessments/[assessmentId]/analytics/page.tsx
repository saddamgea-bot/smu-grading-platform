"use client"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Area,
  AreaChart,
} from "recharts"
import {
  ArrowLeft,
  TrendingUp,
  TrendingDown,
  Users,
  Brain,
  Target,
  AlertTriangle,
  CheckCircle,
  Download,
  Filter,
} from "lucide-react"

interface AssessmentAnalyticsPageProps {
  params: {
    courseId: string
    assessmentId: string
  }
}

export default function AssessmentAnalyticsPage({ params }: AssessmentAnalyticsPageProps) {
  const course = getCourseById(params.courseId)
  const assessment = getAssessmentById(params.assessmentId)
  const analytics = getAssessmentAnalytics(params.assessmentId)

  if (!course || !assessment) {
    return <div>Assessment not found</div>
  }

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
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
          <Link href={`/courses/${params.courseId}/assessments`} className="hover:text-foreground">
            {course.code}
          </Link>
          <span>/</span>
          <span className="text-foreground">Assessment Analytics</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm" asChild>
                <Link href={`/courses/${params.courseId}/assessments`}>
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Assessments
                </Link>
              </Button>
              <h1 className="text-3xl font-bold tracking-tight text-balance">{assessment.name} - Analytics</h1>
            </div>
            <p className="text-muted-foreground text-lg">Detailed performance analysis and AI scoring insights</p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filter Results
            </Button>
            <Button>
              <Download className="mr-2 h-4 w-4" />
              Export Analytics
            </Button>
          </div>
        </div>
      </section>

      {/* Overview Cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Submissions</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.totalSubmissions}</div>
            <p className="text-xs text-muted-foreground">{analytics.submissionRate}% submission rate</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average AI Score</CardTitle>
            <Brain className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.averageAIScore}/100</div>
            <p className="text-xs text-muted-foreground flex items-center">
              {analytics.aiScoreTrend > 0 ? (
                <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
              ) : (
                <TrendingDown className="h-3 w-3 text-red-500 mr-1" />
              )}
              {Math.abs(analytics.aiScoreTrend)}% from last assessment
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Final Average Score</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.averageFinalScore}/100</div>
            <p className="text-xs text-muted-foreground">After instructor review</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Grading Status</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.gradingProgress}%</div>
            <p className="text-xs text-muted-foreground">{analytics.pendingReviews} pending reviews</p>
          </CardContent>
        </Card>
      </section>

      {/* Main Analytics */}
      <Tabs defaultValue="distribution" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="distribution">Score Distribution</TabsTrigger>
          <TabsTrigger value="ai-analysis">AI Analysis</TabsTrigger>
          <TabsTrigger value="performance">Performance Trends</TabsTrigger>
          <TabsTrigger value="insights">Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="distribution" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Score Distribution</CardTitle>
                <CardDescription>Distribution of final scores across all students</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={analytics.scoreDistribution}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="range" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="count" fill="#4f46e5" name="Students" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Grade Distribution</CardTitle>
                <CardDescription>Percentage of students in each grade category</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={analytics.gradeDistribution}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {analytics.gradeDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Class Performance Breakdown</CardTitle>
              <CardDescription>Detailed breakdown of student performance levels</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analytics.performanceBreakdown.map((level) => (
                  <div key={level.name} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Badge variant={level.variant as any} className="w-20 justify-center">
                          {level.name}
                        </Badge>
                        <span className="text-sm font-medium">{level.description}</span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {level.count} students ({level.percentage}%)
                      </div>
                    </div>
                    <Progress value={level.percentage} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ai-analysis" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>AI vs Final Scores</CardTitle>
                <CardDescription>Comparison between AI initial scores and final instructor scores</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={analytics.aiVsFinalScores}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="student" />
                      <YAxis domain={[0, 100]} />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="aiScore" stroke="#f59e0b" name="AI Score" />
                      <Line type="monotone" dataKey="finalScore" stroke="#10b981" name="Final Score" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>AI Accuracy Analysis</CardTitle>
                <CardDescription>How closely AI scores match final instructor scores</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600">{analytics.aiAccuracy}%</div>
                    <p className="text-sm text-muted-foreground">AI Accuracy Rate</p>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Exact Match (&gt;=2 points)</span>
                      <Badge variant="secondary">{analytics.exactMatches}%</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Close Match (&gt;=5 points)</span>
                      <Badge variant="secondary">{analytics.closeMatches}%</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Significant Difference (&gt;5 points)</span>
                      <Badge variant="destructive">{analytics.significantDifferences}%</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>AI Confidence Levels</CardTitle>
              <CardDescription>Distribution of AI confidence scores for grading decisions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={analytics.confidenceLevels}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="range" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="count" stroke="#4f46e5" fill="#4f46e5" fillOpacity={0.6} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Performance by Rubric Criteria</CardTitle>
              <CardDescription>Average scores for each assessment criterion</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={analytics.criteriaPerformance} layout="horizontal">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" domain={[0, 100]} />
                    <YAxis dataKey="criteria" type="category" width={150} />
                    <Tooltip />
                    <Bar dataKey="average" fill="#10b981" name="Average Score" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Time to Complete</CardTitle>
                <CardDescription>Distribution of time taken to complete the assessment</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={analytics.timeDistribution}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="timeRange" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="count" fill="#f59e0b" name="Students" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Submission Timeline</CardTitle>
                <CardDescription>When students submitted their assessments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={analytics.submissionTimeline}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="submissions" stroke="#4f46e5" name="Submissions" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="insights" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Brain className="h-5 w-5" />
                  <span>AI Insights</span>
                </CardTitle>
                <CardDescription>Key insights from AI analysis of student performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analytics.aiInsights.map((insight, index) => (
                    <div
                      key={index}
                      className="flex items-start space-x-3 p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg"
                    >
                      <Brain className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium text-sm">{insight.title}</h4>
                        <p className="text-sm text-muted-foreground mt-1">{insight.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <AlertTriangle className="h-5 w-5" />
                  <span>Areas for Improvement</span>
                </CardTitle>
                <CardDescription>Identified areas where students need additional support</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analytics.improvementAreas.map((area, index) => (
                    <div
                      key={index}
                      className="flex items-start space-x-3 p-3 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg"
                    >
                      <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium text-sm">{area.area}</h4>
                        <p className="text-sm text-muted-foreground mt-1">{area.recommendation}</p>
                        <Badge variant="outline" className="mt-2">
                          {area.affectedStudents} students affected
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Class Readiness for Next Assessment</CardTitle>
              <CardDescription>AI prediction on how prepared the class is for upcoming assessments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950/20 dark:to-blue-950/20 rounded-lg">
                  <div>
                    <h3 className="font-semibold text-lg">Overall Readiness Score</h3>
                    <p className="text-sm text-muted-foreground">Based on current performance trends</p>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-green-600">{analytics.readinessScore}/100</div>
                    <Badge variant="secondary" className="mt-1">
                      {analytics.readinessLevel}
                    </Badge>
                  </div>
                </div>

                <div className="p-4 bg-muted/50 rounded-lg">
                  <h4 className="font-medium mb-2">AI Analysis:</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{analytics.readinessAnalysis}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-3 bg-green-50 dark:bg-green-950/20 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{analytics.strongStudents}%</div>
                    <p className="text-xs text-muted-foreground">Ready for next level</p>
                  </div>
                  <div className="text-center p-3 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg">
                    <div className="text-2xl font-bold text-yellow-600">{analytics.moderateStudents}%</div>
                    <p className="text-xs text-muted-foreground">Need some review</p>
                  </div>
                  <div className="text-center p-3 bg-red-50 dark:bg-red-950/20 rounded-lg">
                    <div className="text-2xl font-bold text-red-600">{analytics.strugglingStudents}%</div>
                    <p className="text-xs text-muted-foreground">Need significant support</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

// Helper functions and mock data
function getCourseById(courseId: string) {
  const courses = {
    cor101: { id: "cor101", code: "COR101", name: "Business Fundamentals" },
    acc101: { id: "acc101", code: "ACC101", name: "Financial Accounting" },
  }
  return courses[courseId as keyof typeof courses]
}

function getAssessmentById(assessmentId: string) {
  const assessments = {
    "midterm-2024": { id: "midterm-2024", name: "Mid-term Examination" },
    "assignment-2": { id: "assignment-2", name: "Case Study Analysis" },
    "quiz-3": { id: "quiz-3", name: "Chapter 7-8 Quiz" },
  }
  return assessments[assessmentId as keyof typeof assessments]
}

function getAssessmentAnalytics(assessmentId: string) {
  return {
    totalSubmissions: 42,
    submissionRate: 93,
    averageAIScore: 78.5,
    aiScoreTrend: 3.2,
    averageFinalScore: 81.2,
    gradingProgress: 85,
    pendingReviews: 6,
    aiAccuracy: 87,
    exactMatches: 45,
    closeMatches: 42,
    significantDifferences: 13,
    readinessScore: 82,
    readinessLevel: "Well Prepared",
    readinessAnalysis:
      "Based on the current assessment performance, the class shows strong understanding of core concepts with 78% of students demonstrating proficiency. The consistent improvement in problem-solving skills and analytical thinking suggests students are ready for more advanced topics. However, communication clarity remains an area for focused improvement before the next major assessment.",
    strongStudents: 65,
    moderateStudents: 25,
    strugglingStudents: 10,
    scoreDistribution: [
      { range: "90-100", count: 8 },
      { range: "80-89", count: 15 },
      { range: "70-79", count: 12 },
      { range: "60-69", count: 5 },
      { range: "50-59", count: 2 },
      { range: "0-49", count: 0 },
    ],
    gradeDistribution: [
      { name: "A", value: 19, color: "#10b981" },
      { name: "B", value: 36, color: "#3b82f6" },
      { name: "C", value: 29, color: "#f59e0b" },
      { name: "D", value: 12, color: "#ef4444" },
      { name: "F", value: 4, color: "#6b7280" },
    ],
    performanceBreakdown: [
      {
        name: "Top 5%",
        description: "Exceptional performance, exceeds expectations",
        count: 2,
        percentage: 5,
        variant: "default",
      },
      {
        name: "Top 25%",
        description: "Strong performance, meets high standards",
        count: 10,
        percentage: 24,
        variant: "secondary",
      },
      {
        name: "Top 50%",
        description: "Good performance, meets expectations",
        count: 21,
        percentage: 50,
        variant: "outline",
      },
      {
        name: "Below Passing",
        description: "Below minimum requirements, needs attention",
        count: 6,
        percentage: 14,
        variant: "destructive",
      },
      {
        name: "Bottom 50%",
        description: "Significant improvement needed",
        count: 3,
        percentage: 7,
        variant: "destructive",
      },
    ],
    aiVsFinalScores: [
      { student: "S1", aiScore: 85, finalScore: 88 },
      { student: "S2", aiScore: 72, finalScore: 75 },
      { student: "S3", aiScore: 91, finalScore: 89 },
      { student: "S4", aiScore: 68, finalScore: 72 },
      { student: "S5", aiScore: 79, finalScore: 81 },
      { student: "S6", aiScore: 83, finalScore: 85 },
      { student: "S7", aiScore: 76, finalScore: 78 },
      { student: "S8", aiScore: 88, finalScore: 90 },
    ],
    confidenceLevels: [
      { range: "90-100%", count: 18 },
      { range: "80-89%", count: 15 },
      { range: "70-79%", count: 8 },
      { range: "60-69%", count: 1 },
      { range: "50-59%", count: 0 },
    ],
    criteriaPerformance: [
      { criteria: "Conceptual Understanding", average: 82 },
      { criteria: "Problem-Solving Application", average: 76 },
      { criteria: "Communication Clarity", average: 71 },
      { criteria: "Critical Analysis", average: 78 },
    ],
    timeDistribution: [
      { timeRange: "< 30 min", count: 5 },
      { timeRange: "30-60 min", count: 18 },
      { timeRange: "60-90 min", count: 15 },
      { timeRange: "90+ min", count: 4 },
    ],
    submissionTimeline: [
      { date: "Oct 10", submissions: 2 },
      { date: "Oct 11", submissions: 5 },
      { date: "Oct 12", submissions: 8 },
      { date: "Oct 13", submissions: 12 },
      { date: "Oct 14", submissions: 10 },
      { date: "Oct 15", submissions: 5 },
    ],
    aiInsights: [
      {
        title: "Strong Conceptual Grasp",
        description:
          "Students demonstrate solid understanding of fundamental business concepts with 82% average performance in conceptual understanding criteria.",
      },
      {
        title: "Communication Skills Gap",
        description:
          "Communication clarity scores are 11 points below other criteria, indicating need for focused writing and presentation skill development.",
      },
      {
        title: "Consistent AI-Human Agreement",
        description:
          "87% accuracy rate between AI and instructor scores suggests reliable automated assessment capabilities for this assessment type.",
      },
    ],
    improvementAreas: [
      {
        area: "Written Communication",
        recommendation:
          "Implement structured writing workshops focusing on business communication clarity and organization.",
        affectedStudents: 28,
      },
      {
        area: "Problem-Solving Application",
        recommendation:
          "Provide more practice scenarios connecting theoretical concepts to real-world business situations.",
        affectedStudents: 15,
      },
      {
        area: "Time Management",
        recommendation:
          "Offer time management strategies for assessment completion, as 19% of students took excessive time.",
        affectedStudents: 8,
      },
    ],
  }
}
