import { LearningPredictionDashboard } from "@/components/prediction/learning-prediction-dashboard"

export default function AnalyticsPage() {
  const instructorId = "instructor123"

  return (
    <div className="container py-8 space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Analytics Dashboard</h1>
        <p className="text-muted-foreground">Track student performance and grading insights across all your courses</p>
      </div>
      <LearningPredictionDashboard userId={instructorId} />
    </div>
  )
}
