"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { User, Mail, Phone, MapPin, GraduationCap, BookOpen, Users, Award, Edit, Calendar } from "lucide-react"

export default function ProfilePage() {
  const profileData = {
    name: "Dr. Chen Shen Fu",
    title: "Associate Professor",
    department: "School of Information Systems",
    email: "chenshenfu@smu.edu.sg",
    phone: "+65 6828 0123",
    office: "School of Information Systems Building, Level 4, Room 4021",
    courses: [
      "COR-MGMT1001 - Management Communication",
      "IS112 - Data Management",
      "IS113 - Web Application Development",
      "IS614 - Advanced Database Systems",
    ],
    education: [
      {
        degree: "Ph.D. in Information Systems",
        institution: "National University of Singapore",
        year: "2015",
      },
      {
        degree: "M.Sc. in Computer Science",
        institution: "Nanyang Technological University",
        year: "2011",
      },
      {
        degree: "B.Eng. in Computer Engineering",
        institution: "Singapore Management University",
        year: "2009",
      },
    ],
    publications: [
      "Machine Learning Applications in Educational Assessment (2024)",
      "Adaptive Learning Systems: A Comprehensive Review (2023)",
      "Data-Driven Approaches to Student Performance Prediction (2023)",
      "Intelligent Tutoring Systems in Higher Education (2022)",
    ],
    researchFellows: [
      "Dr. Sarah Lim - Postdoctoral Research Fellow",
      "John Tan Wei Ming - PhD Candidate",
      "Lisa Wong - Research Assistant",
      "Michael Chen - Undergraduate Research Assistant",
    ],
    topicInterests: [
      "Machine Learning in Education",
      "Educational Data Mining",
      "Adaptive Learning Systems",
      "Learning Analytics",
      "Artificial Intelligence",
      "Database Systems",
      "Web Technologies",
    ],
  }

  return (
    <div className="container mx-auto py-8 space-y-8">
      {/* Header Section */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <Avatar className="h-24 w-24">
              <AvatarImage src="/placeholder.svg" alt={profileData.name} />
              <AvatarFallback className="text-2xl">
                <User className="h-12 w-12" />
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-2">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-bold">{profileData.name}</h1>
                  <p className="text-xl text-muted-foreground">{profileData.title}</p>
                  <p className="text-lg text-muted-foreground">{profileData.department}</p>
                </div>
                <Button variant="outline" className="w-fit bg-transparent">
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Profile
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-1 space-y-6">
          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Contact Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{profileData.email}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{profileData.phone}</span>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                <span className="text-sm">{profileData.office}</span>
              </div>
            </CardContent>
          </Card>

          {/* Topic Interests */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5" />
                Research Interests
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {profileData.topicInterests.map((topic, index) => (
                  <Badge key={index} variant="secondary">
                    {topic}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Current Courses */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Current Courses
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {profileData.courses.map((course, index) => (
                  <div key={index} className="p-3 border rounded-lg">
                    <p className="font-medium text-sm">{course}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Education History */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5" />
                Education History
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {profileData.education.map((edu, index) => (
                <div key={index} className="flex items-start gap-4">
                  <Calendar className="h-4 w-4 text-muted-foreground mt-1" />
                  <div>
                    <p className="font-medium">{edu.degree}</p>
                    <p className="text-sm text-muted-foreground">{edu.institution}</p>
                    <p className="text-sm text-muted-foreground">{edu.year}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Recent Publications */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5" />
                Recent Publications
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {profileData.publications.map((publication, index) => (
                <div key={index} className="p-3 border rounded-lg">
                  <p className="text-sm font-medium">{publication}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Research Team */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Research Team
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {profileData.researchFellows.map((fellow, index) => (
                <div key={index} className="flex items-center gap-3 p-3 border rounded-lg">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>
                      <User className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                  <p className="text-sm font-medium">{fellow}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
