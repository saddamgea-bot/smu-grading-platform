"use client"

import type { LearningPrediction } from "@/types/prediction"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Users, Clock } from "lucide-react"

interface OverallProgressChartProps {
  data: LearningPrediction["overallProgress"]
}

export function OverallProgressChart({ data }: OverallProgressChartProps) {
  const currentPercent = data.current * 100
  const predicted30DaysPercent = data.predicted30Days * 100
  const predicted90DaysPercent = data.predicted90Days * 100

  const getPercentileRanking = (score: number) => {
    if (score >= 95)
      return {
        rank: "Top 5%",
        color: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200",
        icon: "🏆",
      }
    if (score >= 75)
      return { rank: "Top 25%", color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200", icon: "⭐" }
    if (score >= 50)
      return {
        rank: "Top 50%",
        color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
        icon: "📈",
      }
    if (score >= 40)
      return {
        rank: "Below Passing",
        color: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
        icon: "⚠️",
      }
    return {
      rank: "Bottom 50% - Needs Attention",
      color: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
      icon: "🚨",
    }
  }

  const percentileInfo = getPercentileRanking(currentPercent)

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="font-medium">Current Performance</span>
            <div className="flex items-center gap-2">
              <span className="font-medium">{currentPercent.toFixed(0)}%</span>
              <Badge className={percentileInfo.color}>
                {percentileInfo.icon} {percentileInfo.rank}
              </Badge>
            </div>
          </div>
          <Progress value={currentPercent} className="h-3" />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="font-medium">30 days history</span>
            <span className="font-medium">{predicted30DaysPercent.toFixed(0)}%</span>
          </div>
          <Progress value={predicted30DaysPercent} className="h-3" />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="font-medium">90 days history</span>
            <span className="font-medium">{predicted90DaysPercent.toFixed(0)}%</span>
          </div>
          <Progress value={predicted90DaysPercent} className="h-3" />
        </div>
      </div>

      <div className="bg-muted p-4 rounded-lg">
        <div className="flex items-start gap-3">
          <TrendingUp className="h-5 w-5 text-primary mt-0.5" />
          <div className="flex-1">
            <h4 className="font-medium mb-1">AI Test Readiness Prediction</h4>
            <p className="text-sm text-muted-foreground">
              Based on current performance trends, the class shows {(data.confidence * 100).toFixed(0)}% readiness for
              the upcoming test. Recent assignment completion rates and engagement patterns suggest students need
              additional review time in core concepts.
            </p>
          </div>
          <div className="text-2xl font-bold text-primary">{(data.confidence * 100).toFixed(0)}%</div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 text-center">
        <div className="bg-blue-50 dark:bg-blue-950 p-3 rounded-lg">
          <div className="flex items-center justify-center gap-1 mb-1">
            <Clock className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          </div>
          <div className="text-xl font-bold text-blue-600 dark:text-blue-400">2 Days</div>
          <div className="text-xs text-muted-foreground mt-1">Time Since Last Active </div>
          <div className="text-xs text-muted-foreground"></div>
        </div>

        <div className="bg-green-50 dark:bg-green-950 p-3 rounded-lg">
          <div className="flex items-center justify-center gap-1 mb-1">
            <Users className="h-4 w-4 text-green-600 dark:text-green-400" />
          </div>
          <div className="text-xl font-bold text-green-600 dark:text-green-400">65%</div>
          <div className="text-xs text-muted-foreground mt-1">On Time Submission Rate</div>
          <div className="text-xs text-muted-foreground"></div>
        </div>

        <div className="bg-purple-50 dark:bg-purple-950 p-3 rounded-lg">
          <div className="flex items-center justify-center gap-1 mb-1">
            <TrendingUp className="h-4 w-4 text-purple-600 dark:text-purple-400" />
          </div>
          <div className="text-xl font-bold text-purple-600 dark:text-purple-400">
            {Math.round(((predicted90DaysPercent - currentPercent) / 90) * 100) / 100}%
          </div>
          <div className="text-xs text-muted-foreground mt-1">Daily material access</div>
          <div className="text-xs text-muted-foreground"></div>
        </div>
      </div>
    </div>
  )
}
