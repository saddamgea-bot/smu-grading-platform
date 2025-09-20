"use client"

import type { MasteryPrediction } from "@/types/prediction"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend, ResponsiveContainer } from "recharts"

interface MasteryPredictionChartProps {
  data: MasteryPrediction[]
}

export function MasteryPredictionChart({ data }: MasteryPredictionChartProps) {
  const radarData = data.map((item) => ({
    subject: item.category,
    Current: Number.parseFloat((item.currentMastery * 100).toFixed(0)),
    Predicted: Number.parseFloat((item.predictedMastery * 100).toFixed(0)),
    fullMark: 100,
  }))

  return (
    <div className="space-y-6">
      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
            <PolarGrid />
            <PolarAngleAxis dataKey="subject" />
            <PolarRadiusAxis angle={30} domain={[0, 100]} />
            <Radar name="Current Mastery" dataKey="Current" stroke="#4f46e5" fill="#4f46e5" fillOpacity={0.3} />
            <Radar name="Predicted Mastery" dataKey="Predicted" stroke="#10b981" fill="#10b981" fillOpacity={0.3} />
            <Legend />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {data.map((mastery) => {
          const currentPercent = mastery.currentMastery * 100
          const predictedPercent = mastery.predictedMastery * 100
          const improvement = predictedPercent - currentPercent

          return (
            <Card key={mastery.category} className="overflow-hidden">
              <CardContent className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium">{mastery.category}</h3>
                  <span className="text-sm text-muted-foreground">{mastery.timeframe} day prediction</span>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Current Mastery</span>
                      <span className="text-sm font-medium">{currentPercent.toFixed(0)}%</span>
                    </div>
                    <Progress value={currentPercent} className="h-2" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Predicted Mastery</span>
                      <span className="text-sm font-medium">{predictedPercent.toFixed(0)}%</span>
                    </div>
                    <Progress value={predictedPercent} className="h-2" />
                  </div>

                  <div className="text-sm">
                    
                    
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
