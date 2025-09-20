"use client"

import type React from "react"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Upload,
  FileText,
  ImageIcon,
  Video,
  File,
  Trash2,
  Download,
  Eye,
  Search,
  Plus,
  FolderOpen,
  BookOpen,
  GraduationCap,
  FileCheck,
  AlertCircle,
  CheckCircle,
} from "lucide-react"

interface KnowledgeBasePageProps {
  params: {
    courseId: string
  }
}

export default function KnowledgeBasePage({ params }: KnowledgeBasePageProps) {
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedFiles, setSelectedFiles] = useState<string[]>([])

  const course = getCourseById(params.courseId)

  if (!course) {
    return <div>Course not found</div>
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files && files.length > 0) {
      setIsUploading(true)
      // Simulate upload progress
      let progress = 0
      const interval = setInterval(() => {
        progress += 10
        setUploadProgress(progress)
        if (progress >= 100) {
          clearInterval(interval)
          setIsUploading(false)
          setUploadProgress(0)
        }
      }, 200)
    }
  }

  const filteredDocuments = knowledgeBaseDocuments.filter(
    (doc) =>
      doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.type.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-foreground">
            Dashboard
          </Link>
          <span>/</span>
          <Link href="/courses" className="hover:text-foreground">
            Courses
          </Link>
          <span>/</span>
          <Link href={`/courses/${params.courseId}/assessments`} className="hover:text-foreground">
            {course.code}
          </Link>
          <span>/</span>
          <span className="text-foreground">Knowledge Base</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tight text-balance">Knowledge Base: {course.code}</h1>
            <p className="text-muted-foreground text-lg">
              Manage course materials, textbooks, and reference documents for AI-assisted grading
            </p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="academic-button bg-primary text-primary-foreground">
                <Plus className="mr-2 h-4 w-4" />
                Upload Documents
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Upload Course Materials</DialogTitle>
                <DialogDescription>
                  Add textbooks, syllabi, past exams, and other reference materials to enhance AI grading accuracy.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                  <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
                  <div className="mt-4">
                    <label htmlFor="file-upload" className="cursor-pointer">
                      <span className="text-sm font-medium text-primary hover:text-primary/80">
                        Click to upload files
                      </span>
                      <span className="text-sm text-muted-foreground"> or drag and drop</span>
                    </label>
                    <Input
                      id="file-upload"
                      type="file"
                      multiple
                      accept=".pdf,.doc,.docx,.txt,.jpg,.png"
                      className="hidden"
                      onChange={handleFileUpload}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">PDF, DOC, DOCX, TXT, JPG, PNG up to 10MB each</p>
                </div>
                {isUploading && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Uploading files...</span>
                      <span>{uploadProgress}%</span>
                    </div>
                    <Progress value={uploadProgress} />
                  </div>
                )}
              </div>
              <DialogFooter>
                <Button variant="outline">Cancel</Button>
                <Button>Upload</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="academic-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Documents</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">+3 added this week</p>
          </CardContent>
        </Card>
        <Card className="academic-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Storage Used</CardTitle>
            <FolderOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.4 GB</div>
            <p className="text-xs text-muted-foreground">of 10 GB available</p>
          </CardContent>
        </Card>
        <Card className="academic-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">AI Processed</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">22</div>
            <p className="text-xs text-muted-foreground">2 pending processing</p>
          </CardContent>
        </Card>
        <Card className="academic-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Last Updated</CardTitle>
            <FileCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2d</div>
            <p className="text-xs text-muted-foreground">Syllabus updated</p>
          </CardContent>
        </Card>
      </section>

      <section>
        <Tabs defaultValue="all" className="space-y-6">
          <div className="flex items-center justify-between">
            <TabsList className="grid w-full max-w-md grid-cols-4">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="textbooks">Textbooks</TabsTrigger>
              <TabsTrigger value="syllabus">Syllabus</TabsTrigger>
              <TabsTrigger value="exams">Past Exams</TabsTrigger>
            </TabsList>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search documents..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8 w-64"
                />
              </div>
            </div>
          </div>

          <TabsContent value="all" className="space-y-6">
            <Card className="academic-card">
              <CardHeader>
                <CardTitle className="text-lg">Course Documents</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="min-w-[200px]">Name</TableHead>
                        <TableHead className="min-w-[80px]">Type</TableHead>
                        <TableHead className="min-w-[80px]">Size</TableHead>
                        <TableHead className="min-w-[100px]">Status</TableHead>
                        <TableHead className="min-w-[100px]">Uploaded</TableHead>
                        <TableHead className="min-w-[120px]">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredDocuments.map((doc) => (
                        <TableRow key={doc.id}>
                          <TableCell className="font-medium">
                            <div className="flex items-center space-x-2">
                              {getFileIcon(doc.type)}
                              <span className="truncate max-w-[180px]" title={doc.name}>
                                {doc.name}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className="academic-badge">
                              {doc.type}
                            </Badge>
                          </TableCell>
                          <TableCell>{doc.size}</TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                doc.status === "processed"
                                  ? "default"
                                  : doc.status === "processing"
                                    ? "secondary"
                                    : "outline"
                              }
                              className="academic-badge"
                            >
                              {doc.status === "processed" && <CheckCircle className="w-3 h-3 mr-1" />}
                              {doc.status === "processing" && <AlertCircle className="w-3 h-3 mr-1" />}
                              {doc.status}
                            </Badge>
                          </TableCell>
                          <TableCell>{doc.uploadDate}</TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <Button variant="ghost" size="sm">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Download className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="textbooks">
            <div className="text-center py-12">
              <BookOpen className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-medium">Textbooks & References</h3>
              <p className="mt-2 text-muted-foreground">
                Official course textbooks and reference materials will appear here.
              </p>
            </div>
          </TabsContent>

          <TabsContent value="syllabus">
            <div className="text-center py-12">
              <GraduationCap className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-medium">Course Syllabus</h3>
              <p className="mt-2 text-muted-foreground">Course syllabus and curriculum documents will appear here.</p>
            </div>
          </TabsContent>

          <TabsContent value="exams">
            <div className="text-center py-12">
              <FileCheck className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-medium">Past Examinations</h3>
              <p className="mt-2 text-muted-foreground">Previous exam papers and answer keys will appear here.</p>
            </div>
          </TabsContent>
        </Tabs>
      </section>
    </div>
  )
}

