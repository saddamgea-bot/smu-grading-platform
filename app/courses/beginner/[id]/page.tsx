"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { ArrowLeft, BookOpen, CheckCircle, Clock, Award } from "lucide-react"
import { DuoCharacter } from "@/components/duo-character"

export default function CourseDetailPage({ params }: { params: { id: string } }) {
  // 실제 구현에서는 params.id를 사용하여 API에서 코스 데이터를 가져옵니다
  // 여기서는 예시로 하드코딩된 데이터를 사용합니다
  const course = {
    id: params.id,
    title: "Business Fundamentals",
    description:
      "Learn essential business concepts and terminology used in modern business environments. Cover topics including basic accounting, marketing principles, management concepts, and business communication skills.",
    image: "/accounting-classroom.jpg",
    level: "Undergraduate",
    lessons: 12,
    duration: "About 4 weeks",
    progress: 25,
    xp: 120,
    skills: ["Business Communication", "Basic Accounting", "Marketing Basics"],
    prerequisites: "None",
    instructor: "Prof. Sarah Johnson",
  }

  const lessons = [
    {
      id: 1,
      title: "Introduction to Business",
      description: "Learn fundamental business concepts and terminology.",
      duration: "20 minutes",
      completed: true,
      xp: 20,
    },
    {
      id: 2,
      title: "Basic Accounting Principles",
      description: "Understand basic accounting concepts and financial statements.",
      duration: "25 minutes",
      completed: true,
      xp: 25,
    },
    {
      id: 3,
      title: "Marketing Fundamentals",
      description: "Learn basic marketing concepts and strategies.",
      duration: "30 minutes",
      completed: true,
      xp: 30,
    },
    {
      id: 4,
      title: "Management Principles",
      description: "Understand basic management concepts and leadership styles.",
      duration: "25 minutes",
      completed: false,
      xp: 25,
    },
    {
      id: 5,
      title: "Business Communication",
      description: "Learn effective business communication techniques.",
      duration: "30 minutes",
      completed: false,
      xp: 30,
    },
    {
      id: 6,
      title: "Financial Analysis",
      description: "Introduction to financial analysis and business metrics.",
      duration: "25 minutes",
      completed: false,
      xp: 25,
    },
  ]

  return (
    <div className="container py-8 space-y-6">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="sm" className="mr-2" asChild>
          <Link href="/courses/beginner">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back
          </Link>
        </Button>
      </div>

      <div className="relative rounded-xl overflow-hidden aspect-[21/9] mb-6">
        <Image
          src={course.image || "/placeholder.svg"}
          alt={course.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
          className="object-cover"
          priority
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge className="duo-badge bg-secondary/20 text-secondary-foreground border-0">{course.level}</Badge>
              <Badge className="duo-badge bg-primary/20 text-primary border-0">{course.xp} XP</Badge>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">{course.title}</h1>
            <p className="text-muted-foreground mt-2">{course.description}</p>
          </div>

          <Tabs defaultValue="lessons" className="w-full">
            <TabsList className="grid grid-cols-3 w-full">
              <TabsTrigger value="lessons">Lessons</TabsTrigger>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="resources">Resources</TabsTrigger>
            </TabsList>

            <TabsContent value="lessons" className="space-y-4 pt-4">
              <div className="space-y-4">
                {lessons.map((lesson) => (
                  <Card key={lesson.id} className="duo-card overflow-hidden">
                    <CardContent className="p-0">
                      <Link
                        href={`/courses/beginner/${course.id}/lessons/${lesson.id}`}
                        className="block p-4 hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex items-start gap-3">
                          <div className="mt-0.5 flex-shrink-0">
                            {lesson.completed ? (
                              <div className="w-8 h-8 rounded-full bg-success/20 flex items-center justify-center">
                                <CheckCircle className="h-5 w-5 text-success" />
                              </div>
                            ) : (
                              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                                <BookOpen className="h-5 w-5 text-primary" />
                              </div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2">
                              <h3 className="font-medium">{lesson.title}</h3>
                              <Badge className="duo-badge bg-primary/10 text-primary border-0 flex-shrink-0">
                                +{lesson.xp} XP
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">{lesson.description}</p>
                            <div className="flex items-center text-xs text-muted-foreground mt-2">
                              <Clock className="h-3 w-3 mr-1" />
                              <span>{lesson.duration}</span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="overview" className="space-y-4 pt-4">
              <Card className="duo-card">
                <CardContent className="p-4 space-y-4">
                  <div>
                    <h3 className="font-medium mb-2">Course Information</h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex justify-between">
                        <span className="text-muted-foreground">Number of Lessons</span>
                        <span className="font-medium">{course.lessons}</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-muted-foreground">Expected Duration</span>
                        <span className="font-medium">{course.duration}</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-muted-foreground">Prerequisites</span>
                        <span className="font-medium">{course.prerequisites}</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-muted-foreground">Instructor</span>
                        <span className="font-medium">{course.instructor}</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-medium mb-2">Learning Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {course.skills.map((skill) => (
                        <Badge key={skill} variant="outline">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="resources" className="space-y-4 pt-4">
              <Card className="duo-card">
                <CardContent className="p-4">
                  <h3 className="font-medium mb-3">Additional Learning Resources</h3>
                  <ul className="space-y-3">
                    <li>
                      <div className="flex items-center text-muted-foreground cursor-not-allowed">
                        <BookOpen className="h-4 w-4 mr-2" />
                        Business Fundamentals Glossary (Coming Soon)
                      </div>
                    </li>
                    <li>
                      <div className="flex items-center text-muted-foreground cursor-not-allowed">
                        <BookOpen className="h-4 w-4 mr-2" />
                        Financial Statements Guide PDF (Coming Soon)
                      </div>
                    </li>
                    <li>
                      <div className="flex items-center text-muted-foreground cursor-not-allowed">
                        <BookOpen className="h-4 w-4 mr-2" />
                        Marketing Strategy Notes (Coming Soon)
                      </div>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          <Card className="duo-card">
            <CardContent className="p-4 space-y-4">
              <div>
                <h3 className="font-medium mb-2">Course Progress</h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Completion Rate</span>
                    <span className="font-medium">{course.progress}%</span>
                  </div>
                  <Progress value={course.progress} className="h-2" />
                </div>
              </div>

              <Button className="w-full duo-button bg-primary text-white" asChild>
                <Link href={`/courses/beginner/${course.id}/lessons/4`}>Continue Learning</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="duo-card bg-gradient-to-r from-primary/10 to-secondary/10">
            <CardContent className="p-4 flex flex-col items-center text-center">
              <DuoCharacter mood="happy" size="md" className="mb-3" />
              <h3 className="font-medium mb-1">Learning Tip</h3>
              <p className="text-sm text-muted-foreground">
                Study consistently for 20-30 minutes daily to complete this course within 4 weeks!
              </p>
            </CardContent>
          </Card>

          <Card className="duo-card">
            <CardContent className="p-4">
              <h3 className="font-medium mb-3">Available Badges</h3>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-warning/20 flex items-center justify-center mb-1">
                    <Award className="h-6 w-6 text-warning" />
                  </div>
                  <span className="text-xs">Beginner</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-1">
                    <Award className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <span className="text-xs">Business Pro</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-1">
                    <Award className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <span className="text-xs">Finisher</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
