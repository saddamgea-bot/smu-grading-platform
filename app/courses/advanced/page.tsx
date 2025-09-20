import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function AdvancedCoursesPage() {
  return (
    <div className="container py-8 space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Advanced Business Courses</h1>
        <p className="text-muted-foreground mt-2">
          Executive-level business strategy and specialized industry knowledge.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <Link key={course.id} href={`/courses/${course.id}/assessments`}>
            <Card className="academic-card h-full overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-video relative">
                <Image
                  src={course.image || "/placeholder.svg?height=200&width=400&query=business%20education"}
                  alt={course.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover"
                />
              </div>
              <CardContent className="p-4">
                <Badge
                  variant="outline"
                  className="academic-badge mb-2 bg-secondary/20 text-secondary-foreground border-0"
                >
                  {course.level}
                </Badge>
                <h3 className="font-bold text-lg mb-1">{course.title}</h3>
                <p className="text-muted-foreground text-sm line-clamp-2 mb-3">{course.description}</p>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">{course.lessons} modules</span>
                  <span className="text-primary font-medium">{course.duration}</span>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="text-center pt-4">
        <Button variant="outline" className="academic-button bg-transparent" asChild>
          <Link href="/courses">
            View All Courses
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  )
}

const courses = [
  {
    id: "1",
    title: "Executive Leadership",
    description: "Advanced leadership strategies and organizational transformation management.",
    image: "/management-classroom.jpg",
    level: "Advanced",
    lessons: 10,
    duration: "5 weeks",
  },
  {
    id: "2",
    title: "Mergers & Acquisitions",
    description: "Corporate restructuring, due diligence, and post-merger integration strategies.",
    image: "/finance-classroom.jpg",
    level: "Advanced",
    lessons: 12,
    duration: "6 weeks",
  },
  {
    id: "3",
    title: "Innovation Management",
    description: "Technology adoption, disruptive innovation, and R&D management strategies.",
    image: "/university-grading-platform.jpg",
    level: "Advanced",
    lessons: 8,
    duration: "4 weeks",
  },
  {
    id: "4",
    title: "Risk Management",
    description: "Enterprise risk assessment, mitigation strategies, and regulatory compliance.",
    image: "/operations-classroom.jpg",
    level: "Advanced",
    lessons: 6,
    duration: "3 weeks",
  },
  {
    id: "5",
    title: "Global Strategy",
    description: "Multinational corporation management and international market expansion.",
    image: "/marketing-classroom.jpg",
    level: "Advanced",
    lessons: 8,
    duration: "4 weeks",
  },
  {
    id: "6",
    title: "Business Transformation",
    description: "Digital transformation, change management, and organizational restructuring.",
    image: "/management-classroom.jpg",
    level: "Advanced",
    lessons: 10,
    duration: "5 weeks",
  },
]
