"use client"

import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"

const conversationData = [
  { date: "6/1", accuracy: 75, fluency: 68 },
  { date: "6/5", accuracy: 78, fluency: 70 },
  { date: "6/10", accuracy: 80, fluency: 72 },
  { date: "6/15", accuracy: 79, fluency: 73 },
  { date: "6/20", accuracy: 82, fluency: 75 },
  { date: "6/25", accuracy: 85, fluency: 78 },
  { date: "6/30", accuracy: 84, fluency: 77 },
]

const COLORS = ["#4f46e5", "#10b981", "#f59e0b", "#ec4899", "#6b7280"]

const durationData = [
  { name: "5-10 min", value: 40 },
  { name: "10-15 min", value: 30 },
  { name: "15-20 min", value: 20 },
  { name: "20+ min", value: 10 },
]

const topicData = [
  { name: "Cafe", count: 8 },
  { name: "Restaurant", count: 6 },
  { name: "Shopping", count: 5 },
  { name: "Travel", count: 4 },
  { name: "Hobbies", count: 3 },
]

const progressData = [
  { week: "Week 1", accuracy: 70, fluency: 65, vocabulary: 60, grammar: 55 },
  { week: "Week 2", accuracy: 72, fluency: 67, vocabulary: 63, grammar: 58 },
  { week: "Week 3", accuracy: 75, fluency: 70, vocabulary: 67, grammar: 60 },
  { week: "Week 4", accuracy: 78, fluency: 72, vocabulary: 70, grammar: 63 },
  { week: "Week 5", accuracy: 80, fluency: 75, vocabulary: 73, grammar: 65 },
  { week: "Week 6", accuracy: 82, fluency: 77, vocabulary: 75, grammar: 68 },
]

const topicPerformanceData = [
  { topic: "At Cafe", accuracy: 85, fluency: 80 },
  { topic: "At Restaurant", accuracy: 82, fluency: 78 },
  { topic: "Shopping", accuracy: 78, fluency: 75 },
  { topic: "Travel Planning", accuracy: 75, fluency: 70 },
  { topic: "Hobby Talk", accuracy: 80, fluency: 76 },
]

export function ConversationOverviewChart() {
  return (
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={conversationData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="accuracy" stroke="#10b981" name="Accuracy" />
          <Line type="monotone" dataKey="fluency" stroke="#f59e0b" name="Fluency" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export function DurationPieChart() {
  return (
    <div className="h-[250px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={durationData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {durationData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

export function TopicBarChart() {
  return (
    <div className="h-[250px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={topicData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="#4f46e5" name="Conversations" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export function ProgressLineChart() {
  return (
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={progressData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="week" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="accuracy" stroke="#10b981" name="Accuracy" />
          <Line type="monotone" dataKey="fluency" stroke="#f59e0b" name="Fluency" />
          <Line type="monotone" dataKey="vocabulary" stroke="#4f46e5" name="Vocabulary" />
          <Line type="monotone" dataKey="grammar" stroke="#ec4899" name="Grammar" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export function TopicPerformanceBarChart() {
  return (
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={topicPerformanceData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
          layout="vertical"
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" domain={[0, 100]} />
          <YAxis dataKey="topic" type="category" width={100} />
          <Tooltip />
          <Legend />
          <Bar dataKey="accuracy" name="Accuracy" fill="#10b981" />
          <Bar dataKey="fluency" name="Fluency" fill="#f59e0b" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
