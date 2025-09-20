"use client"

import type { CompletionPrediction } from "@/types/prediction"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { CalendarIcon, CheckCircleIcon } from "lucide-react"

interface CoursePredictionListProps {
  data: CompletionPrediction[]
}

export function CoursePredictionList({ data }: CoursePredictionListProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date)
  }

  const getDaysRemaining = (dateString: string) => {
    const today = new Date()
    const targetDate = new Date(dateString)
    const diffTime = targetDate.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  return (
    <div className="space-y-4">
      {data.map((course) => {
        const progressPercent = course.currentProgress * 100
        const daysRemaining = getDaysRemaining(course.predictedCompletionDate)

        return (
          <Card key={course.courseId} className="overflow-hidden">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-4">
                <div>
                  <h3 className="text-lg font-medium">{course.courseName}</h3>
                  <div className="flex items-center text-sm text-muted-foreground mt-1">
                    <CalendarIcon className="mr-1 h-4 w-4" />
                    <span>Expected completion: {formatDate(course.predictedCompletionDate)}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">
                    {daysRemaining > 0 ? `${daysRemaining} days remaining` : "Past due date"}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    (Confidence: {(course.confidence * 100).toFixed(0)}%)
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Progress</span>
                  <span className="text-sm font-medium">{progressPercent.toFixed(0)}%</span>
                </div>
                <Progress value={progressPercent} className="h-2" />
              </div>

              <div className="mt-4 flex items-start gap-2 text-sm text-muted-foreground">
                <CheckCircleIcon className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <p>
                  At your current pace, you are expected to complete this course on
                  <span className="font-medium text-foreground"> {formatDate(course.predictedCompletionDate)}</span>.
                </p>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
