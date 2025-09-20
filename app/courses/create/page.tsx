"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Upload, X, FileText, Users, Key, Shield, Calendar, BookOpen } from "lucide-react"
import { useRouter } from "next/navigation"

export default function CreateCoursePage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    courseCode: "",
    courseTitle: "",
    description: "",
    year: "",
    semester: "",
    level: "",
    joinCode: "",
    maxStudents: "",
  })

  const [enrolledStudents, setEnrolledStudents] = useState<string[]>([])
  const [newStudent, setNewStudent] = useState("")
  const [accessUsers, setAccessUsers] = useState<string[]>([])
  const [newAccessUser, setNewAccessUser] = useState("")
  const [syllabusFile, setSyllabusFile] = useState<File | null>(null)
  const [pdfFiles, setPdfFiles] = useState<File[]>([])

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const addStudent = () => {
    if (newStudent.trim() && !enrolledStudents.includes(newStudent.trim())) {
      setEnrolledStudents((prev) => [...prev, newStudent.trim()])
      setNewStudent("")
    }
  }

  const removeStudent = (student: string) => {
    setEnrolledStudents((prev) => prev.filter((s) => s !== student))
  }

  const addAccessUser = () => {
    if (newAccessUser.trim() && !accessUsers.includes(newAccessUser.trim())) {
      setAccessUsers((prev) => [...prev, newAccessUser.trim()])
      setNewAccessUser("")
    }
  }

  const removeAccessUser = (user: string) => {
    setAccessUsers((prev) => prev.filter((u) => u !== user))
  }

  const handleSyllabusUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && file.type === "application/pdf") {
      setSyllabusFile(file)
    }
  }

  const handlePdfUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    const pdfFiles = files.filter((file) => file.type === "application/pdf")
    setPdfFiles((prev) => [...prev, ...pdfFiles])
  }

  const removePdfFile = (index: number) => {
    setPdfFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const generateJoinCode = () => {
    const code = Math.random().toString(36).substring(2, 8).toUpperCase()
    setFormData((prev) => ({ ...prev, joinCode: code }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission logic here
    console.log("Course Data:", formData)
    console.log("Enrolled Students:", enrolledStudents)
    console.log("Access Users:", accessUsers)
    console.log("Syllabus:", syllabusFile)
    console.log("PDF Files:", pdfFiles)

    // Navigate back to courses page
    router.push("/courses")
  }

  return (
    <div className="container py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Create New Course</h1>
        <p className="text-muted-foreground mt-2">Set up a new course with all necessary details and resources</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Course Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Course Information
            </CardTitle>
            <CardDescription>Basic details about the course</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="courseCode">Course Code *</Label>
                <Input
                  id="courseCode"
                  placeholder="e.g., COR101"
                  value={formData.courseCode}
                  onChange={(e) => handleInputChange("courseCode", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="level">Course Level *</Label>
                <Select value={formData.level} onValueChange={(value) => handleInputChange("level", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="undergraduate">Undergraduate</SelectItem>
                    <SelectItem value="graduate">Graduate</SelectItem>
                    <SelectItem value="postgraduate">Postgraduate</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="courseTitle">Course Title *</Label>
              <Input
                id="courseTitle"
                placeholder="e.g., Business Fundamentals"
                value={formData.courseTitle}
                onChange={(e) => handleInputChange("courseTitle", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Course Description</Label>
              <Textarea
                id="description"
                placeholder="Brief description of the course content and objectives"
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {/* Academic Period */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Academic Period
            </CardTitle>
            <CardDescription>Specify the academic year and semester</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="year">Academic Year *</Label>
                <Select value={formData.year} onValueChange={(value) => handleInputChange("year", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select year" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2024/25">AY2024/25</SelectItem>
                    <SelectItem value="2025/26">AY2025/26</SelectItem>
                    <SelectItem value="2026/27">AY2026/27</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="semester">Semester *</Label>
                <Select value={formData.semester} onValueChange={(value) => handleInputChange("semester", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select semester" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="S1">Semester 1</SelectItem>
                    <SelectItem value="S2">Semester 2</SelectItem>
                    <SelectItem value="ST1">Special Term 1</SelectItem>
                    <SelectItem value="ST2">Special Term 2</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Student Management */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Student Enrollment
            </CardTitle>
            <CardDescription>Manage student enrollment and course capacity</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="maxStudents">Maximum Students</Label>
                <Input
                  id="maxStudents"
                  type="number"
                  placeholder="e.g., 50"
                  value={formData.maxStudents}
                  onChange={(e) => handleInputChange("maxStudents", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="joinCode">Student Join Code</Label>
                <div className="flex gap-2">
                  <Input
                    id="joinCode"
                    placeholder="Auto-generated code"
                    value={formData.joinCode}
                    onChange={(e) => handleInputChange("joinCode", e.target.value)}
                  />
                  <Button type="button" variant="outline" onClick={generateJoinCode}>
                    <Key className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Pre-enrolled Students</Label>
              <div className="flex gap-2">
                <Input
                  placeholder="Enter student email or ID"
                  value={newStudent}
                  onChange={(e) => setNewStudent(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addStudent())}
                />
                <Button type="button" variant="outline" onClick={addStudent}>
                  Add
                </Button>
              </div>
              {enrolledStudents.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {enrolledStudents.map((student) => (
                    <Badge key={student} variant="secondary" className="flex items-center gap-1">
                      {student}
                      <X className="h-3 w-3 cursor-pointer" onClick={() => removeStudent(student)} />
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Access Control */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Access Control
            </CardTitle>
            <CardDescription>Manage who has access to course materials and grading</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Course Instructors & TAs</Label>
              <div className="flex gap-2">
                <Input
                  placeholder="Enter instructor/TA email"
                  value={newAccessUser}
                  onChange={(e) => setNewAccessUser(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addAccessUser())}
                />
                <Button type="button" variant="outline" onClick={addAccessUser}>
                  Add
                </Button>
              </div>
              {accessUsers.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {accessUsers.map((user) => (
                    <Badge key={user} variant="outline" className="flex items-center gap-1">
                      {user}
                      <X className="h-3 w-3 cursor-pointer" onClick={() => removeAccessUser(user)} />
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Course Materials */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Course Materials
            </CardTitle>
            <CardDescription>Upload syllabus and additional PDFs for the RAG knowledge base</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Syllabus Upload */}
            <div className="space-y-2">
              <Label>Course Syllabus</Label>
              <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6">
                <div className="text-center">
                  <Upload className="mx-auto h-12 w-12 text-muted-foreground/50" />
                  <div className="mt-4">
                    <Label htmlFor="syllabus" className="cursor-pointer">
                      <span className="text-sm font-medium text-primary hover:text-primary/80">
                        Click to upload syllabus
                      </span>
                      <Input
                        id="syllabus"
                        type="file"
                        accept=".pdf"
                        onChange={handleSyllabusUpload}
                        className="hidden"
                      />
                    </Label>
                    <p className="text-xs text-muted-foreground mt-1">PDF files only</p>
                  </div>
                </div>
                {syllabusFile && (
                  <div className="mt-4 p-3 bg-muted rounded-lg flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      <span className="text-sm">{syllabusFile.name}</span>
                    </div>
                    <Button type="button" variant="ghost" size="sm" onClick={() => setSyllabusFile(null)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
            </div>

            <Separator />

            {/* Additional PDFs */}
            <div className="space-y-2">
              <Label>Additional Course Materials</Label>
              <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6">
                <div className="text-center">
                  <Upload className="mx-auto h-12 w-12 text-muted-foreground/50" />
                  <div className="mt-4">
                    <Label htmlFor="pdfs" className="cursor-pointer">
                      <span className="text-sm font-medium text-primary hover:text-primary/80">
                        Click to upload additional PDFs
                      </span>
                      <Input
                        id="pdfs"
                        type="file"
                        accept=".pdf"
                        multiple
                        onChange={handlePdfUpload}
                        className="hidden"
                      />
                    </Label>
                    <p className="text-xs text-muted-foreground mt-1">
                      Upload lecture notes, readings, and other course materials
                    </p>
                  </div>
                </div>
              </div>
              {pdfFiles.length > 0 && (
                <div className="space-y-2 mt-4">
                  {pdfFiles.map((file, index) => (
                    <div key={index} className="p-3 bg-muted rounded-lg flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4" />
                        <span className="text-sm">{file.name}</span>
                      </div>
                      <Button type="button" variant="ghost" size="sm" onClick={() => removePdfFile(index)}>
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Submit Buttons */}
        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={() => router.back()}>
            Cancel
          </Button>
          <Button type="submit" className="academic-button bg-primary text-primary-foreground">
            Create Course
          </Button>
        </div>
      </form>
    </div>
  )
}