// Helper function to get file type icon
function getFileIcon(type: string) {
  switch (type.toLowerCase()) {
    case "pdf":
      return <FileText className="h-4 w-4 text-red-600" />
    case "doc":
    case "docx":
      return <FileText className="h-4 w-4 text-blue-600" />
    case "jpg":
    case "png":
      return <ImageIcon className="h-4 w-4 text-green-600" />
    case "mp4":
    case "avi":
      return <Video className="h-4 w-4 text-purple-600" />
    default:
      return <File className="h-4 w-4 text-gray-600" />
  }
}

// Mock data functions
function getCourseById(courseId: string) {
  const courses = {
    cor101: {
      id: "cor101",
      code: "COR101",
      name: "Business Fundamentals",
      semester: "AY2024/25 S1",
    },
    acc101: {
      id: "acc101",
      code: "ACC101",
      name: "Financial Accounting",
      semester: "AY2024/25 S1",
    },
  }

  return courses[courseId as keyof typeof courses]
}

const knowledgeBaseDocuments = [
  {
    id: "1",
    name: "Business Fundamentals Textbook.pdf",
    type: "PDF",
    size: "45.2 MB",
    status: "processed",
    uploadDate: "Oct 1, 2024",
  },
  {
    id: "2",
    name: "Course Syllabus AY2024-25.docx",
    type: "DOC",
    size: "2.1 MB",
    status: "processed",
    uploadDate: "Sep 28, 2024",
  },
  {
    id: "3",
    name: "Mid-term Exam 2023.pdf",
    type: "PDF",
    size: "8.7 MB",
    status: "processing",
    uploadDate: "Oct 10, 2024",
  },
  {
    id: "4",
    name: "Answer Key Mid-term 2023.pdf",
    type: "PDF",
    size: "3.2 MB",
    status: "processed",
    uploadDate: "Oct 10, 2024",
  },
  {
    id: "5",
    name: "Lecture Slides Week 1-6.pdf",
    type: "PDF",
    size: "12.8 MB",
    status: "processed",
    uploadDate: "Oct 5, 2024",
  },
]
