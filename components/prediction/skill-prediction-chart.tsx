"use client"

import type { SkillPrediction } from "@/types/prediction"
import { Card, CardContent } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LabelList } from "recharts"

interface SkillPredictionChartProps {
  data: SkillPrediction[]
}

export function SkillPredictionChart({ data }: SkillPredictionChartProps) {
  const chartData = data.map((item) => ({
    name: item.skill,
    Current: Number.parseFloat((item.currentLevel * 10).toFixed(1)), // Convert to 100 scale
    Predicted: Number.parseFloat((item.predictedLevel * 10).toFixed(1)), // Convert to 100 scale
    Confidence: Number.parseFloat((item.confidence * 100).toFixed(0)),
  }))

  return (
    <div className="space-y-6">
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis domain={[0, 100]} />
          <Tooltip formatter={(value) => [`${value}`, ""]} labelFormatter={(label) => `${label} Skill`} />

          <Bar dataKey="Current" fill="#4f46e5" radius={[4, 4, 0, 0]}>
            <LabelList dataKey="Current" position="top" />
          </Bar>
          <Bar dataKey="Predicted" fill="#10b981" radius={[4, 4, 0, 0]}>
            <LabelList dataKey="Predicted" position="top" />
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {data.map((skill) => (
          <Card key={skill.skill} className="overflow-hidden">
            <CardContent className="p-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium">{skill.skill}</h3>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span>Current Score</span>
                  <span className="font-medium">{(skill.currentLevel * 10).toFixed(1)}/100</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Predicted Score</span>
                  <span className="font-medium">{(skill.predictedLevel * 10).toFixed(1)}/100</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Confidence</span>
                  <span className="font-medium">{(skill.confidence * 100).toFixed(0)}%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
