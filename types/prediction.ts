export interface LearningDataPoint {
  date: string
  studyTimeMinutes: number
  completedLessons: number
  quizAccuracy: number
  vocabularyLearned: number
  conversationMessages: number
}

export interface SkillPrediction {
  skill: string
  currentLevel: number
  predictedLevel: number
  confidence: number
  timeToNextLevel: number //
}

export interface CompletionPrediction {
  courseId: string
  courseName: string
  currentProgress: number
  predictedCompletionDate: string
  confidence: number
}

export interface MasteryPrediction {
  category: string
  currentMastery: number
  predictedMastery: number
  timeframe: number //
  confidence: number
}

export interface LearningPrediction {
  skillPredictions: SkillPrediction[]
  completionPredictions: CompletionPrediction[]
  masteryPredictions: MasteryPrediction[]
  overallProgress: {
    current: number
    predicted30Days: number
    predicted90Days: number
    confidence: number
  }
  recommendedFocus: string[]
  predictedLearningCurve: {
    date: string
    predictedLevel: number
    lowerBound: number
    upperBound: number
  }[]
}

export interface PredictionModelParams {
  userId: string
  timeframe: number //
  includeSkills?: boolean
  includeCourses?: boolean
  includeMastery?: boolean
  includeRecommendations?: boolean
}
