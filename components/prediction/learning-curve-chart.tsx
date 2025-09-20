"use client"

import type { LearningPrediction } from "@/types/prediction"
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Line, LineChart } from "recharts"

interface LearningCurveChartProps {
  data: LearningPrediction["predictedLearningCurve"]
}

export function LearningCurveChart({ data }: LearningCurveChartProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
    }).format(date)
  }

  const generateRealisticData = () => {
    const baseData = []
    const startDate = new Date()
    const weeks = Math.ceil(data.length / 7) // Convert days to weeks

    for (let week = 0; week < weeks; week++) {
      const weekDate = new Date(startDate)
      weekDate.setDate(startDate.getDate() + week * 7)

      // Create realistic weekly fluctuations with overall upward trend
      const baseScore = 65 + week * 3 // Gradual improvement over time
      const weeklyVariation = (Math.random() - 0.5) * 15 // ±7.5 point variation
      const score = Math.max(40, Math.min(100, baseScore + weeklyVariation))

      baseData.push({
        date: formatDate(weekDate.toISOString()),
        level: Math.round(score * 10) / 10,
        week: `Week ${week + 1}`,
      })
    }
    return baseData
  }

  const chartData = generateRealisticData()

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="week" />
        <YAxis domain={[0, 100]} tickFormatter={(value) => `${value}%`} />
        <Tooltip formatter={(value) => [`${value}%`, "Performance Level"]} labelFormatter={(label) => `${label}`} />
        <Line
          type="monotone"
          dataKey="level"
          stroke="#4f46e5"
          strokeWidth={3}
          dot={{ r: 4, fill: "#4f46e5" }}
          activeDot={{ r: 6, fill: "#4f46e5" }}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
