import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, Users, Lock, Eye } from "lucide-react"

export default function PrivacyPolicyPage() {
  return (
    <div className="container py-8 max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-2">
          <Shield className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold tracking-tight">Privacy Policy</h1>
        </div>
        <p className="text-muted-foreground text-lg">SMU AI Grading Platform - For SMU Instructors Only</p>
        <Badge variant="outline" className="academic-badge bg-primary/10 text-primary">
          Restricted Access Required
        </Badge>
      </div>

      <Card className="academic-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="h-5 w-5" />
            <span>Access Requirements</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            This platform is exclusively designed for Singapore Management University (SMU) instructors and authorized
            personnel. Access to this system requires:
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>Valid SMU instructor account credentials</li>
            <li>Active employment or affiliation with SMU</li>
            <li>Completion of required data privacy training</li>
            <li>Approval from the Centre for Teaching Excellence (CTE)</li>
          </ul>
        </CardContent>
      </Card>

      <Card className="academic-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Lock className="h-5 w-5" />
            <span>Data Collection & Usage</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <h3 className="font-semibold">Student Data Protection</h3>
            <p className="text-muted-foreground">
              All student information, assessments, and grading data are handled in strict accordance with SMU's data
              protection policies and Singapore's Personal Data Protection Act (PDPA).
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold">Information We Collect</h3>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              <li>Student assessment submissions and grades</li>
              <li>Course enrollment and academic records</li>
              <li>Instructor feedback and rubric data</li>
              <li>Platform usage analytics for improvement</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold">Data Security</h3>
            <p className="text-muted-foreground">
              All data is encrypted in transit and at rest, stored on secure SMU-approved servers, and accessible only
              to authorized personnel with legitimate educational interests.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="academic-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Eye className="h-5 w-5" />
            <span>Data Sharing & Retention</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <h3 className="font-semibold">Limited Sharing</h3>
            <p className="text-muted-foreground">
              Student data is shared only within the SMU academic community on a need-to-know basis, including
              authorized instructors, teaching assistants, and academic administrators.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold">Retention Period</h3>
            <p className="text-muted-foreground">
              Assessment data is retained according to SMU's academic record retention policies, typically for the
              duration of the student's academic program plus additional years as required by regulations.
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="text-center text-sm text-muted-foreground">
        <p>Last updated: {new Date().toLocaleDateString()}</p>
        <p>For questions about this privacy policy, contact the SMU Centre for Teaching Excellence.</p>
      </div>
    </div>
  )
}
