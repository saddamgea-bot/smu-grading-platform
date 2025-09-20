"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Search,
  FileText,
  Download,
  Eye,
  Edit,
  Trash2,
  Filter,
  Plus,
  Users,
  BookOpen,
  Calendar,
  Upload,
} from "lucide-react"

interface KnowledgeBaseItem {
  id: string
  fileName: string
  fileType: string
  course: string
  courseCode: string
  uploadedBy: string
  uploadDate: string
  fileSize: string
  accessLevel: "Public" | "Course Only" | "Instructors Only"
  downloads: number
  tags: string[]
}

export default function KnowledgeBasePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCourse, setSelectedCourse] = useState("all")
  const [selectedAccess, setSelectedAccess] = useState("all")
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false)
  const [uploadForm, setUploadForm] = useState({
    file: null as File | null,
    title: "",
    course: "",
    assessment: "",
    documentType: "",
    accessLevel: "Course Only",
    description: "",
  })

  const filteredItems = knowledgeBaseItems.filter((item) => {
    const matchesSearch =
      item.fileName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.course.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.uploadedBy.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCourse = selectedCourse === "all" || item.courseCode === selectedCourse
    const matchesAccess = selectedAccess === "all" || item.accessLevel === selectedAccess

    return matchesSearch && matchesCourse && matchesAccess
  })

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setUploadForm((prev) => ({ ...prev, file, title: file.name.replace(/\.[^/.]+$/, "") }))
    }
  }

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Upload form data:", uploadForm)
    setIsUploadModalOpen(false)
    setUploadForm({
      file: null,
      title: "",
      course: "",
      assessment: "",
      documentType: "",
      accessLevel: "Course Only",
      description: "",
    })
  }

  return (
    <div className="space-y-6">
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tight text-balance">Knowledge Base</h1>
            <p className="text-muted-foreground text-lg">
              Centralized repository for course materials, resources, and documentation
            </p>
          </div>
          <Dialog open={isUploadModalOpen} onOpenChange={setIsUploadModalOpen}>
            <DialogTrigger asChild>
              <Button className="academic-button bg-primary text-primary-foreground">
                <Plus className="mr-2 h-4 w-4" />
                Upload Document
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Upload New Document</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleUploadSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="file">Document File (PDF)</Label>
                    <div className="flex items-center justify-center w-full">
                      <label
                        htmlFor="file"
                        className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                      >
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <Upload className="w-8 h-8 mb-4 text-gray-500" />
                          <p className="mb-2 text-sm text-gray-500">
                            <span className="font-semibold">Click to upload</span> or drag and drop
                          </p>
                          <p className="text-xs text-gray-500">PDF files only</p>
                        </div>
                        <input
                          id="file"
                          type="file"
                          accept=".pdf"
                          className="hidden"
                          onChange={handleFileChange}
                          required
                        />
                      </label>
                    </div>
                    {uploadForm.file && <p className="text-sm text-green-600">Selected: {uploadForm.file.name}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="title">Document Title</Label>
                    <Input
                      id="title"
                      value={uploadForm.title}
                      onChange={(e) => setUploadForm((prev) => ({ ...prev, title: e.target.value }))}
                      placeholder="Enter document title"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="course">Course</Label>
                    <select
                      id="course"
                      value={uploadForm.course}
                      onChange={(e) => setUploadForm((prev) => ({ ...prev, course: e.target.value }))}
                      className="w-full px-3 py-2 border border-input bg-background rounded-md text-sm"
                      required
                    >
                      <option value="">Select a course</option>
                      <option value="COR101">COR101 - Business Fundamentals</option>
                      <option value="ACC101">ACC101 - Financial Accounting</option>
                      <option value="MGMT201">MGMT201 - Organizational Behavior</option>
                      <option value="FIN301">FIN301 - Corporate Finance</option>
                      <option value="MKT201">MKT201 - Marketing Management</option>
                      <option value="OPS301">OPS301 - Operations Management</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="assessment">Related Assessment (Optional)</Label>
                    <select
                      id="assessment"
                      value={uploadForm.assessment}
                      onChange={(e) => setUploadForm((prev) => ({ ...prev, assessment: e.target.value }))}
                      className="w-full px-3 py-2 border border-input bg-background rounded-md text-sm"
                    >
                      <option value="">No specific assessment</option>
                      <option value="midterm">Midterm Exam</option>
                      <option value="final">Final Exam</option>
                      <option value="quiz1">Quiz 1</option>
                      <option value="quiz2">Quiz 2</option>
                      <option value="assignment1">Assignment 1</option>
                      <option value="assignment2">Assignment 2</option>
                      <option value="project">Final Project</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="documentType">Document Type</Label>
                    <select
                      id="documentType"
                      value={uploadForm.documentType}
                      onChange={(e) => setUploadForm((prev) => ({ ...prev, documentType: e.target.value }))}
                      className="w-full px-3 py-2 border border-input bg-background rounded-md text-sm"
                      required
                    >
                      <option value="">Select document type</option>
                      <option value="lecture-notes">Lecture Notes</option>
                      <option value="reading-material">Reading Material</option>
                      <option value="case-study">Case Study</option>
                      <option value="assignment">Assignment</option>
                      <option value="exam-sample">Sample Exam</option>
                      <option value="reference">Reference Material</option>
                      <option value="template">Template</option>
                      <option value="rubric">Rubric</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="accessLevel">Who Has Access</Label>
                    <select
                      id="accessLevel"
                      value={uploadForm.accessLevel}
                      onChange={(e) => setUploadForm((prev) => ({ ...prev, accessLevel: e.target.value }))}
                      className="w-full px-3 py-2 border border-input bg-background rounded-md text-sm"
                      required
                    >
                      <option value="Public">Public - Everyone can access</option>
                      <option value="Course Only">Course Only - Students enrolled in the course</option>
                      <option value="Instructors Only">Instructors Only - Teaching staff only</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description (Optional)</Label>
                    <Textarea
                      id="description"
                      value={uploadForm.description}
                      onChange={(e) => setUploadForm((prev) => ({ ...prev, description: e.target.value }))}
                      placeholder="Brief description of the document content"
                      rows={3}
                    />
                  </div>
                </div>
                <div className="flex justify-end space-x-2">
                  <Button type="button" variant="outline" onClick={() => setIsUploadModalOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" className="academic-button bg-primary text-primary-foreground">
                    Upload Document
                  </Button>
                </div>
              </form>
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
            <div className="text-2xl font-bold">{knowledgeBaseItems.length}</div>
            <p className="text-xs text-muted-foreground">Across all courses</p>
          </CardContent>
        </Card>
        <Card className="academic-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Courses</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">6</div>
            <p className="text-xs text-muted-foreground">With uploaded materials</p>
          </CardContent>
        </Card>
        <Card className="academic-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Contributors</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">Faculty members</p>
          </CardContent>
        </Card>
        <Card className="academic-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Recent Uploads</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">This week</p>
          </CardContent>
        </Card>
      </section>

      <section className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search documents, courses, or contributors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 w-64"
            />
          </div>
          <select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            className="px-3 py-2 border border-input bg-background rounded-md text-sm"
          >
            <option value="all">All Courses</option>
            <option value="COR101">Business Fundamentals</option>
            <option value="ACC101">Financial Accounting</option>
            <option value="MGMT201">Organizational Behavior</option>
            <option value="FIN301">Corporate Finance</option>
            <option value="MKT201">Marketing Management</option>
            <option value="OPS301">Operations Management</option>
          </select>
          <select
            value={selectedAccess}
            onChange={(e) => setSelectedAccess(e.target.value)}
            className="px-3 py-2 border border-input bg-background rounded-md text-sm"
          >
            <option value="all">All Access Levels</option>
            <option value="Public">Public</option>
            <option value="Course Only">Course Only</option>
            <option value="Instructors Only">Instructors Only</option>
          </select>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" className="academic-button bg-transparent">
            <Filter className="mr-2 h-4 w-4" />
            Advanced Filters
          </Button>
          <Button variant="outline" className="academic-button bg-transparent">
            <Download className="mr-2 h-4 w-4" />
            Export List
          </Button>
        </div>
      </section>

      <section>
        <Card className="academic-card">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Document Name</TableHead>
                    <TableHead>Course</TableHead>
                    <TableHead>Uploaded By</TableHead>
                    <TableHead>Upload Date</TableHead>
                    <TableHead>File Size</TableHead>
                    <TableHead>Access Level</TableHead>
                    <TableHead>Downloads</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredItems.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <FileText className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <div className="font-medium">{item.fileName}</div>
                            <div className="text-xs text-muted-foreground">{item.fileType}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{item.courseCode}</div>
                          <div className="text-xs text-muted-foreground">{item.course}</div>
                        </div>
                      </TableCell>
                      <TableCell>{item.uploadedBy}</TableCell>
                      <TableCell>{item.uploadDate}</TableCell>
                      <TableCell>{item.fileSize}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            item.accessLevel === "Public"
                              ? "default"
                              : item.accessLevel === "Course Only"
                                ? "secondary"
                                : "outline"
                          }
                          className="academic-badge"
                        >
                          {item.accessLevel}
                        </Badge>
                      </TableCell>
                      <TableCell>{item.downloads}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-1">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
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
      </section>
    </div>
  )
}

