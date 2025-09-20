"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Legend,
} from "recharts"
import { Calendar, TrendingUp, ArrowRight } from "lucide-react"

// 샘플 데이터 생성 함수
const generateData = (days: number, startDate: Date, type: string) => {
  const data = []
  const currentDate = new Date(startDate)

  for (let i = 0; i < days; i++) {
    const date = new Date(currentDate)
    date.setDate(date.getDate() + i)
    const dateStr = `${date.getMonth() + 1}/${date.getDate()}`

    // 주말에는 활동이 적거나 없게 설정
    const isWeekend = date.getDay() === 0 || date.getDay() === 6
    const randomFactor = isWeekend ? 0.3 : 1

    let value = 0
    let prevValue = 0

    switch (type) {
      case "gradingTime":
        value = isWeekend ? Math.floor(Math.random() * 30) : Math.floor(Math.random() * 120 + 60)
        prevValue = Math.floor(value * (0.7 + Math.random() * 0.5))
        break
      case "assignments":
        value = isWeekend ? Math.floor(Math.random() * 2) : Math.floor(Math.random() * 15 + 5)
        prevValue = Math.floor(value * (0.7 + Math.random() * 0.5))
        break
      case "avgGrade":
        value = isWeekend ? Math.floor(Math.random() * 10 + 70) : Math.floor(Math.random() * 20 + 70)
        prevValue = Math.floor(value * (0.9 + Math.random() * 0.2))
        break
    }

    // 가끔 0값을 넣어 학습을 건너뛴 날 표현
    if (Math.random() < 0.15) {
      value = 0
      prevValue = 0
    }

    data.push({
      date: dateStr,
      value,
      prevValue,
    })
  }

  return data
}

// 날짜 범위 옵션
const dateRanges = [
  { value: "7d", label: "Last 7 days" },
  { value: "14d", label: "Last 14 days" },
  { value: "30d", label: "Last 30 days" },
  { value: "90d", label: "This semester" },
]

