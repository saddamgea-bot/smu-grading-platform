"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import type { LearningPrediction, PredictionModelParams } from "@/types/prediction"
import { SkillPredictionChart } from "./skill-prediction-chart"
import { CoursePredictionList } from "./course-prediction-list"
import { MasteryPredictionChart } from "./mastery-prediction-chart"
import { LearningCurveChart } from "./learning-curve-chart"
import { RecommendationsList } from "./recommendations-list"
import { OverallProgressChart } from "./overall-progress-chart"
import { Users, BookOpen } from "lucide-react"

interface Student {
  id: string
  name: string
  studentId: string
  course: string
}

interface Course {
  id: string
  name: string
}

interface LearningPredictionDashboardProps {
  userId: string
  initialTimeframe?: number
}

export function LearningPredictionDashboard({ userId, initialTimeframe = 90 }: LearningPredictionDashboardProps) {
  const [prediction, setPrediction] = useState<LearningPrediction | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [timeframe, setTimeframe] = useState(initialTimeframe)
  const [selectedStudent, setSelectedStudent] = useState<string>("average")
  const [selectedCourse, setSelectedCourse] = useState<string>("all")
  const [students] = useState<Student[]>(mockStudents)
  const [courses] = useState<Course[]>(mockCourses)
  const [editingScores, setEditingScores] = useState(false)

  const fetchPrediction = async () => {
    setLoading(true)
    setError(null)

    try {
      const params: PredictionModelParams = {
        userId: selectedStudent === "average" ? userId : selectedStudent,
        timeframe,
        includeSkills: true,
        includeCourses: true,
        includeMastery: true,
        includeRecommendations: true,
      }

      const response = await fetch("/api/prediction", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
      })

      if (!response.ok) {
        throw new Error("An error occurred while fetching prediction data.")
      }

      const data = await response.json()
      setPrediction(data)
    } catch (err) {
      console.error("Failed to fetch prediction data:", err)
      setError(err instanceof Error ? err.message : "An unknown error occurred.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPrediction()
  }, [userId, timeframe, selectedStudent, selectedCourse])

  const handleTimeframeChange = (newTimeframe: number) => {
    setTimeframe(newTimeframe)
  }

  const handleStudentChange = (studentId: string) => {
    setSelectedStudent(studentId)
  }

  const handleCourseChange = (courseId: string) => {
    setSelectedCourse(courseId)
  }

  const selectedStudentInfo = selectedStudent === "average" ? null : students.find((s) => s.id === selectedStudent)
  const selectedCourseInfo = selectedCourse === "all" ? null : courses.find((c) => c.id === selectedCourse)

  if (error) {
    return (
      <Alert variant="destructive" className="mb-6">
        <AlertTitle>Error Occurred</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    )
  }

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-primary/5 to-secondary/5 p-8 rounded-lg border">
        <div className="flex flex-col space-y-6">
          <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Learning Analytics Dashboard</h1>
                <p className="text-muted-foreground">Monitor and predict student performance</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full xl:w-auto">
              <div className="flex items-center space-x-3">
                <Users className="h-5 w-5 text-muted-foreground" />
                <div className="space-y-1">
                  <Label className="text-sm font-medium">Student Selection</Label>
                  <Select value={selectedStudent} onValueChange={handleStudentChange}>
                    <SelectTrigger className="w-80 h-12 text-base">
                      <SelectValue placeholder="Select student" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="average">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">Average Student Performance</span>
                          <Badge variant="secondary" className="text-xs">
                            Default
                          </Badge>
                        </div>
                      </SelectItem>
                      {students.map((student) => (
                        <SelectItem key={student.id} value={student.id}>
                          <div className="flex flex-col">
                            <span className="font-medium">{student.name}</span>
                            <span className="text-xs text-muted-foreground">
                              {student.studentId} • {student.course}
                            </span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <BookOpen className="h-5 w-5 text-muted-foreground" />
                <div className="space-y-1">
                  <Label className="text-sm font-medium">Course Filter</Label>
                  <Select value={selectedCourse} onValueChange={handleCourseChange}>
                    <SelectTrigger className="w-64 h-12 text-base">
                      <SelectValue placeholder="Select course" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">
                        <span className="font-medium">All Courses</span>
                      </SelectItem>
                      {courses.map((course) => (
                        <SelectItem key={course.id} value={course.id}>
                          <span className="font-medium">{course.name}</span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <Label className="text-sm font-medium">Actions</Label>
                <Dialog>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Edit Student Scores</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Reading Score (0-100)</Label>
                          <Input type="number" min="0" max="100" defaultValue="85" />
                        </div>
                        <div className="space-y-2">
                          <Label>Writing Score (0-100)</Label>
                          <Input type="number" min="0" max="100" defaultValue="78" />
                        </div>
                        <div className="space-y-2">
                          <Label>Speaking Score (0-100)</Label>
                          <Input type="number" min="0" max="100" defaultValue="82" />
                        </div>
                        <div className="space-y-2">
                          <Label>Listening Score (0-100)</Label>
                          <Input type="number" min="0" max="100" defaultValue="90" />
                        </div>
                      </div>
                      <div className="flex justify-end gap-2 pt-4">
                        <Button variant="outline">Cancel</Button>
                        <Button>Save Changes</Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t">
            <div className="text-sm text-muted-foreground">
              Showing analytics and predictions for the selected timeframe
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium text-foreground">Prediction Timeframe:</span>
              <div className="flex items-center space-x-2">
                <Button
                  variant={timeframe === 14 ? "default" : "outline"}
                  onClick={() => handleTimeframeChange(14)}
                  size="sm"
                >
                  14 Days
                </Button>
                <Button
                  variant={timeframe === 30 ? "default" : "outline"}
                  onClick={() => handleTimeframeChange(30)}
                  size="sm"
                >
                  30 Days
                </Button>
                <Button
                  variant={timeframe === 90 ? "default" : "outline"}
                  onClick={() => handleTimeframeChange(90)}
                  size="sm"
                >
                  90 Days
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {selectedStudentInfo && (
        <Card className="bg-muted/50">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-lg">{selectedStudentInfo.name}</h3>
                <p className="text-sm text-muted-foreground">
                  Student ID: {selectedStudentInfo.studentId} • Course: {selectedStudentInfo.course}
                </p>
              </div>
              <Badge variant="outline" className="bg-background">
                Individual Analysis
              </Badge>
            </div>
          </CardContent>
        </Card>
      )}

      {selectedCourseInfo && (
        <Card className="bg-blue-50 dark:bg-blue-950/20">
          <CardContent className="pt-6">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-lg">Course Filter Active</h3>
                  <p className="text-sm text-muted-foreground">Showing data for: {selectedCourseInfo.name}</p>
                </div>
                <Badge variant="outline" className="bg-background">
                  Course Filtered
                </Badge>
              </div>

              {/* Assessment Performance Overview */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-base">Course Assessments Performance</h4>
                  <span className="text-xs text-muted-foreground">Click "View Analytics" for detailed analysis</span>
                </div>

                <div className="grid gap-3">
                  {getCourseAssessments(selectedCourseInfo.id).map((assessment) => (
                    <div
                      key={assessment.id}
                      className="flex items-center justify-between p-4 bg-background rounded-lg border"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <div className="flex flex-col">
                            <span className="font-medium text-sm">{assessment.name}</span>
                            <span className="text-xs text-muted-foreground">
                              {assessment.type} • Due: {assessment.dueDate}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge
                              variant={
                                assessment.failureRate > 30
                                  ? "destructive"
                                  : assessment.failureRate > 15
                                    ? "secondary"
                                    : "default"
                              }
                              className="text-xs"
                            >
                              {assessment.failureRate}% Failure Rate
                            </Badge>
                            {assessment.failureRate > 25 && (
                              <Badge variant="outline" className="text-xs text-orange-600 border-orange-200">
                                Needs Attention
                              </Badge>
                            )}
                          </div>
                        </div>

                        <div className="mt-2 flex items-center gap-4 text-xs text-muted-foreground">
                          <span>Avg Score: {assessment.averageScore}%</span>
                          <span>
                            Submissions: {assessment.submissions}/{assessment.totalStudents}
                          </span>
                          <span>AI Score Correlation: {assessment.aiCorrelation}%</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            window.open(
                              `/courses/${selectedCourseInfo.id}/assessments/${assessment.id}/analytics`,
                              "_blank",
                            )
                          }
                        >
                          View Analytics
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Summary Statistics */}
                <div className="mt-4 p-4 bg-muted/50 rounded-lg">
                  <h5 className="font-medium text-sm mb-3">Course Assessment Summary</h5>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Most Challenging:</span>
                      <p className="font-medium text-red-600">
                        {getCourseAssessments(selectedCourseInfo.id).sort((a, b) => b.failureRate - a.failureRate)[0]
                          ?.name || "N/A"}
                      </p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Best Performance:</span>
                      <p className="font-medium text-green-600">
                        {getCourseAssessments(selectedCourseInfo.id).sort((a, b) => a.failureRate - b.failureRate)[0]
                          ?.name || "N/A"}
                      </p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Course Average:</span>
                      <p className="font-medium">
                        {Math.round(
                          getCourseAssessments(selectedCourseInfo.id).reduce((sum, a) => sum + a.averageScore, 0) /
                            getCourseAssessments(selectedCourseInfo.id).length,
                        )}
                        %
                      </p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">At-Risk Students:</span>
                      <p className="font-medium text-orange-600">
                        {getCourseAssessments(selectedCourseInfo.id).reduce(
                          (sum, a) => sum + Math.round((a.totalStudents * a.failureRate) / 100),
                          0,
                        )}{" "}
                        students
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-1/3" />
              <Skeleton className="h-4 w-1/2" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-[200px] w-full" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-1/3" />
              <Skeleton className="h-4 w-1/2" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-[200px] w-full" />
            </CardContent>
          </Card>
        </div>
      ) : prediction ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Overall Performance History</CardTitle>
                <CardDescription>
                  {selectedStudent === "average"
                    ? `Average student progress and expected progress after ${timeframe} days`
                    : `${selectedStudentInfo?.name}'s current progress and expected progress after ${timeframe} days`}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <OverallProgressChart data={prediction.overallProgress} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Performance Curve History</CardTitle>
                <CardDescription>Expected performance curve over the next {timeframe} days</CardDescription>
              </CardHeader>
              <CardContent>
                <LearningCurveChart data={prediction.predictedLearningCurve} />
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="skills">
            <TabsList className="grid grid-cols-4 mb-6">
              <TabsTrigger value="skills">Assessment Skills</TabsTrigger>
              <TabsTrigger value="courses">Course Completion</TabsTrigger>
              <TabsTrigger value="mastery">Mastery Prediction</TabsTrigger>
              <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
            </TabsList>

            <TabsContent value="skills">
              <Card>
                <CardHeader>
                  <CardTitle>Assessment Skills Prediction</CardTitle>
                  <CardDescription>
                    Current level and expected level after {timeframe} days for each assessment type
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <SkillPredictionChart data={prediction.skillPredictions} />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="courses">
              <Card>
                <CardHeader>
                  <CardTitle>Course Completion Prediction</CardTitle>
                  <CardDescription>Expected completion schedule for courses in progress</CardDescription>
                </CardHeader>
                <CardContent>
                  <CoursePredictionList data={prediction.completionPredictions} />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="mastery">
              <Card>
                <CardHeader>
                  <CardTitle>Mastery Prediction</CardTitle>
                  <CardDescription>
                    Current mastery and expected mastery after {timeframe} days for each learning area
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <MasteryPredictionChart data={prediction.masteryPredictions} />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="recommendations">
              <Card>
                <CardHeader>
                  <CardTitle>Personalized Learning Recommendations</CardTitle>
                  <CardDescription>AI-based personalized learning recommendations</CardDescription>
                </CardHeader>
                <CardContent>
                  <RecommendationsList recommendations={prediction.recommendedFocus} />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>No Data</CardTitle>
            <CardDescription>Unable to load prediction data.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={fetchPrediction}>Try Again</Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

const mockStudents: Student[] = [
  { id: "s001", name: "Alice Chen", studentId: "S001234", course: "Business Fundamentals" },
  { id: "s002", name: "Bob Wilson", studentId: "S001235", course: "Business Fundamentals" },
  { id: "s003", name: "Carol Zhang", studentId: "S001236", course: "Business Fundamentals" },
  { id: "s004", name: "David Kumar", studentId: "S001237", course: "Financial Accounting" },
  { id: "s005", name: "Emma Rodriguez", studentId: "S001238", course: "Financial Accounting" },
  { id: "s006", name: "Frank Liu", studentId: "S001239", course: "Organizational Behavior" },
  { id: "s007", name: "Grace Park", studentId: "S001240", course: "Organizational Behavior" },
  { id: "s008", name: "Henry Tan", studentId: "S001241", course: "Corporate Finance" },
  { id: "s009", name: "Iris Wong", studentId: "S001242", course: "Marketing Management" },
  { id: "s010", name: "Jack Singh", studentId: "S001243", course: "Operations Management" },
]

const mockCourses: Course[] = [
  { id: "bf", name: "Business Fundamentals" },
  { id: "fa", name: "Financial Accounting" },
  { id: "ob", name: "Organizational Behavior" },
  { id: "cf", name: "Corporate Finance" },
  { id: "mm", name: "Marketing Management" },
  { id: "om", name: "Operations Management" },
]

function getCourseAssessments(courseId: string) {
  const assessmentsByCourse: Record<string, any[]> = {
    bf: [
      {
        id: "bf-midterm",
        name: "Mid Term Examination",
        type: "Exam",
        dueDate: "Nov 15, 2024",
        failureRate: 28,
        averageScore: 72,
        submissions: 45,
        totalStudents: 50,
        aiCorrelation: 85,
      },
      {
        id: "bf-case-study",
        name: "Business Case Analysis",
        type: "Assignment",
        dueDate: "Dec 1, 2024",
        failureRate: 15,
        averageScore: 81,
        submissions: 48,
        totalStudents: 50,
        aiCorrelation: 78,
      },
      {
        id: "bf-final",
        name: "Final Project Presentation",
        type: "Project",
        dueDate: "Dec 20, 2024",
        failureRate: 12,
        averageScore: 84,
        submissions: 47,
        totalStudents: 50,
        aiCorrelation: 82,
      },
    ],
    fa: [
      {
        id: "fa-quiz1",
        name: "Financial Statements Quiz",
        type: "Quiz",
        dueDate: "Oct 30, 2024",
        failureRate: 22,
        averageScore: 76,
        submissions: 38,
        totalStudents: 42,
        aiCorrelation: 88,
      },
      {
        id: "fa-midterm",
        name: "Accounting Principles Exam",
        type: "Exam",
        dueDate: "Nov 20, 2024",
        failureRate: 35,
        averageScore: 68,
        submissions: 40,
        totalStudents: 42,
        aiCorrelation: 79,
      },
    ],
    ob: [
      {
        id: "ob-essay",
        name: "Leadership Theory Essay",
        type: "Essay",
        dueDate: "Nov 10, 2024",
        failureRate: 18,
        averageScore: 79,
        submissions: 35,
        totalStudents: 38,
        aiCorrelation: 73,
      },
      {
        id: "ob-group-project",
        name: "Team Dynamics Project",
        type: "Group Project",
        dueDate: "Dec 5, 2024",
        failureRate: 8,
        averageScore: 87,
        submissions: 36,
        totalStudents: 38,
        aiCorrelation: 81,
      },
    ],
  }

  return assessmentsByCourse[courseId] || []
}
