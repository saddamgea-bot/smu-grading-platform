"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Bot, Plus, Trash2, Lightbulb, Upload, FileText, Send, MessageSquare } from "lucide-react"

interface Question {
  id: string
  text: string
  points: number
  type: "essay" | "short-answer" | "multiple-choice"
}

interface Criterion {
  id: string
  name: string
  weight: number
}

interface ChatMessage {
  id: string
  type: "user" | "assistant"
  content: string
  timestamp: Date
}

interface KnowledgeFile {
  id: string
  name: string
  type: "course-material" | "uploaded"
  selected: boolean
}

export default function CreateAssessment() {
  const [assessmentData, setAssessmentData] = useState({
    title: "",
    course: "",
    type: "",
    dueDate: "",
    dueTime: "",
    description: "",
    totalPoints: 100,
    aiGradingEnabled: true,
    aiRubricGeneration: true,
    aiQuestionGeneration: false,
  })

  const [questions, setQuestions] = useState<Question[]>([])
  const [rubricCriteria, setRubricCriteria] = useState<Criterion[]>([
    { id: "1", name: "Content Knowledge", weight: 40 },
    { id: "2", name: "Critical Thinking", weight: 30 },
    { id: "3", name: "Communication", weight: 30 },
  ])

  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([])
  const [currentMessage, setCurrentMessage] = useState("")
  const [knowledgeFiles, setKnowledgeFiles] = useState<KnowledgeFile[]>([
    { id: "1", name: "Business Fundamentals Textbook Ch. 1-5", type: "course-material", selected: true },
    { id: "2", name: "Lecture Notes - Week 1-4", type: "course-material", selected: true },
    { id: "3", name: "Case Study Examples", type: "course-material", selected: false },
    { id: "4", name: "Previous Exam Solutions", type: "course-material", selected: false },
  ])

  const courses = [
    { id: "cor101", name: "COR101 - Business Fundamentals" },
    { id: "acc101", name: "ACC101 - Financial Accounting" },
    { id: "mgmt201", name: "MGMT201 - Organizational Behavior" },
    { id: "fin301", name: "FIN301 - Corporate Finance" },
  ]

  const assessmentTypes = [
    { value: "final-exam", label: "Final Exam" },
    { value: "midterm", label: "Mid-term Exam" },
    { value: "quiz", label: "Big Quiz" },
    { value: "assignment", label: "Assignment" },
    { value: "project", label: "Project" },
  ]

  const addQuestion = () => {
    const newQuestion: Question = {
      id: Date.now().toString(),
      text: "",
      points: 10,
      type: "essay",
    }
    setQuestions([...questions, newQuestion])
  }

  const removeQuestion = (id: string) => {
    setQuestions(questions.filter((q) => q.id !== id))
  }

  const updateQuestion = (id: string, field: keyof Question, value: any) => {
    setQuestions(questions.map((q) => (q.id === id ? { ...q, [field]: value } : q)))
  }

  const generateAIQuestions = () => {
    // Simulate AI question generation
    const aiQuestions: Question[] = [
      {
        id: Date.now().toString(),
        text: "Analyze the key principles of business fundamentals and their application in modern organizations.",
        points: 25,
        type: "essay",
      },
      {
        id: (Date.now() + 1).toString(),
        text: "Compare and contrast different organizational structures and their impact on business performance.",
        points: 20,
        type: "essay",
      },
    ]
    setQuestions([...questions, ...aiQuestions])
  }

  const generateAIRubric = () => {
    // Simulate AI rubric generation
    setRubricCriteria([
      { id: "1", name: "Content Accuracy", weight: 35 },
      { id: "2", name: "Analysis Depth", weight: 25 },
      { id: "3", name: "Evidence Usage", weight: 20 },
      { id: "4", name: "Writing Quality", weight: 20 },
    ])
  }

  const addRubricCriterion = () => {
    const newCriterion = {
      id: Date.now().toString(),
      name: "New Criterion",
      weight: 0,
    }
    setRubricCriteria([...rubricCriteria, newCriterion])
  }

  const removeRubricCriterion = (id: string) => {
    setRubricCriteria(rubricCriteria.filter((c) => c.id !== id))
  }

  const updateRubricCriterion = (id: string, field: "name" | "weight", value: string | number) => {
    setRubricCriteria(rubricCriteria.map((c) => (c.id === id ? { ...c, [field]: value } : c)))
  }

  const getTotalWeight = () => {
    return rubricCriteria.reduce((total, criteria) => total + criteria.weight, 0)
  }

  const toggleKnowledgeFile = (id: string) => {
    setKnowledgeFiles((files) => files.map((file) => (file.id === id ? { ...file, selected: !file.selected } : file)))
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files) {
      const newFiles = Array.from(files).map((file) => ({
        id: Date.now().toString() + Math.random(),
        name: file.name,
        type: "uploaded" as const,
        selected: true,
      }))
      setKnowledgeFiles((prev) => [...prev, ...newFiles])
    }
  }

  const sendMessage = () => {
    if (!currentMessage.trim()) return

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: "user",
      content: currentMessage,
      timestamp: new Date(),
    }

    // Simulate AI response
    const aiResponse: ChatMessage = {
      id: (Date.now() + 1).toString(),
      type: "assistant",
      content: `Based on the selected knowledge base materials, here's my suggestion for your grading criteria:\n\nFor the question "${currentMessage}", I recommend:\n\n• Full points (100%): Student demonstrates complete understanding with specific examples from course materials\n• Partial credit (50%): Student shows basic understanding but lacks depth or examples\n• Minimal credit (25%): Student attempts answer but shows limited comprehension\n• No credit (0%): No attempt or completely incorrect response\n\nWould you like me to elaborate on any specific aspect of this grading guideline?`,
      timestamp: new Date(),
    }

    setChatMessages((prev) => [...prev, userMessage, aiResponse])
    setCurrentMessage("")
  }

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight text-balance">Create New Assessment</h1>
        <p className="text-muted-foreground text-lg">
          Set up a new assessment with AI-powered grading and rubric generation.
        </p>
      </div>

      <div className="space-y-6">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Assessment Title</Label>
                <Input
                  id="title"
                  placeholder="e.g., Mid-term Examination"
                  value={assessmentData.title}
                  onChange={(e) => setAssessmentData({ ...assessmentData, title: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="course">Course</Label>
                <Select
                  value={assessmentData.course}
                  onValueChange={(value) => setAssessmentData({ ...assessmentData, course: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a course" />
                  </SelectTrigger>
                  <SelectContent>
                    {courses.map((course) => (
                      <SelectItem key={course.id} value={course.id}>
                        {course.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="type">Assessment Type</Label>
                <Select
                  value={assessmentData.type}
                  onValueChange={(value) => setAssessmentData({ ...assessmentData, type: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    {assessmentTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="dueDate">Due Date</Label>
                <Input
                  id="dueDate"
                  type="date"
                  value={assessmentData.dueDate}
                  onChange={(e) => setAssessmentData({ ...assessmentData, dueDate: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dueTime">Due Time</Label>
                <Input
                  id="dueTime"
                  type="time"
                  value={assessmentData.dueTime}
                  onChange={(e) => setAssessmentData({ ...assessmentData, dueTime: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Provide instructions and context for this assessment..."
                value={assessmentData.description}
                onChange={(e) => setAssessmentData({ ...assessmentData, description: e.target.value })}
              />
            </div>
          </CardContent>
        </Card>

        {/* AI Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bot className="h-5 w-5" />
              AI Assistance Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>AI-Powered Grading</Label>
                <p className="text-sm text-muted-foreground">Enable automatic grading with AI assistance</p>
              </div>
              <Switch
                checked={assessmentData.aiGradingEnabled}
                onCheckedChange={(checked) => setAssessmentData({ ...assessmentData, aiGradingEnabled: checked })}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>AI Rubric Generation</Label>
                <p className="text-sm text-muted-foreground">
                  Generate rubric criteria automatically based on assessment content
                </p>
              </div>
              <Switch
                checked={assessmentData.aiRubricGeneration}
                onCheckedChange={(checked) => setAssessmentData({ ...assessmentData, aiRubricGeneration: checked })}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>AI Question Generation</Label>
                <p className="text-sm text-muted-foreground">
                  Generate questions based on course materials and learning objectives
                </p>
              </div>
              <Switch
                checked={assessmentData.aiQuestionGeneration}
                onCheckedChange={(checked) => setAssessmentData({ ...assessmentData, aiQuestionGeneration: checked })}
              />
            </div>
          </CardContent>
        </Card>

        {/* Questions */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Questions</CardTitle>
              <div className="flex gap-2">
                {assessmentData.aiQuestionGeneration && (
                  <Button variant="outline" onClick={generateAIQuestions}>
                    <Lightbulb className="mr-2 h-4 w-4" />
                    Generate AI Questions
                  </Button>
                )}
                <Button onClick={addQuestion}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Question
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {questions.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">
                No questions added yet. Click "Add Question" to get started.
              </p>
            ) : (
              questions.map((question, index) => (
                <div key={question.id} className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <Badge variant="outline">Question {index + 1}</Badge>
                    <Button variant="ghost" size="sm" onClick={() => removeQuestion(question.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="md:col-span-2 space-y-2">
                      <Label>Question Text</Label>
                      <Textarea
                        placeholder="Enter your question..."
                        value={question.text}
                        onChange={(e) => updateQuestion(question.id, "text", e.target.value)}
                      />
                    </div>
                    <div className="space-y-3">
                      <div className="space-y-2">
                        <Label>Points</Label>
                        <Input
                          type="number"
                          value={question.points}
                          onChange={(e) => updateQuestion(question.id, "points", Number.parseInt(e.target.value))}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Type</Label>
                        <Select
                          value={question.type}
                          onValueChange={(value) => updateQuestion(question.id, "type", value)}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="essay">Essay</SelectItem>
                            <SelectItem value="short-answer">Short Answer</SelectItem>
                            <SelectItem value="multiple-choice">Multiple Choice</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        {/* Rubric */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Grading Rubric</CardTitle>
              <div className="flex gap-2">
                {assessmentData.aiRubricGeneration && (
                  <Button variant="outline" onClick={generateAIRubric}>
                    <Bot className="mr-2 h-4 w-4" />
                    Generate AI Rubric
                  </Button>
                )}
                <Button variant="outline" onClick={addRubricCriterion}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Criterion
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {rubricCriteria.map((criteria) => (
                <div key={criteria.id} className="flex items-center gap-3 p-3 border rounded-lg">
                  <div className="flex-1">
                    <Input
                      value={criteria.name}
                      onChange={(e) => updateRubricCriterion(criteria.id, "name", e.target.value)}
                      placeholder="Criterion name"
                      className="font-medium"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      min="0"
                      max="100"
                      value={criteria.weight}
                      onChange={(e) =>
                        updateRubricCriterion(criteria.id, "weight", Number.parseInt(e.target.value) || 0)
                      }
                      className="w-20 text-center"
                    />
                    <span className="text-sm text-muted-foreground">%</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeRubricCriterion(criteria.id)}
                    disabled={rubricCriteria.length <= 1}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <div className="flex justify-between items-center pt-2 border-t">
                <span className="text-sm text-muted-foreground">Total Weight:</span>
                <Badge variant={getTotalWeight() === 100 ? "default" : "destructive"} className="text-sm">
                  {getTotalWeight()}%
                </Badge>
              </div>
              {getTotalWeight() !== 100 && (
                <p className="text-sm text-destructive">
                  ⚠️ Total weight must equal 100%. Current total: {getTotalWeight()}%
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* AI Grading Assistant */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                AI Grading Assistant
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Use AI to create detailed grading guidelines and rubric criteria based on your course materials.
              </p>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Knowledge Base Selection */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-base font-medium">Knowledge Base</Label>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => document.getElementById("file-upload")?.click()}>
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Files
                  </Button>
                  <input
                    id="file-upload"
                    type="file"
                    multiple
                    accept=".pdf,.doc,.docx,.txt,.md"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {knowledgeFiles.map((file) => (
                  <div key={file.id} className="flex items-center space-x-2 p-3 border rounded-lg">
                    <Checkbox
                      id={file.id}
                      checked={file.selected}
                      onCheckedChange={() => toggleKnowledgeFile(file.id)}
                    />
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <label
                      htmlFor={file.id}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex-1 cursor-pointer"
                    >
                      {file.name}
                    </label>
                    <Badge variant={file.type === "uploaded" ? "secondary" : "outline"} className="text-xs">
                      {file.type === "uploaded" ? "Uploaded" : "Course"}
                    </Badge>
                  </div>
                ))}
              </div>

              <p className="text-xs text-muted-foreground">
                Selected files will be used as context for AI grading suggestions.
                {knowledgeFiles.filter((f) => f.selected).length} of {knowledgeFiles.length} files selected.
              </p>
            </div>

            {/* Chat Interface */}
            <div className="space-y-4">
              <Label className="text-base font-medium">AI Grading Consultation</Label>

              <div className="border rounded-lg">
                <ScrollArea className="h-64 p-4">
                  {chatMessages.length === 0 ? (
                    <div className="text-center text-muted-foreground py-8">
                      <Bot className="h-8 w-8 mx-auto mb-2 opacity-50" />
                      <p className="text-sm">Ask me about grading criteria, point allocation, or rubric suggestions.</p>
                      <p className="text-xs mt-1">Example: "If students mention X concept, give half points"</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {chatMessages.map((message) => (
                        <div
                          key={message.id}
                          className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
                        >
                          <div
                            className={`max-w-[80%] p-3 rounded-lg ${
                              message.type === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                            }`}
                          >
                            <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                            <p className="text-xs opacity-70 mt-1">{message.timestamp.toLocaleTimeString()}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </ScrollArea>

                <div className="border-t p-3">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Ask about grading criteria, point allocation, or rubric suggestions..."
                      value={currentMessage}
                      onChange={(e) => setCurrentMessage(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                      className="flex-1"
                    />
                    <Button onClick={sendMessage} disabled={!currentMessage.trim()}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 dark:bg-blue-950/20 p-3 rounded-lg">
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  <strong>Pro tip:</strong> Try prompts like "What rubric criteria should I use for this essay
                  question?" or "If students partially understand concept X, how many points should they get?"
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex justify-end gap-3">
          <Button variant="outline">Save as Draft</Button>
          <Button>Create Assessment</Button>
        </div>
      </div>
    </div>
  )
}