export default function ProgressChart() {
  const [activeTab, setActiveTab] = useState("gradingTime")
  const [dateRange, setDateRange] = useState("14d")
  const [showComparison, setShowComparison] = useState(false)
  const [chartData, setChartData] = useState<any[]>([])
  const [isAnimating, setIsAnimating] = useState(true)

  // 데이터 로드 및 애니메이션 효과
  useEffect(() => {
    setIsAnimating(true)
    const days = Number.parseInt(dateRange.replace("d", ""))
    const today = new Date()
    const data = generateData(days, new Date(today.setDate(today.getDate() - days + 1)), activeTab)

    // 애니메이션 효과를 위해 데이터를 점진적으로 표시
    const animateData = async () => {
      const tempData: any[] = []
      for (let i = 0; i < data.length; i++) {
        tempData.push(data[i])
        setChartData([...tempData])
        await new Promise((resolve) => setTimeout(resolve, 50))
      }
      setIsAnimating(false)
    }

    animateData()
  }, [activeTab, dateRange])

  const getYAxisLabel = () => {
    switch (activeTab) {
      case "gradingTime":
        return "Grading Time (minutes)"
      case "assignments":
        return "Assignments Graded"
      case "avgGrade":
        return "Average Grade (%)"
      default:
        return ""
    }
  }

  const getChartColor = () => {
    switch (activeTab) {
      case "gradingTime":
        return "hsl(var(--primary))"
      case "assignments":
        return "hsl(var(--info))"
      case "avgGrade":
        return "hsl(var(--warning))"
      default:
        return "hsl(var(--primary))"
    }
  }

  const getComparisonColor = () => {
    switch (activeTab) {
      case "gradingTime":
        return "hsl(var(--primary) / 0.5)"
      case "assignments":
        return "hsl(var(--info) / 0.5)"
      case "avgGrade":
        return "hsl(var(--warning) / 0.5)"
      default:
        return "hsl(var(--primary) / 0.5)"
    }
  }

  // 평균값 계산
  const calculateAverage = (data: any[], key: string) => {
    const validValues = data.filter((item) => item[key] > 0).map((item) => item[key])
    if (validValues.length === 0) return 0
    return Math.round(validValues.reduce((sum, val) => sum + val, 0) / validValues.length)
  }

  // 총합 계산
  const calculateTotal = (data: any[], key: string) => {
    return data.reduce((sum, item) => sum + item[key], 0)
  }

  const average = calculateAverage(chartData, "value")
  const total = calculateTotal(chartData, "value")

  // 목표 설정 (예시)
  const getGoalValue = () => {
    switch (activeTab) {
      case "gradingTime":
        return 90 // 90분/일 목표
      case "assignments":
        return 10 // 10레슨/일 목표
      case "avgGrade":
        return 80 // 80% 평균 점수 목표
      default:
        return 0
    }
  }

  // 커스텀 툴팁 컴포넌트
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const currentValue = payload[0].value
      const prevValue = payload[1]?.value || 0
      const difference = currentValue - prevValue
      const percentChange = prevValue > 0 ? Math.round((difference / prevValue) * 100) : 0

      return (
        <div className="bg-background border border-border p-3 rounded-lg shadow-md">
          <p className="font-bold mb-1">{label}</p>
          <p className="text-sm flex items-center">
            <span
              className="w-3 h-3 inline-block mr-2 rounded-full"
              style={{ backgroundColor: payload[0].color }}
            ></span>
            {activeTab === "gradingTime" && `${currentValue} minutes`}
            {activeTab === "assignments" && `${currentValue} assignments`}
            {activeTab === "avgGrade" && `${currentValue}% average`}
          </p>

          {showComparison && prevValue > 0 && (
            <>
              <p className="text-sm flex items-center mt-1">
                <span
                  className="w-3 h-3 inline-block mr-2 rounded-full"
                  style={{ backgroundColor: payload[1].color }}
                ></span>
                {activeTab === "gradingTime" && `${prevValue} minutes (previous)`}
                {activeTab === "assignments" && `${prevValue} assignments (previous)`}
                {activeTab === "avgGrade" && `${prevValue}% average (previous)`}
              </p>
              <p className="text-xs mt-1 flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" />
                <span className={difference >= 0 ? "text-success" : "text-destructive"}>
                  {difference >= 0 ? "+" : ""}
                  {difference} ({percentChange}%)
                </span>
              </p>
            </>
          )}
        </div>
      )
    }
    return null
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full sm:w-auto">
          <TabsList className="grid grid-cols-3 w-full">
            <TabsTrigger value="gradingTime" className="font-medium">
              Grading Time
            </TabsTrigger>
            <TabsTrigger value="assignments" className="font-medium">
              Assignments
            </TabsTrigger>
            <TabsTrigger value="avgGrade" className="font-medium">
              Average Grade
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex items-center gap-2">
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-[140px] h-9 text-sm">
              <Calendar className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              {dateRanges.map((range) => (
                <SelectItem key={range.value} value={range.value}>
                  {range.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button
            variant={showComparison ? "default" : "outline"}
            size="sm"
            onClick={() => setShowComparison(!showComparison)}
            className="text-xs h-9"
          >
            Compare Previous
          </Button>
        </div>
      </div>

      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={getChartColor()} stopOpacity={0.8} />
                <stop offset="95%" stopColor={getChartColor()} stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="colorPrevValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={getComparisonColor()} stopOpacity={0.8} />
                <stop offset="95%" stopColor={getComparisonColor()} stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted))" />
            <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" tick={{ fontSize: 12 }} tickCount={7} />
            <YAxis
              stroke="hsl(var(--muted-foreground))"
              tick={{ fontSize: 12 }}
              label={{
                value: getYAxisLabel(),
                angle: -90,
                position: "insideLeft",
                style: { textAnchor: "middle", fontSize: 12, fill: "hsl(var(--muted-foreground))" },
              }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />

            {/* 목표선 */}
            <ReferenceLine
              y={getGoalValue()}
              stroke="hsl(var(--success))"
              strokeDasharray="3 3"
              label={{
                value: "Goal",
                position: "right",
                fill: "hsl(var(--success))",
                fontSize: 12,
              }}
            />

            {/* 평균선 */}
            <ReferenceLine
              y={average}
              stroke="hsl(var(--info))"
              strokeDasharray="3 3"
              label={{
                value: "Average",
                position: "left",
                fill: "hsl(var(--info))",
                fontSize: 12,
              }}
            />

            {showComparison && (
              <Area
                type="monotone"
                dataKey="prevValue"
                name="Previous Period"
                stroke={getComparisonColor()}
                fillOpacity={0}
                strokeWidth={2}
                strokeDasharray="5 5"
                activeDot={{ r: 6, strokeWidth: 0, fill: getComparisonColor() }}
              />
            )}

            <Area
              type="monotone"
              dataKey="value"
              name="Current Period"
              stroke={getChartColor()}
              fill="url(#colorValue)"
              fillOpacity={1}
              strokeWidth={2}
              activeDot={{ r: 6, strokeWidth: 0, fill: getChartColor() }}
              isAnimationActive={isAnimating}
              animationDuration={1000}
              animationEasing="ease-in-out"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="duo-card">
          <CardContent className="p-4 text-center">
            <div className="text-sm text-muted-foreground mb-1">
              {activeTab === "gradingTime" && "Average Grading Time"}
              {activeTab === "assignments" && "Average Assignments"}
              {activeTab === "avgGrade" && "Overall Average Grade"}
            </div>
            <div className="text-xl font-bold" style={{ color: getChartColor() }}>
              {activeTab === "gradingTime" && `${average} min/day`}
              {activeTab === "assignments" && `${average}/day`}
              {activeTab === "avgGrade" && `${average}%`}
            </div>
          </CardContent>
        </Card>

        <Card className="duo-card">
          <CardContent className="p-4 text-center">
            <div className="text-sm text-muted-foreground mb-1">
              {activeTab === "gradingTime" && "Total Grading Time"}
              {activeTab === "assignments" && "Total Assignments"}
              {activeTab === "avgGrade" && "Grade Distribution"}
            </div>
            <div className="text-xl font-bold" style={{ color: getChartColor() }}>
              {activeTab === "gradingTime" && `${total} min`}
              {activeTab === "assignments" && `${total} graded`}
              {activeTab === "avgGrade" && `${total}% avg`}
            </div>
          </CardContent>
        </Card>

        <Card className="duo-card bg-gradient-to-r from-primary/5 to-secondary/5">
          <CardContent className="p-4 flex flex-col items-center justify-center h-full">
            <Button variant="link" className="text-primary font-bold p-0 flex items-center" asChild>
              <a href="/dashboard/analytics">
                View Detailed Analytics
                <ArrowRight className="ml-1 h-4 w-4" />
              </a>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
