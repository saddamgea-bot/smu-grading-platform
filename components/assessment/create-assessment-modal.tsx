"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Upload, FileText, Bot, ChevronLeft, ChevronRight, CheckCircle, AlertCircle, Clock } from "lucide-react"

interface CreateAssessmentModalProps {
  isOpen: boolean
  onClose: () => void
  courseId: string
}

interface RubricItem {
  id: string
  questionNo: string
  criteria: string
  maxScore: number
  description: string
}

interface UploadedFile {
  id: string
  name: string
  size: string
  status: "uploading" | "processing" | "completed" | "error"
  progress?: number
}

export default function CreateAssessmentModal({ isOpen, onClose, courseId }: CreateAssessmentModalProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [assessmentName, setAssessmentName] = useState("")
  const [assessmentDescription, setAssessmentDescription] = useState("")
  const [rubricFile, setRubricFile] = useState<File | null>(null)
  const [rubricItems, setRubricItems] = useState<RubricItem[]>(mockRubricItems)
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  const [aiAssistQuestion, setAiAssistQuestion] = useState("")
  const [selectedRubricId, setSelectedRubricId] = useState<string | null>(null)

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleRubricUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setRubricFile(file)
      // Simulate processing the rubric into interactive table
      setTimeout(() => {
        setCurrentStep(2)
      }, 1000)
    }
  }

  const handleStudentFilesUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files) {
      const newFiles: UploadedFile[] = Array.from(files).map((file, index) => ({
        id: `file-${Date.now()}-${index}`,
        name: file.name,
        size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
        status: "uploading",
        progress: 0,
      }))

      setUploadedFiles((prev) => [...prev, ...newFiles])

      // Simulate upload and processing
      newFiles.forEach((file, index) => {
        simulateFileProcessing(file.id, index * 500)
      })
    }
  }

  const simulateFileProcessing = (fileId: string, delay: number) => {
    setTimeout(() => {
      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadedFiles((prev) =>
          prev.map((file) => {
            if (file.id === fileId) {
              const newProgress = (file.progress || 0) + 10
              if (newProgress >= 100) {
                clearInterval(progressInterval)
                return { ...file, status: "processing", progress: 100 }
              }
              return { ...file, progress: newProgress }
            }
            return file
          }),
        )
      }, 100)

      // After upload, simulate AI processing
      setTimeout(() => {
        setUploadedFiles((prev) => prev.map((file) => (file.id === fileId ? { ...file, status: "completed" } : file)))
      }, 2000)
    }, delay)
  }

  const handleAiAssist = (rubricId: string) => {
    setSelectedRubricId(rubricId)
    // Simulate AI assistance
    setTimeout(() => {
      setRubricItems((prev) =>
        prev.map((item) =>
          item.id === rubricId
            ? { ...item, description: item.description + " (AI-enhanced with detailed scoring criteria)" }
            : item,
        ),
      )
      setSelectedRubricId(null)
      setAiAssistQuestion("")
    }, 2000)
  }

  const handleFinish = () => {
    // Handle assessment creation
    onClose()
    setCurrentStep(1)
    setAssessmentName("")
    setAssessmentDescription("")
    setRubricFile(null)
    setUploadedFiles([])
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <span>Create New Assessment Session</span>
            <Badge variant="outline" className="academic-badge">
              Step {currentStep} of 3
            </Badge>
          </DialogTitle>
          <DialogDescription>Set up a new assessment with AI-assisted grading capabilities</DialogDescription>
        </DialogHeader>

        <div className="flex items-center space-x-4 py-4">
          <div className="flex items-center space-x-2">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                currentStep >= 1 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
              }`}
            >
              1
            </div>
            <span className="text-sm font-medium">Setup</span>
          </div>
          <div className="flex-1 h-px bg-border" />
          <div className="flex items-center space-x-2">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                currentStep >= 2 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
              }`}
            >
              2
            </div>
            <span className="text-sm font-medium">Rubric Builder</span>
          </div>
          <div className="flex-1 h-px bg-border" />
          <div className="flex items-center space-x-2">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                currentStep >= 3 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
              }`}
            >
              3
            </div>
            <span className="text-sm font-medium">Upload Submissions</span>
          </div>
        </div>

        {currentStep === 1 && (
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="assessment-name">Assessment Name</Label>
                <Input
                  id="assessment-name"
                  placeholder="e.g., Mid-term Examination, Case Study Analysis"
                  value={assessmentName}
                  onChange={(e) => setAssessmentName(e.target.value)}
                  className="academic-input"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="assessment-description">Description (Optional)</Label>
                <Textarea
                  id="assessment-description"
                  placeholder="Brief description of the assessment..."
                  value={assessmentDescription}
                  onChange={(e) => setAssessmentDescription(e.target.value)}
                  className="academic-input"
                />
              </div>
            </div>

            <div className="space-y-4">
              <Label>Assessment-Specific Answer Key and Rubric</Label>
              <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
                <div className="mt-4">
                  <label htmlFor="rubric-upload" className="cursor-pointer">
                    <span className="text-sm font-medium text-primary hover:text-primary/80">
                      Click to upload rubric
                    </span>
                    <span className="text-sm text-muted-foreground"> or drag and drop</span>
                  </label>
                  <Input
                    id="rubric-upload"
                    type="file"
                    accept=".pdf,.doc,.docx"
                    className="hidden"
                    onChange={handleRubricUpload}
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-2">PDF, DOC, DOCX up to 10MB</p>
                {rubricFile && (
                  <div className="mt-4 p-3 bg-muted rounded-lg">
                    <div className="flex items-center space-x-2">
                      <FileText className="h-4 w-4" />
                      <span className="text-sm font-medium">{rubricFile.name}</span>
                      <Badge variant="secondary" className="academic-badge">
                        Processing...
                      </Badge>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-6">
            <div className="space-y-2">
              <h3 className="text-lg font-medium">AI-Assisted Rubric Builder</h3>
              <p className="text-sm text-muted-foreground">
                Review and refine your digitized rubric. Use AI assistance to enhance scoring criteria.
              </p>
            </div>

            <div className="border rounded-lg">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Question No.</TableHead>
                    <TableHead>Criteria</TableHead>
                    <TableHead>Max Score</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>AI Assist</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rubricItems.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.questionNo}</TableCell>
                      <TableCell>{item.criteria}</TableCell>
                      <TableCell>{item.maxScore}</TableCell>
                      <TableCell className="max-w-xs">
                        <div className="text-sm">{item.description}</div>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleAiAssist(item.id)}
                          disabled={selectedRubricId === item.id}
                          className="academic-button"
                        >
                          {selectedRubricId === item.id ? (
                            <>
                              <Bot className="mr-2 h-4 w-4 animate-spin" />
                              Processing...
                            </>
                          ) : (
                            <>
                              <Bot className="mr-2 h-4 w-4" />
                              AI Assist
                            </>
                          )}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {selectedRubricId && (
              <div className="p-4 border rounded-lg bg-muted/50">
                <Label htmlFor="ai-question">Ask AI to help refine this rubric item:</Label>
                <div className="flex space-x-2 mt-2">
                  <Input
                    id="ai-question"
                    placeholder="e.g., Help me define scoring for question 2 based on the answer key"
                    value={aiAssistQuestion}
                    onChange={(e) => setAiAssistQuestion(e.target.value)}
                    className="academic-input"
                  />
                  <Button variant="outline" size="sm">
                    <Bot className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}

        {currentStep === 3 && (
          <div className="space-y-6">
            <div className="space-y-2">
              <h3 className="text-lg font-medium">Upload Student Submissions</h3>
              <p className="text-sm text-muted-foreground">
                Batch upload all student answer sheets for AI processing and grading.
              </p>
            </div>

            <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
              <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
              <div className="mt-4">
                <label htmlFor="student-files-upload" className="cursor-pointer">
                  <span className="text-sm font-medium text-primary hover:text-primary/80">
                    Click to upload student submissions
                  </span>
                  <span className="text-sm text-muted-foreground"> or drag and drop</span>
                </label>
                <Input
                  id="student-files-upload"
                  type="file"
                  multiple
                  accept=".pdf,.jpg,.png"
                  className="hidden"
                  onChange={handleStudentFilesUpload}
                />
              </div>
              <p className="text-xs text-muted-foreground mt-2">PDF, JPG, PNG files - batch upload supported</p>
            </div>

            {uploadedFiles.length > 0 && (
              <div className="space-y-4">
                <h4 className="font-medium">Processing Status</h4>
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {uploadedFiles.map((file) => (
                    <div key={file.id} className="flex items-center space-x-3 p-3 border rounded-lg">
                      <FileText className="h-4 w-4 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium truncate">{file.name}</span>
                          <span className="text-xs text-muted-foreground">{file.size}</span>
                        </div>
                        {file.status === "uploading" && file.progress !== undefined && (
                          <Progress value={file.progress} className="mt-1" />
                        )}
                      </div>
                      <div className="flex-shrink-0">
                        {file.status === "uploading" && <Clock className="h-4 w-4 text-blue-600" />}
                        {file.status === "processing" && <AlertCircle className="h-4 w-4 text-yellow-600" />}
                        {file.status === "completed" && <CheckCircle className="h-4 w-4 text-green-600" />}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        <DialogFooter className="flex items-center justify-between">
          <div className="flex space-x-2">
            {currentStep > 1 && (
              <Button variant="outline" onClick={handlePrevious} className="academic-button bg-transparent">
                <ChevronLeft className="mr-2 h-4 w-4" />
                Previous
              </Button>
            )}
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" onClick={onClose} className="academic-button bg-transparent">
              Cancel
            </Button>
            {currentStep < 3 ? (
              <Button
                onClick={handleNext}
                disabled={currentStep === 1 && !rubricFile}
                className="academic-button bg-primary text-primary-foreground"
              >
                Next
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button onClick={handleFinish} className="academic-button bg-primary text-primary-foreground">
                Create Assessment
              </Button>
            )}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

// Mock data
const mockRubricItems: RubricItem[] = [
  {
    id: "1",
    questionNo: "Q1",
    criteria: "Problem Analysis",
    maxScore: 20,
    description: "Student demonstrates understanding of the business problem and identifies key issues.",
  },
  {
    id: "2",
    questionNo: "Q2",
    criteria: "Solution Development",
    maxScore: 25,
    description: "Student provides a comprehensive solution with clear reasoning and justification.",
  },
  {
    id: "3",
    questionNo: "Q3",
    criteria: "Financial Calculations",
    maxScore: 30,
    description: "Accurate calculations with proper formulas and methodology shown.",
  },
  {
    id: "4",
    questionNo: "Q4",
    criteria: "Communication",
    maxScore: 25,
    description: "Clear, professional writing with proper structure and grammar.",
  },
]
