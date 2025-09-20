"use client"

import { Card, CardContent } from "@/components/ui/card"
import { CheckCircleIcon, TrendingUpIcon, BookOpenIcon, ClockIcon, BrainIcon } from "lucide-react"

interface RecommendationsListProps {
  recommendations: string[]
}

export function RecommendationsList({ recommendations }: RecommendationsListProps) {
  const getIconForRecommendation = (recommendation: string, index: number) => {
    if (recommendation.includes("skill") || recommendation.includes("ability")) {
      return <BrainIcon className="h-5 w-5 text-blue-500" />
    } else if (recommendation.includes("time")) {
      return <ClockIcon className="h-5 w-5 text-amber-500" />
    } else if (recommendation.includes("learning") || recommendation.includes("study")) {
      return <BookOpenIcon className="h-5 w-5 text-emerald-500" />
    } else if (recommendation.includes("improve") || recommendation.includes("increase")) {
      return <TrendingUpIcon className="h-5 w-5 text-purple-500" />
    } else {
      return <CheckCircleIcon className="h-5 w-5 text-green-500" />
    }
  }

  return (
    <div className="space-y-4">
      {recommendations.map((recommendation, index) => (
        <Card key={index} className="overflow-hidden">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className="mt-0.5">{getIconForRecommendation(recommendation, index)}</div>
              <div>
                <p className="font-medium">{recommendation}</p>
                <p className="text-sm text-muted-foreground mt-1">
                  {getRecommendationDescription(recommendation, index)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

function getRecommendationDescription(recommendation: string, index: number): string {
  if (recommendation.includes("skill improvement")) {
    return "Focusing on this area will greatly help improve your overall language abilities."
  } else if (recommendation.includes("study more")) {
    return "This area currently needs the most improvement."
  } else if (recommendation.includes("study time")) {
    return "Consistent increase in study time is important for long-term achievement improvement."
  } else if (recommendation.includes("conversation practice")) {
    return "Actual conversation practice greatly improves language fluency."
  } else if (recommendation.includes("vocabulary review")) {
    return "Increasing vocabulary review frequency helps with long-term memory."
  } else {
    return "This recommendation is personalized based on AI analysis."
  }
}
