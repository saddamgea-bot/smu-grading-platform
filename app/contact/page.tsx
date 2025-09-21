import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Mail, Phone, MapPin, Clock, Users, ExternalLink } from "lucide-react"

export default function ContactPage() {
  return (
    <div className="container py-8 max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-2">
          <Mail className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold tracking-tight">Contact Support</h1>
        </div>
        <p className="text-muted-foreground text-lg">Get help with the SMU AI Grading Platform</p>
        <Badge variant="outline" className="academic-badge bg-primary/10 text-primary">
          SMU Faculty & Staff Support
        </Badge>
      </div>

      <Card className="academic-card border-primary/20 bg-primary/5">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="h-5 w-5" />
            <span>SMU Centre for Teaching Excellence (CTE)</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-muted-foreground">
            For all inquiries related to the SMU AI Grading Platform, please contact our dedicated support team at the
            Centre for Teaching Excellence. Our team is here to help you maximize the platform's potential for your
            teaching and assessment needs.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Mail className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h3 className="font-semibold">Email Support</h3>
                  <p className="text-muted-foreground">cte@smu.edu.sg</p>
                  <p className="text-sm text-muted-foreground">Primary contact for platform support</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Phone className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h3 className="font-semibold">Phone Support</h3>
                  <p className="text-muted-foreground">+65 6808 5172</p>
                  <p className="text-sm text-muted-foreground">For urgent technical issues</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h3 className="font-semibold">Office Location</h3>
                  <p className="text-muted-foreground">
                    Administration Building
                    <br />
                    Level 4, Room 4001
                    <br />
                    81 Victoria Street, Singapore 188065
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Clock className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h3 className="font-semibold">Support Hours</h3>
                  <p className="text-muted-foreground">
                    Monday - Friday: 9:00 AM - 6:00 PM
                    <br />
                    Saturday: 9:00 AM - 1:00 PM
                    <br />
                    Sunday & Public Holidays: Closed
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="academic-card">
          <CardHeader>
            <CardTitle>Technical Support</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">For technical issues, platform bugs, or feature requests:</p>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground text-sm">
              <li>Login and authentication problems</li>
              <li>Grading system errors</li>
              <li>Data export/import issues</li>
              <li>Performance or connectivity problems</li>
            </ul>
            <Button className="w-full academic-button bg-primary text-primary-foreground">
              <Mail className="mr-2 h-4 w-4" />
              Email Technical Support
            </Button>
          </CardContent>
        </Card>

        <Card className="academic-card">
          <CardHeader>
            <CardTitle>Training & Resources</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">For training sessions, best practices, and educational guidance:</p>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground text-sm">
              <li>Platform training workshops</li>
              <li>Assessment design consultation</li>
              <li>AI grading best practices</li>
              <li>Integration with existing workflows</li>
            </ul>
            <Button variant="outline" className="w-full academic-button bg-transparent">
              <ExternalLink className="mr-2 h-4 w-4" />
              Visit CTE Website
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card className="academic-card">
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div>
              <h3 className="font-semibold">How do I get access to the platform?</h3>
              <p className="text-muted-foreground text-sm">
                Access is granted to SMU faculty and authorized staff. Contact CTE to request access with your SMU
                credentials.
              </p>
            </div>

            <div>
              <h3 className="font-semibold">What types of assessments can be graded?</h3>
              <p className="text-muted-foreground text-sm">
                The platform supports various assessment types including essays, case studies, exams, and project
                reports.
              </p>
            </div>

            <div>
              <h3 className="font-semibold">Is student data secure?</h3>
              <p className="text-muted-foreground text-sm">
                Yes, all data is encrypted and stored according to SMU's data protection policies and Singapore's PDPA
                requirements.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="text-center text-sm text-muted-foreground">
        <p>Response time: Within 1-2 business days for email inquiries</p>
        <p>For urgent issues during business hours, please call our support line</p>
      </div>
    </div>
  )
}
