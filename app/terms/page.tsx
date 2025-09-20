import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FileText, AlertTriangle, Scale, CreditCard } from "lucide-react"

export default function TermsOfServicePage() {
  return (
    <div className="container py-8 max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-2">
          <FileText className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold tracking-tight">Terms of Service</h1>
        </div>
        <p className="text-muted-foreground text-lg">SMU AI Grading Platform - Usage Guidelines and Restrictions</p>
        <Badge variant="outline" className="academic-badge bg-secondary/20 text-secondary-foreground">
          Educational Use Only
        </Badge>
      </div>

      <Card className="academic-card border-amber-200 bg-amber-50/50">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-amber-800">
            <AlertTriangle className="h-5 w-5" />
            <span>Important Notice</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-amber-800">
            This platform is provided exclusively for legitimate educational purposes at Singapore Management
            University. Any misuse or violation of these terms may result in immediate account suspension and
            disciplinary action.
          </p>
        </CardContent>
      </Card>

      <Card className="academic-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Scale className="h-5 w-5" />
            <span>Prohibited Uses</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <h3 className="font-semibold text-red-600">Illegal Activities</h3>
            <p className="text-muted-foreground">
              You may not use this platform for any illegal activities, including but not limited to:
            </p>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              <li>Academic dishonesty or facilitating cheating</li>
              <li>Unauthorized access to student records</li>
              <li>Violation of copyright or intellectual property laws</li>
              <li>Harassment, discrimination, or inappropriate conduct</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold text-red-600">Against University Policies</h3>
            <p className="text-muted-foreground">
              Any use that violates SMU's academic integrity policies, code of conduct, or educational standards is
              strictly prohibited.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="academic-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <CreditCard className="h-5 w-5" />
            <span>Credit Usage Policy</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <h3 className="font-semibold">Responsible Usage</h3>
            <p className="text-muted-foreground">
              AI processing credits are provided for legitimate educational assessment purposes. Users must:
            </p>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              <li>Use credits only for actual course assessments and grading</li>
              <li>Avoid unnecessary or excessive processing requests</li>
              <li>Report any technical issues that may waste credits</li>
              <li>Follow efficient grading practices to optimize resource usage</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold">Credit Abuse</h3>
            <p className="text-muted-foreground">
              Intentional waste of processing credits, including running unnecessary analyses, testing with non-academic
              content, or sharing access with unauthorized users, may result in account restrictions or termination.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="academic-card">
        <CardHeader>
          <CardTitle>Acceptable Use Guidelines</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <h3 className="font-semibold text-green-600">Encouraged Uses</h3>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              <li>Grading student assessments and providing feedback</li>
              <li>Creating rubrics and assessment criteria</li>
              <li>Analyzing learning outcomes and student performance</li>
              <li>Collaborating with authorized SMU personnel</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold">Account Responsibilities</h3>
            <p className="text-muted-foreground">
              Users are responsible for maintaining the security of their accounts, reporting suspicious activity, and
              ensuring all platform usage aligns with SMU's educational mission.
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="text-center text-sm text-muted-foreground">
        <p>Last updated: {new Date().toLocaleDateString()}</p>
        <p>By using this platform, you agree to these terms and SMU's academic policies.</p>
      </div>
    </div>
  )
}
