import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Download } from "lucide-react"
import Link from "next/link"
import ProgressChart from "@/components/progress-chart"
import StrengthsWeaknesses from "@/components/strengths-weaknesses"
import RecentActivity from "@/components/recent-activity"

export default function AdvancedDashboardPage() {
  return (
    <div className="container py-8 space-y-6">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="sm" className="mr-2" asChild>
          <Link href="/dashboard">
            <ArrowLeft className="h-4 w-4 mr-1" />
            기본 대시보드로 돌아가기
          </Link>
        </Button>
      </div>

      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">고급 학습 분석</h1>
        <p className="text-muted-foreground mt-2">상세한 학습 데이터 분석과 인사이트를 확인하세요.</p>
      </div>

      <div className="flex justify-end">
        <Button variant="outline" size="sm">
          <Download className="h-4 w-4 mr-2" />
          분석 데이터 내보내기
        </Button>
      </div>

      <Tabs defaultValue="progress" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 md:w-auto">
          <TabsTrigger value="progress">학습 진행</TabsTrigger>
          <TabsTrigger value="skills">언어 능력</TabsTrigger>
          <TabsTrigger value="activities">활동 분석</TabsTrigger>
        </TabsList>

        <TabsContent value="progress" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>학습 진행 상황 상세 분석</CardTitle>
            </CardHeader>
            <CardContent>
              <ProgressChart />
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">학습 일관성</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary">85%</div>
                <p className="text-sm text-muted-foreground">지난 30일 동안의 학습 일관성 점수입니다.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">학습 효율성</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-success">78%</div>
                <p className="text-sm text-muted-foreground">학습 시간 대비 성취도 효율성입니다.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">예상 완료율</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-warning">92%</div>
                <p className="text-sm text-muted-foreground">현재 속도로 목표 달성 가능성입니다.</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="skills" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>언어 능력 상세 분석</CardTitle>
            </CardHeader>
            <CardContent>
              <StrengthsWeaknesses />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>언어 능력 발전 추이</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                언어 능력 발전 추이 차트가 이곳에 표시됩니다.
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activities" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>활동 분석</CardTitle>
            </CardHeader>
            <CardContent>
              <RecentActivity />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>학습 패턴 분석</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                학습 패턴 분석 차트가 이곳에 표시됩니다.
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
