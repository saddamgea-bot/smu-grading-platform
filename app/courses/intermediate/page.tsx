import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function IntermediateCoursesPage() {
  return (
    <div className="container py-8 space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Intermediate Business Courses</h1>
        <p className="text-muted-foreground mt-2">Advanced business concepts and specialized management skills.</p>
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
    title: "Strategic Management",
    description: "Corporate strategy development and competitive analysis in business environments.",
    image: "/management-classroom.jpg",
    level: "Intermediate",
    lessons: 12,
    duration: "4 weeks",
  },
  {
    id: "2",
    title: "Digital Marketing",
    description: "Online marketing strategies, social media, and digital advertising campaigns.",
    image: "/marketing-classroom.jpg",
    level: "Intermediate",
    lessons: 8,
    duration: "3 weeks",
  },
  {
    id: "3",
    title: "Investment Analysis",
    description: "Portfolio management, risk assessment, and financial investment strategies.",
    image: "/finance-classroom.jpg",
    level: "Intermediate",
    lessons: 15,
    duration: "5 weeks",
  },
  {
    id: "4",
    title: "Supply Chain Management",
    description: "Logistics, procurement, and global supply chain optimization strategies.",
    image: "/operations-classroom.jpg",
    level: "Intermediate",
    lessons: 10,
    duration: "3 weeks",
  },
  {
    id: "5",
    title: "Business Analytics",
    description: "Data-driven decision making and predictive analytics for business intelligence.",
    image: "/university-grading-platform.jpg",
    level: "Intermediate",
    lessons: 12,
    duration: "4 weeks",
  },
  {
    id: "6",
    title: "International Business",
    description: "Global business operations, cross-cultural management, and international trade.",
    image: "/management-classroom.jpg",
    level: "Intermediate",
    lessons: 8,
    duration: "3 weeks",
  },
]
