import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Award, Trophy, Star, Calendar, Target, Zap, Gift, BookOpen } from "lucide-react"
import { DuoCharacter } from "@/components/duo-character"

export default function RewardsPage() {
  return (
    <div className="container py-8 space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">보상 및 업적</h1>
        <p className="text-muted-foreground mt-2">학습 성과에 따른 보상과 업적을 확인하세요.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-3xl font-bold text-primary">12</div>
            <div className="text-sm text-muted-foreground">획득한 배지</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-3xl font-bold text-success">8</div>
            <div className="text-sm text-muted-foreground">완료한 업적</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-3xl font-bold text-warning">3,250</div>
            <div className="text-sm text-muted-foreground">총 획득 XP</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-3xl font-bold text-info">7일</div>
            <div className="text-sm text-muted-foreground">연속 학습</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="badges" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 md:w-auto">
          <TabsTrigger value="badges">배지</TabsTrigger>
          <TabsTrigger value="achievements">업적</TabsTrigger>
          <TabsTrigger value="streaks">연속 학습</TabsTrigger>
        </TabsList>

        <TabsContent value="badges" className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {badges.map((badge) => (
              <Card key={badge.id} className={`duo-card ${!badge.earned ? "opacity-60" : ""}`}>
                <CardContent className="p-4 flex flex-col items-center text-center">
                  <div
                    className={`w-16 h-16 rounded-full flex items-center justify-center mb-3 ${
                      badge.earned ? "bg-warning/20" : "bg-muted"
                    }`}
                  >
                    <Award className={`h-8 w-8 ${badge.earned ? "text-warning" : "text-muted-foreground"}`} />
                  </div>
                  <h3 className="font-medium">{badge.name}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{badge.description}</p>
                  {badge.earned ? (
                    <Badge className="mt-2 bg-success/20 text-success border-0">획득함</Badge>
                  ) : (
                    <div className="mt-2 space-y-1">
                      <div className="text-xs text-muted-foreground flex justify-between">
                        <span>진행률</span>
                        <span>
                          {badge.progress}/{badge.target}
                        </span>
                      </div>
                      <Progress value={(badge.progress / badge.target) * 100} className="h-1.5" />
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="achievements" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {achievements.map((achievement) => (
              <Card key={achievement.id} className={`duo-card ${!achievement.completed ? "opacity-60" : ""}`}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        achievement.completed ? "bg-success/20" : "bg-muted"
                      }`}
                    >
                      <achievement.icon
                        className={`h-6 w-6 ${achievement.completed ? "text-success" : "text-muted-foreground"}`}
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h3 className="font-medium">{achievement.name}</h3>
                        <Badge
                          className={`${
                            achievement.completed ? "bg-success/20 text-success" : "bg-muted text-muted-foreground"
                          } border-0`}
                        >
                          {achievement.xp} XP
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{achievement.description}</p>
                      {!achievement.completed && (
                        <div className="mt-2 space-y-1">
                          <div className="text-xs text-muted-foreground flex justify-between">
                            <span>진행률</span>
                            <span>
                              {achievement.progress}/{achievement.target}
                            </span>
                          </div>
                          <Progress value={(achievement.progress / achievement.target) * 100} className="h-1.5" />
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="streaks" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>연속 학습 현황</CardTitle>
              <CardDescription>매일 학습하여 연속 학습 기록을 이어가세요.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-warning/20 flex items-center justify-center">
                    <Zap className="h-6 w-6 text-warning" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">7일</div>
                    <div className="text-sm text-muted-foreground">현재 연속 학습</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                    <Trophy className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">14일</div>
                    <div className="text-sm text-muted-foreground">최고 기록</div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>다음 목표까지</span>
                  <span className="font-medium">3일 남음</span>
                </div>
                <Progress value={70} className="h-2" />
                <div className="text-xs text-muted-foreground text-right">10일 연속 학습 달성 시 특별 배지 획득</div>
              </div>

              <div className="grid grid-cols-7 gap-2 mt-4">
                {Array.from({ length: 7 }).map((_, index) => (
                  <div
                    key={index}
                    className="aspect-square rounded-lg flex items-center justify-center bg-success/20 text-success font-medium"
                  >
                    {index + 1}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>연속 학습 보상</CardTitle>
                <CardDescription>연속 학습 일수에 따른 보상</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {streakRewards.map((reward) => (
                    <li
                      key={reward.days}
                      className={`flex items-center justify-between p-3 rounded-lg ${
                        reward.days <= 7 ? "bg-success/10" : "bg-muted"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            reward.days <= 7 ? "bg-success/20" : "bg-muted/80"
                          }`}
                        >
                          <Calendar
                            className={`h-4 w-4 ${reward.days <= 7 ? "text-success" : "text-muted-foreground"}`}
                          />
                        </div>
                        <div>
                          <div className="font-medium">{reward.days}일 연속 학습</div>
                          <div className="text-xs text-muted-foreground">{reward.description}</div>
                        </div>
                      </div>
                      <Badge
                        className={`${
                          reward.days <= 7 ? "bg-success/20 text-success" : "bg-muted/80 text-muted-foreground"
                        } border-0`}
                      >
                        {reward.xp} XP
                      </Badge>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>연속 학습 팁</CardTitle>
                <CardDescription>연속 학습을 유지하기 위한 팁</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3 p-4 bg-muted rounded-lg">
                    <Target className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <h4 className="font-medium">일일 목표 설정하기</h4>
                      <p className="text-sm text-muted-foreground">
                        매일 달성 가능한 작은 목표를 설정하여 꾸준히 학습하세요.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-muted rounded-lg">
                    <Calendar className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <h4 className="font-medium">학습 시간 정하기</h4>
                      <p className="text-sm text-muted-foreground">
                        매일 같은 시간에 학습하는 습관을 들이면 연속 학습을 유지하기 쉽습니다.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-muted rounded-lg">
                    <Gift className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <h4 className="font-medium">자신에게 보상 주기</h4>
                      <p className="text-sm text-muted-foreground">
                        일정 기간 연속 학습을 달성하면 스스로에게 작은 보상을 주세요.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      <Card className="duo-card bg-gradient-to-r from-primary/10 to-secondary/10">
        <CardContent className="p-6 flex flex-col md:flex-row items-center gap-6">
          <DuoCharacter mood="excited" size="lg" animation="bounce" />
          <div>
            <h2 className="text-xl font-bold mb-2">다음 목표를 향해 나아가세요!</h2>
            <p className="text-muted-foreground mb-4">
              지금까지 훌륭한 성과를 거두었습니다. 계속해서 학습하고 더 많은 배지와 업적을 획득하세요.
            </p>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>레벨 3 진행률</span>
                <span className="font-medium">720/1000 XP</span>
              </div>
              <Progress value={72} className="h-2" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

const badges = [
  {
    id: 1,
    name: "첫 걸음",
    description: "첫 번째 레슨 완료",
    earned: true,
    progress: 1,
    target: 1,
  },
  {
    id: 2,
    name: "대화 마스터",
    description: "10번의 대화 연습 완료",
    earned: true,
    progress: 10,
    target: 10,
  },
  {
    id: 3,
    name: "어휘 수집가",
    description: "100개의 단어 학습",
    earned: true,
    progress: 100,
    target: 100,
  },
  {
    id: 4,
    name: "문법 전문가",
    description: "모든 기초 문법 레슨 완료",
    earned: false,
    progress: 8,
    target: 10,
  },
  {
    id: 5,
    name: "발음 마스터",
    description: "발음 평가에서 90% 이상 획득",
    earned: false,
    progress: 85,
    target: 90,
  },
  {
    id: 6,
    name: "꾸준한 학습자",
    description: "30일 연속 학습",
    earned: false,
    progress: 7,
    target: 30,
  },
  {
    id: 7,
    name: "초급 완료",
    description: "모든 초급 코스 완료",
    earned: false,
    progress: 3,
    target: 5,
  },
  {
    id: 8,
    name: "퀴즈 마스터",
    description: "20개의 퀴즈에서 100% 획득",
    earned: false,
    progress: 12,
    target: 20,
  },
]

const achievements = [
  {
    id: 1,
    name: "첫 번째 레슨",
    description: "첫 번째 레슨을 완료했습니다.",
    icon: BookOpen,
    completed: true,
    xp: 50,
    progress: 1,
    target: 1,
  },
  {
    id: 2,
    name: "5일 연속 학습",
    description: "5일 연속으로 학습 목표를 달성했습니다.",
    icon: Calendar,
    completed: true,
    xp: 100,
    progress: 5,
    target: 5,
  },
  {
    id: 3,
    name: "첫 대화 완료",
    description: "첫 번째 대화 연습을 완료했습니다.",
    icon: Star,
    completed: true,
    xp: 50,
    progress: 1,
    target: 1,
  },
  {
    id: 4,
    name: "50개 단어 학습",
    description: "50개의 단어를 학습했습니다.",
    icon: BookOpen,
    completed: true,
    xp: 100,
    progress: 50,
    target: 50,
  },
  {
    id: 5,
    name: "10개 레슨 완료",
    description: "10개의 레슨을 완료했습니다.",
    icon: Trophy,
    completed: true,
    xp: 150,
    progress: 10,
    target: 10,
  },
  {
    id: 6,
    name: "첫 퀴즈 만점",
    description: "첫 번째 퀴즈에서 100%를 획득했습니다.",
    icon: Award,
    completed: true,
    xp: 50,
    progress: 1,
    target: 1,
  },
  {
    id: 7,
    name: "100개 단어 학습",
    description: "100개의 단어를 학습했습니다.",
    icon: BookOpen,
    completed: true,
    xp: 200,
    progress: 100,
    target: 100,
  },
  {
    id: 8,
    name: "10일 연속 학습",
    description: "10일 연속으로 학습 목표를 달성했습니다.",
    icon: Calendar,
    completed: false,
    xp: 200,
    progress: 7,
    target: 10,
  },
  {
    id: 9,
    name: "모든 초급 코스 완료",
    description: "모든 초급 코스를 완료했습니다.",
    icon: Trophy,
    completed: false,
    xp: 300,
    progress: 3,
    target: 5,
  },
  {
    id: 10,
    name: "20개 대화 완료",
    description: "20개의 대화 연습을 완료했습니다.",
    icon: Star,
    completed: false,
    xp: 250,
    progress: 12,
    target: 20,
  },
]

const streakRewards = [
  {
    days: 1,
    description: "첫 번째 학습일",
    xp: 10,
  },
  {
    days: 3,
    description: "3일 연속 학습",
    xp: 30,
  },
  {
    days: 5,
    description: "5일 연속 학습",
    xp: 50,
  },
  {
    days: 7,
    description: "일주일 연속 학습",
    xp: 70,
  },
  {
    days: 10,
    description: "10일 연속 학습",
    xp: 100,
  },
  {
    days: 15,
    description: "15일 연속 학습",
    xp: 150,
  },
  {
    days: 21,
    description: "3주 연속 학습",
    xp: 210,
  },
  {
    days: 30,
    description: "한 달 연속 학습",
    xp: 300,
  },
]