const knowledgeBaseItems: KnowledgeBaseItem[] = [
  {
    id: "1",
    fileName: "Business Strategy Framework.pdf",
    fileType: "PDF Document",
    course: "Business Fundamentals",
    courseCode: "COR101",
    uploadedBy: "Dr. Sarah Chen",
    uploadDate: "2024-11-15",
    fileSize: "2.4 MB",
    accessLevel: "Course Only",
    downloads: 45,
    tags: ["strategy", "framework", "business"],
  },
  {
    id: "2",
    fileName: "Financial Statements Analysis Guide.pdf",
    fileType: "PDF Document",
    course: "Financial Accounting",
    courseCode: "ACC101",
    uploadedBy: "Dr. Jennifer Lee",
    uploadDate: "2024-11-12",
    fileSize: "3.1 MB",
    accessLevel: "Public",
    downloads: 67,
    tags: ["accounting", "financial", "analysis"],
  },
  {
    id: "3",
    fileName: "Case Study - Tesla Business Model.docx",
    fileType: "Word Document",
    course: "Business Fundamentals",
    courseCode: "COR101",
    uploadedBy: "Prof. Michael Wong",
    uploadDate: "2024-11-10",
    fileSize: "1.8 MB",
    accessLevel: "Course Only",
    downloads: 38,
    tags: ["case study", "tesla", "business model"],
  },
  {
    id: "4",
    fileName: "Organizational Behavior Theories.pptx",
    fileType: "PowerPoint Presentation",
    course: "Organizational Behavior",
    courseCode: "MGMT201",
    uploadedBy: "Dr. Amanda Ng",
    uploadDate: "2024-11-08",
    fileSize: "4.2 MB",
    accessLevel: "Instructors Only",
    downloads: 12,
    tags: ["organizational", "behavior", "theories"],
  },
  {
    id: "5",
    fileName: "Corporate Finance Formulas Sheet.pdf",
    fileType: "PDF Document",
    course: "Corporate Finance",
    courseCode: "FIN301",
    uploadedBy: "Prof. Steven Ong",
    uploadDate: "2024-11-05",
    fileSize: "0.8 MB",
    accessLevel: "Public",
    downloads: 89,
    tags: ["finance", "formulas", "reference"],
  },
  {
    id: "6",
    fileName: "Marketing Mix Analysis Template.xlsx",
    fileType: "Excel Spreadsheet",
    course: "Marketing Management",
    courseCode: "MKT201",
    uploadedBy: "Dr. Kevin Sim",
    uploadDate: "2024-11-03",
    fileSize: "1.2 MB",
    accessLevel: "Course Only",
    downloads: 34,
    tags: ["marketing", "template", "analysis"],
  },
  {
    id: "7",
    fileName: "Supply Chain Management Best Practices.pdf",
    fileType: "PDF Document",
    course: "Operations Management",
    courseCode: "OPS301",
    uploadedBy: "Prof. Daniel Ho",
    uploadDate: "2024-11-01",
    fileSize: "2.9 MB",
    accessLevel: "Public",
    downloads: 56,
    tags: ["supply chain", "operations", "best practices"],
  },
  {
    id: "8",
    fileName: "Mid-term Exam Sample Questions.pdf",
    fileType: "PDF Document",
    course: "Business Fundamentals",
    courseCode: "COR101",
    uploadedBy: "Dr. Lisa Tan",
    uploadDate: "2024-10-28",
    fileSize: "1.5 MB",
    accessLevel: "Course Only",
    downloads: 78,
    tags: ["exam", "sample", "questions"],
  },
]
