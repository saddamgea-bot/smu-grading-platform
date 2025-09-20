import { type NextRequest, NextResponse } from "next/server"
import { generateLearningPrediction } from "@/lib/prediction-model-service"
import type { PredictionModelParams } from "@/types/prediction"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, timeframe, includeSkills, includeCourses, includeMastery, includeRecommendations } =
      body as PredictionModelParams

    if (!userId || !timeframe) {
      return NextResponse.json({ error: "userId and timeframe are required parameters." }, { status: 400 })
    }

    const prediction = await generateLearningPrediction({
      userId,
      timeframe,
      includeSkills,
      includeCourses,
      includeMastery,
      includeRecommendations,
    })

    return NextResponse.json(prediction)
  } catch (error) {
    console.error("Error occurred during prediction generation:", error)
    return NextResponse.json({ error: "An error occurred while generating predictions." }, { status: 500 })
  }
}
