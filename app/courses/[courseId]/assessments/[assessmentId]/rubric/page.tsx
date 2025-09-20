"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { Send, Bot, User, FileText, Save, Download, MessageSquare, Plus, Edit, Check, X } from "lucide-react"
import Link from "next/link"

interface AssignmentRubricPageProps {
  params: {
    courseId: string
    assessmentId: string
  }
}

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

interface RubricCriteria {
  id: string
  name: string
  description: string
  points: number
  levels: {
    name: string
    description: string
    points: number
  }[]
}

export default function AssignmentRubricPage({ params }: AssignmentRubricPageProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: `Hello! I'm here to help you create a comprehensive rubric for your ${getAssessmentName(params.assessmentId)} assignment. Let's start by discussing the key learning objectives and assessment criteria you'd like to include. What specific skills or knowledge areas should students demonstrate in this assignment?`,
      timestamp: new Date(),
    },
  ])

  const [inputMessage, setInputMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [rubricCriteria, setRubricCriteria] = useState<RubricCriteria[]>(getInitialRubric(params.assessmentId))
  const [editingCriterion, setEditingCriterion] = useState<string | null>(null)
  const [editingLevel, setEditingLevel] = useState<string | null>(null)
  const [tempValues, setTempValues] = useState<any>({})

  const course = getCourseById(params.courseId)
  const assessment = getAssessmentById(params.assessmentId)

  const totalPoints = rubricCriteria.reduce((sum, criteria) => sum + criteria.points, 0)
  const isOverLimit = totalPoints > 100

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: inputMessage,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputMessage("")
    setIsLoading(true)

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: generateAIResponse(inputMessage, params.assessmentId),
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, aiResponse])
      setIsLoading(false)
    }, 1500)
  }

  const generateAIResponse = (userInput: string, assessmentId: string): string => {
    const input = userInput.toLowerCase()
    const assessmentType = getAssessmentType(assessmentId)

    if (assessmentType === "midterm") {
      if (input.includes("exam") || input.includes("test") || input.includes("midterm")) {
        return "For midterm examinations, I recommend these key criteria: 1) **Conceptual Understanding** (30-35 points) - Demonstrates mastery of key business concepts, 2) **Problem-Solving Application** (25-30 points) - Applies theories to practical scenarios, 3) **Analytical Thinking** (20-25 points) - Shows critical analysis and reasoning, and 4) **Communication Clarity** (10-15 points) - Clear, well-organized responses. Would you like me to develop detailed performance levels for any of these?"
      }
    } else if (assessmentType === "case-study") {
      if (input.includes("case") || input.includes("analysis") || input.includes("study")) {
        return "Excellent! For case study analysis, I recommend these key criteria: 1) **Problem Identification** (20-25 points) - Clearly identifies key business issues, 2) **Data Analysis** (25-30 points) - Effective use of case data and evidence, 3) **Solution Development** (25-30 points) - Comprehensive and feasible recommendations, and 4) **Professional Presentation** (15-20 points) - Clear structure and business writing. Should we customize these for your specific case study?"
      }
    } else if (assessmentType === "quiz") {
      if (input.includes("quiz") || input.includes("chapter") || input.includes("quick")) {
        return "For chapter-based quizzes, I suggest: 1) **Content Mastery** (40-50 points) - Accurate recall and understanding of chapter concepts, 2) **Application Skills** (30-35 points) - Ability to apply concepts to new scenarios, and 3) **Clarity of Response** (15-20 points) - Clear, concise answers. This weighting emphasizes content knowledge while valuing practical application. What specific chapters or topics should we focus on?"
      }
    }

    // Generic responses
    if (input.includes("points") || input.includes("weight") || input.includes("grade")) {
      return `For effective point distribution in ${assessment?.name || "this assessment"}, I suggest balancing technical competency with communication skills. What's most important for your specific learning objectives?`
    }

    return "That's an insightful consideration! To help you develop this further, could you tell me more about: 1) What specific skills this criterion should assess, 2) How students will demonstrate competency, and 3) What distinguishes excellent from adequate performance? This will help us create precise rubric language."
  }

  const startEditingCriterion = (criterionId: string, field: string, currentValue: any) => {
    setEditingCriterion(`${criterionId}-${field}`)
    setTempValues({ [field]: currentValue })
  }

  const saveCriterionEdit = (criterionId: string, field: string) => {
    setRubricCriteria((prev) =>
      prev.map((criterion) => {
        if (criterion.id === criterionId) {
          return { ...criterion, [field]: tempValues[field] }
        }
        return criterion
      }),
    )
    setEditingCriterion(null)
    setTempValues({})
  }

  const startEditingLevel = (criterionId: string, levelIndex: number, field: string, currentValue: any) => {
    setEditingLevel(`${criterionId}-${levelIndex}-${field}`)
    setTempValues({ [field]: currentValue })
  }

  const saveLevelEdit = (criterionId: string, levelIndex: number, field: string) => {
    setRubricCriteria((prev) =>
      prev.map((criterion) => {
        if (criterion.id === criterionId) {
          const updatedLevels = [...criterion.levels]
          updatedLevels[levelIndex] = { ...updatedLevels[levelIndex], [field]: tempValues[field] }
          return { ...criterion, levels: updatedLevels }
        }
        return criterion
      }),
    )
    setEditingLevel(null)
    setTempValues({})
  }

  const cancelEdit = () => {
    setEditingCriterion(null)
    setEditingLevel(null)
    setTempValues({})
  }

  const addCriterion = () => {
    const remainingPoints = Math.max(0, 100 - totalPoints)
    const defaultPoints = Math.min(20, remainingPoints)

    const newCriterion: RubricCriteria = {
      id: Date.now().toString(),
      name: "New Criterion",
      description: "Description for new criterion",
      points: defaultPoints,
      levels: [
        { name: "Excellent", description: "Exceeds expectations", points: defaultPoints },
        { name: "Good", description: "Meets expectations", points: Math.round(defaultPoints * 0.8) },
        { name: "Satisfactory", description: "Approaches expectations", points: Math.round(defaultPoints * 0.6) },
        { name: "Needs Improvement", description: "Below expectations", points: Math.round(defaultPoints * 0.4) },
      ],
    }
    setRubricCriteria((prev) => [...prev, newCriterion])
  }

  return (
    <div className="space-y-6">
      <section className="space-y-4">
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-foreground">
            Dashboard
          </Link>
          <span>/</span>
          <Link href={`/courses/${params.courseId}/assessments`} className="hover:text-foreground">
            {course?.code}
          </Link>
          <span>/</span>
          <span className="text-foreground">Assignment Rubric</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tight text-balance">AI Rubric Assistant: {assessment?.name}</h1>
            <p className="text-muted-foreground text-lg">
              Collaborate with AI to create comprehensive assessment rubrics
            </p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" className="academic-button bg-transparent">
              <Save className="mr-2 h-4 w-4" />
              Save Draft
            </Button>
            <Button className="academic-button bg-primary text-primary-foreground">
              <Download className="mr-2 h-4 w-4" />
              Export Rubric
            </Button>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chat Interface */}
        <Card className="academic-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <MessageSquare className="h-5 w-5" />
              <span>Rubric Discussion</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <ScrollArea className="h-96 w-full border rounded-lg p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${
                        message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                      }`}
                    >
                      <div className="flex items-start space-x-2">
                        {message.role === "assistant" ? (
                          <Bot className="h-4 w-4 mt-0.5 flex-shrink-0" />
                        ) : (
                          <User className="h-4 w-4 mt-0.5 flex-shrink-0" />
                        )}
                        <div className="space-y-1">
                          <p className="text-sm">{message.content}</p>
                          <p className="text-xs opacity-70">{message.timestamp.toLocaleTimeString()}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-muted rounded-lg p-3 max-w-[80%]">
                      <div className="flex items-center space-x-2">
                        <Bot className="h-4 w-4" />
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-current rounded-full animate-bounce"></div>
                          <div
                            className="w-2 h-2 bg-current rounded-full animate-bounce"
                            style={{ animationDelay: "0.1s" }}
                          ></div>
                          <div
                            className="w-2 h-2 bg-current rounded-full animate-bounce"
                            style={{ animationDelay: "0.2s" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>

            <div className="flex space-x-2">
              <Input
                placeholder="Discuss rubric criteria, point allocation, or assessment goals..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                className="flex-1"
              />
              <Button onClick={handleSendMessage} disabled={isLoading}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Rubric Preview */}
        <Card className="academic-card">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center space-x-2">
                <FileText className="h-5 w-5" />
                <span>Rubric Preview</span>
              </CardTitle>
              <Button variant="outline" size="sm" onClick={addCriterion} disabled={totalPoints >= 100}>
                <Plus className="h-4 w-4 mr-1" />
                Add Criterion
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-96">
              <div className="space-y-6">
                <div className="text-center space-y-2">
                  <h3 className="text-lg font-semibold">{assessment?.name} Rubric</h3>
                  <div className="flex items-center justify-center gap-2">
                    <Badge variant={isOverLimit ? "destructive" : "outline"} className="academic-badge">
                      Total Points: {Math.min(totalPoints, 100)}/100
                    </Badge>
                    {isOverLimit && <span className="text-xs text-destructive">Exceeds 100 point limit</span>}
                  </div>
                </div>

                {rubricCriteria.map((criteria, index) => (
                  <div key={criteria.id} className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 flex-1">
                        {editingCriterion === `${criteria.id}-name` ? (
                          <div className="flex items-center gap-2 flex-1">
                            <Input
                              value={tempValues.name || criteria.name}
                              onChange={(e) => setTempValues({ ...tempValues, name: e.target.value })}
                              className="flex-1"
                            />
                            <Button size="sm" onClick={() => saveCriterionEdit(criteria.id, "name")}>
                              <Check className="h-3 w-3" />
                            </Button>
                            <Button size="sm" variant="outline" onClick={cancelEdit}>
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2 flex-1">
                            <h4 className="font-medium">{criteria.name}</h4>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => startEditingCriterion(criteria.id, "name", criteria.name)}
                            >
                              <Edit className="h-3 w-3" />
                            </Button>
                          </div>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        {editingCriterion === `${criteria.id}-points` ? (
                          <div className="flex items-center gap-2">
                            <Input
                              type="number"
                              min="0"
                              max="100"
                              value={tempValues.points || criteria.points}
                              onChange={(e) =>
                                setTempValues({ ...tempValues, points: Number.parseInt(e.target.value) || 0 })
                              }
                              className="w-20"
                            />
                            <span className="text-sm">pts</span>
                            <Button size="sm" onClick={() => saveCriterionEdit(criteria.id, "points")}>
                              <Check className="h-3 w-3" />
                            </Button>
                            <Button size="sm" variant="outline" onClick={cancelEdit}>
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            <Badge variant="secondary" className="academic-badge">
                              {criteria.points} pts
                            </Badge>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => startEditingCriterion(criteria.id, "points", criteria.points)}
                            >
                              <Edit className="h-3 w-3" />
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>

                    {editingCriterion === `${criteria.id}-description` ? (
                      <div className="flex items-start gap-2">
                        <Textarea
                          value={tempValues.description || criteria.description}
                          onChange={(e) => setTempValues({ ...tempValues, description: e.target.value })}
                          className="flex-1"
                          rows={2}
                        />
                        <div className="flex flex-col gap-1">
                          <Button size="sm" onClick={() => saveCriterionEdit(criteria.id, "description")}>
                            <Check className="h-3 w-3" />
                          </Button>
                          <Button size="sm" variant="outline" onClick={cancelEdit}>
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-start gap-2">
                        <p className="text-sm text-muted-foreground flex-1">{criteria.description}</p>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => startEditingCriterion(criteria.id, "description", criteria.description)}
                        >
                          <Edit className="h-3 w-3" />
                        </Button>
                      </div>
                    )}

                    <div className="grid grid-cols-1 gap-2">
                      {criteria.levels.map((level, levelIndex) => (
                        <div key={levelIndex} className="border rounded-lg p-3">
                          <div className="flex items-center justify-between mb-1">
                            <div className="flex items-center gap-2">
                              {editingLevel === `${criteria.id}-${levelIndex}-name` ? (
                                <div className="flex items-center gap-2">
                                  <Input
                                    value={tempValues.name || level.name}
                                    onChange={(e) => setTempValues({ ...tempValues, name: e.target.value })}
                                    className="w-32"
                                  />
                                  <Button size="sm" onClick={() => saveLevelEdit(criteria.id, levelIndex, "name")}>
                                    <Check className="h-3 w-3" />
                                  </Button>
                                  <Button size="sm" variant="outline" onClick={cancelEdit}>
                                    <X className="h-3 w-3" />
                                  </Button>
                                </div>
                              ) : (
                                <div className="flex items-center gap-2">
                                  <span className="font-medium text-sm">{level.name}</span>
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={() => startEditingLevel(criteria.id, levelIndex, "name", level.name)}
                                  >
                                    <Edit className="h-2 w-2" />
                                  </Button>
                                </div>
                              )}
                            </div>
                            <div className="flex items-center gap-2">
                              {editingLevel === `${criteria.id}-${levelIndex}-points` ? (
                                <div className="flex items-center gap-2">
                                  <Input
                                    type="number"
                                    min="0"
                                    max="100"
                                    value={tempValues.points || level.points}
                                    onChange={(e) =>
                                      setTempValues({ ...tempValues, points: Number.parseInt(e.target.value) || 0 })
                                    }
                                    className="w-16"
                                  />
                                  <span className="text-xs">pts</span>
                                  <Button size="sm" onClick={() => saveLevelEdit(criteria.id, levelIndex, "points")}>
                                    <Check className="h-3 w-3" />
                                  </Button>
                                  <Button size="sm" variant="outline" onClick={cancelEdit}>
                                    <X className="h-3 w-3" />
                                  </Button>
                                </div>
                              ) : (
                                <div className="flex items-center gap-2">
                                  <span className="text-sm text-muted-foreground">{level.points} pts</span>
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={() => startEditingLevel(criteria.id, levelIndex, "points", level.points)}
                                  >
                                    <Edit className="h-2 w-2" />
                                  </Button>
                                </div>
                              )}
                            </div>
                          </div>
                          {editingLevel === `${criteria.id}-${levelIndex}-description` ? (
                            <div className="flex items-start gap-2">
                              <Textarea
                                value={tempValues.description || level.description}
                                onChange={(e) => setTempValues({ ...tempValues, description: e.target.value })}
                                className="flex-1"
                                rows={2}
                              />
                              <div className="flex flex-col gap-1">
                                <Button size="sm" onClick={() => saveLevelEdit(criteria.id, levelIndex, "description")}>
                                  <Check className="h-3 w-3" />
                                </Button>
                                <Button size="sm" variant="outline" onClick={cancelEdit}>
                                  <X className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                          ) : (
                            <div className="flex items-start gap-2">
                              <p className="text-xs text-muted-foreground flex-1">{level.description}</p>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() =>
                                  startEditingLevel(criteria.id, levelIndex, "description", level.description)
                                }
                              >
                                <Edit className="h-2 w-2" />
                              </Button>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>

                    {index < rubricCriteria.length - 1 && <Separator />}
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

// Helper functions
function getCourseById(courseId: string) {
  const courses = {
    cor101: { id: "cor101", code: "COR101", name: "Business Fundamentals" },
    acc101: { id: "acc101", code: "ACC101", name: "Financial Accounting" },
  }
  return courses[courseId as keyof typeof courses]
}

function getAssessmentById(assessmentId: string) {
  const assessments = {
    "midterm-2024": { id: "midterm-2024", name: "Mid-term Examination" },
    "assignment-2": { id: "assignment-2", name: "Case Study Analysis" },
    "quiz-3": { id: "quiz-3", name: "Chapter 7-8 Quiz" },
  }
  return assessments[assessmentId as keyof typeof assessments]
}

function getAssessmentName(assessmentId: string): string {
  const assessment = getAssessmentById(assessmentId)
  return assessment?.name || "Assignment"
}

function getAssessmentType(assessmentId: string): string {
  if (assessmentId.includes("midterm")) return "midterm"
  if (assessmentId.includes("assignment")) return "case-study"
  if (assessmentId.includes("quiz")) return "quiz"
  return "general"
}

function getInitialRubric(assessmentId: string): RubricCriteria[] {
  const type = getAssessmentType(assessmentId)

  if (type === "midterm") {
    return [
      {
        id: "1",
        name: "Conceptual Understanding",
        description: "Demonstrates mastery of key business concepts and theories",
        points: 40,
        levels: [
          { name: "Excellent", description: "Complete mastery with clear explanations", points: 40 },
          { name: "Good", description: "Good understanding with minor gaps", points: 32 },
          { name: "Satisfactory", description: "Basic understanding with some confusion", points: 24 },
          { name: "Needs Improvement", description: "Limited understanding with major gaps", points: 16 },
        ],
      },
      {
        id: "2",
        name: "Problem-Solving Application",
        description: "Applies theories to practical business scenarios",
        points: 35,
        levels: [
          { name: "Excellent", description: "Excellent application with innovative solutions", points: 35 },
          { name: "Good", description: "Good application with solid reasoning", points: 28 },
          { name: "Satisfactory", description: "Basic application with some gaps", points: 21 },
          { name: "Needs Improvement", description: "Poor application with major errors", points: 14 },
        ],
      },
      {
        id: "3",
        name: "Communication Clarity",
        description: "Clear, well-organized responses and explanations",
        points: 25,
        levels: [
          { name: "Excellent", description: "Exceptionally clear and well-structured", points: 25 },
          { name: "Good", description: "Clear with good organization", points: 20 },
          { name: "Satisfactory", description: "Adequate clarity with minor issues", points: 15 },
          { name: "Needs Improvement", description: "Unclear or poorly organized", points: 10 },
        ],
      },
    ]
  } else if (type === "case-study") {
    return [
      {
        id: "1",
        name: "Problem Identification",
        description: "Clearly identifies and articulates key business issues",
        points: 30,
        levels: [
          { name: "Excellent", description: "Identifies all key issues with clear prioritization", points: 30 },
          { name: "Good", description: "Identifies most key issues with good analysis", points: 24 },
          { name: "Satisfactory", description: "Identifies basic issues but lacks depth", points: 18 },
          { name: "Needs Improvement", description: "Misses key issues or shows poor understanding", points: 12 },
        ],
      },
      {
        id: "2",
        name: "Data Analysis",
        description: "Effective use of case data and supporting evidence",
        points: 35,
        levels: [
          { name: "Excellent", description: "Comprehensive analysis with strong evidence", points: 35 },
          { name: "Good", description: "Good analysis with adequate evidence", points: 28 },
          { name: "Satisfactory", description: "Basic analysis with limited evidence", points: 21 },
          { name: "Needs Improvement", description: "Poor analysis with insufficient evidence", points: 14 },
        ],
      },
      {
        id: "3",
        name: "Solution Development",
        description: "Comprehensive and feasible business recommendations",
        points: 35,
        levels: [
          { name: "Excellent", description: "Innovative and highly feasible solutions", points: 35 },
          { name: "Good", description: "Solid and feasible recommendations", points: 28 },
          { name: "Satisfactory", description: "Basic recommendations with some merit", points: 21 },
          { name: "Needs Improvement", description: "Weak or unfeasible recommendations", points: 14 },
        ],
      },
    ]
  } else if (type === "quiz") {
    return [
      {
        id: "1",
        name: "Content Mastery",
        description: "Accurate recall and understanding of chapter concepts",
        points: 60,
        levels: [
          { name: "Excellent", description: "Perfect or near-perfect accuracy (90-100%)", points: 60 },
          { name: "Good", description: "Good accuracy with minor errors (80-89%)", points: 48 },
          { name: "Satisfactory", description: "Adequate accuracy with some errors (70-79%)", points: 36 },
          { name: "Needs Improvement", description: "Poor accuracy with major errors (below 70%)", points: 24 },
        ],
      },
      {
        id: "2",
        name: "Application Skills",
        description: "Ability to apply concepts to new scenarios",
        points: 40,
        levels: [
          { name: "Excellent", description: "Excellent application with clear reasoning", points: 40 },
          { name: "Good", description: "Good application with solid understanding", points: 32 },
          { name: "Satisfactory", description: "Basic application with some confusion", points: 24 },
          { name: "Needs Improvement", description: "Poor application with major gaps", points: 16 },
        ],
      },
    ]
  }

  return []
}
