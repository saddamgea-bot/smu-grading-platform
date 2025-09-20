"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"
import { BookOpen, MessageCircle, Award, CheckCircle, Clock, Filter, Calendar, ArrowRight } from "lucide-react"

// 샘플 데이터 - 실제 앱에서는 API에서 가져옵니다
const allActivities = [
  {
    id: 1,
    type: "lesson",
    title: "한국어 기초 회화 레슨 완료",
    date: "오늘",
    time: "14:30",
    xp: 50,
    detail: "정확도: 92%",
    duration: 25,
    content: {
      lessonName: "한국어 기초 회화",
      accuracy: 92,
      completedExercises: 15,
      totalExercises: 18,
      newWords: 8,
      masteredWords: 6,
    },
  },
  {
    id: 2,
    type: "conversation",
    title: "AI 대화 연습 참여",
    date: "오늘",
    time: "11:15",
    xp: 30,
    detail: "10분 대화",
    duration: 10,
    content: {
      topic: "카페에서 주문하기",
      duration: 10,
      turns: 12,
      fluencyScore: 85,
      accuracyScore: 78,
      newExpressions: 5,
    },
  },
  {
    id: 3,
    type: "achievement",
    title: "3일 연속 학습 달성",
    date: "오늘",
    time: "09:00",
    xp: 20,
    detail: "스트릭: 3일",
    duration: 0,
    content: {
      achievementName: "학습 열정",
      description: "3일 연속으로 학습 목표를 달성했습니다.",
      streakDays: 3,
      nextMilestone: 7,
      totalAchievements: 12,
      completedAchievements: 5,
    },
  },
  {
    id: 4,
    type: "quiz",
    title: "어휘 퀴즈 완료",
    date: "어제",
    time: "16:45",
    xp: 25,
    detail: "정확도: 85%",
    duration: 15,
    content: {
      quizName: "일상 생활 어휘",
      correctAnswers: 17,
      totalQuestions: 20,
      accuracy: 85,
      timeSpent: 15,
      difficultWords: ["신속하게", "무관심한", "열심히"],
    },
  },
  {
    id: 5,
    type: "lesson",
    title: "자기소개 표현 레슨 완료",
    date: "어제",
    time: "10:20",
    xp: 45,
    detail: "정확도: 88%",
    duration: 20,
    content: {
      lessonName: "자기소개 표현",
      accuracy: 88,
      completedExercises: 12,
      totalExercises: 15,
      newWords: 6,
      masteredWords: 4,
    },
  },
  {
    id: 6,
    type: "conversation",
    title: "원어민과 대화 연습",
    date: "2일 전",
    time: "15:30",
    xp: 40,
    detail: "15분 대화",
    duration: 15,
    content: {
      topic: "취미 이야기하기",
      duration: 15,
      turns: 18,
      fluencyScore: 80,
      accuracyScore: 75,
      newExpressions: 7,
    },
  },
  {
    id: 7,
    type: "quiz",
    title: "문법 퀴즈 완료",
    date: "3일 전",
    time: "11:20",
    xp: 35,
    detail: "정확도: 90%",
    duration: 18,
    content: {
      quizName: "시제와 조사",
      correctAnswers: 18,
      totalQuestions: 20,
      accuracy: 90,
      timeSpent: 18,
      difficultTopics: ["과거 시제", "조사 사용"],
    },
  },
]

export default function RecentActivity() {
  const [filter, setFilter] = useState("all")
  const [sortBy, setSortBy] = useState("recent")
  const [selectedActivity, setSelectedActivity] = useState<any>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [visibleCount, setVisibleCount] = useState(5)

  // 활동 유형에 따른 아이콘 선택
  const getActivityIcon = (type: string) => {
    switch (type) {
      case "lesson":
        return <BookOpen className="h-5 w-5 text-primary" />
      case "conversation":
        return <MessageCircle className="h-5 w-5 text-info" />
      case "achievement":
        return <Award className="h-5 w-5 text-warning" />
      case "quiz":
        return <CheckCircle className="h-5 w-5 text-success" />
      default:
        return <Clock className="h-5 w-5 text-muted-foreground" />
    }
  }

  // 필터링된 활동 목록
  const getFilteredActivities = () => {
    let filtered = [...allActivities]

    // 유형별 필터링
    if (filter !== "all") {
      filtered = filtered.filter((activity) => activity.type === filter)
    }

    // 정렬
    if (sortBy === "recent") {
      // 이미 날짜순으로 정렬되어 있음
    } else if (sortBy === "xp") {
      filtered.sort((a, b) => b.xp - a.xp)
    } else if (sortBy === "duration") {
      filtered.sort((a, b) => b.duration - a.duration)
    }

    return filtered
  }

  const filteredActivities = getFilteredActivities()

  // 활동 클릭 핸들러
  const handleActivityClick = (activity: any) => {
    setSelectedActivity(activity)
    setIsDialogOpen(true)
  }

  // 더 보기 핸들러
  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(prev + 5, filteredActivities.length))
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between gap-3">
        <Tabs value={filter} onValueChange={setFilter} className="w-full sm:w-auto">
          <TabsList className="grid grid-cols-4 w-full">
            <TabsTrigger value="all" className="text-xs sm:text-sm">
              전체
            </TabsTrigger>
            <TabsTrigger value="lesson" className="text-xs sm:text-sm">
              레슨
            </TabsTrigger>
            <TabsTrigger value="conversation" className="text-xs sm:text-sm">
              대화
            </TabsTrigger>
            <TabsTrigger value="quiz" className="text-xs sm:text-sm">
              퀴즈
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-[140px] h-9 text-sm">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="정렬 기준" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="recent">최신순</SelectItem>
            <SelectItem value="xp">XP 높은순</SelectItem>
            <SelectItem value="duration">학습 시간순</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-3">
        {filteredActivities.slice(0, visibleCount).map((activity) => (
          <Card
            key={activity.id}
            className="duo-card overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => handleActivityClick(activity)}
          >
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex-shrink-0">{getActivityIcon(activity.type)}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="font-medium text-sm line-clamp-1">{activity.title}</h4>
                    <Badge className="duo-badge bg-primary/10 text-primary border-0 flex-shrink-0">
                      +{activity.xp} XP
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{activity.detail}</p>
                  <div className="flex items-center text-xs text-muted-foreground mt-2">
                    <Calendar className="h-3 w-3 mr-1" />
                    <span>
                      {activity.date} {activity.time}
                    </span>
                    {activity.duration > 0 && (
                      <span className="ml-3 flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {activity.duration}분
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {visibleCount < filteredActivities.length && (
        <div className="text-center pt-2">
          <Button variant="outline" size="sm" onClick={handleLoadMore} className="text-primary font-medium">
            더 보기 ({visibleCount}/{filteredActivities.length})
          </Button>
        </div>
      )}

      {filteredActivities.length === 0 && (
        <Card className="duo-card p-6 text-center">
          <p className="text-muted-foreground">해당하는 활동이 없습니다.</p>
        </Card>
      )}

      <div className="text-center">
        <Button variant="link" className="text-sm font-medium text-primary hover:underline" asChild>
          <a href="/dashboard/activities">
            모든 활동 보기
            <ArrowRight className="ml-1 h-4 w-4" />
          </a>
        </Button>
      </div>

      {/* 활동 상세 정보 다이얼로그 */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          {selectedActivity && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center">
                  <span className="mr-2">{getActivityIcon(selectedActivity.type)}</span>
                  {selectedActivity.title}
                </DialogTitle>
                <DialogDescription>
                  <div className="flex items-center justify-between">
                    <span>
                      {selectedActivity.date} {selectedActivity.time}
                    </span>
                    <Badge className="duo-badge bg-primary/10 text-primary border-0">+{selectedActivity.xp} XP</Badge>
                  </div>
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4 py-4">
                {selectedActivity.type === "lesson" && (
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">레슨 정보</h4>
                      <Card className="duo-card">
                        <CardContent className="p-4 space-y-3">
                          <div className="flex justify-between">
                            <span className="text-sm">레슨 이름</span>
                            <span className="font-medium">{selectedActivity.content.lessonName}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">학습 시간</span>
                            <span className="font-medium">{selectedActivity.duration}분</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">완료한 연습</span>
                            <span className="font-medium">
                              {selectedActivity.content.completedExercises}/{selectedActivity.content.totalExercises}
                            </span>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">정확도</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm">전체 정확도</span>
                          <span className="font-medium">{selectedActivity.content.accuracy}%</span>
                        </div>
                        <Progress value={selectedActivity.content.accuracy} className="h-2.5" />
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">어휘 학습</h4>
                      <div className="grid grid-cols-2 gap-3">
                        <Card className="duo-card">
                          <CardContent className="p-3 text-center">
                            <div className="text-2xl font-bold text-primary">{selectedActivity.content.newWords}</div>
                            <div className="text-xs text-muted-foreground">새로운 단어</div>
                          </CardContent>
                        </Card>
                        <Card className="duo-card">
                          <CardContent className="p-3 text-center">
                            <div className="text-2xl font-bold text-success">
                              {selectedActivity.content.masteredWords}
                            </div>
                            <div className="text-xs text-muted-foreground">마스터한 단어</div>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </div>
                )}

                {selectedActivity.type === "conversation" && (
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">대화 정보</h4>
                      <Card className="duo-card">
                        <CardContent className="p-4 space-y-3">
                          <div className="flex justify-between">
                            <span className="text-sm">대화 주제</span>
                            <span className="font-medium">{selectedActivity.content.topic}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">대화 시간</span>
                            <span className="font-medium">{selectedActivity.content.duration}분</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">대화 턴</span>
                            <span className="font-medium">{selectedActivity.content.turns}회</span>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-medium mb-2">대화 평가</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm">유창성</span>
                          <span className="font-medium">{selectedActivity.content.fluencyScore}%</span>
                        </div>
                        <Progress value={selectedActivity.content.fluencyScore} className="h-2.5" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm">정확성</span>
                          <span className="font-medium">{selectedActivity.content.accuracyScore}%</span>
                        </div>
                        <Progress value={selectedActivity.content.accuracyScore} className="h-2.5" />
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">새로 배운 표현</h4>
                      <Card className="duo-card">
                        <CardContent className="p-3 text-center">
                          <div className="text-2xl font-bold text-info">{selectedActivity.content.newExpressions}</div>
                          <div className="text-xs text-muted-foreground">새로운 표현</div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                )}

                {selectedActivity.type === "quiz" && (
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">퀴즈 정보</h4>
                      <Card className="duo-card">
                        <CardContent className="p-4 space-y-3">
                          <div className="flex justify-between">
                            <span className="text-sm">퀴즈 이름</span>
                            <span className="font-medium">{selectedActivity.content.quizName}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">소요 시간</span>
                            <span className="font-medium">{selectedActivity.content.timeSpent}분</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">정답률</span>
                            <span className="font-medium">
                              {selectedActivity.content.correctAnswers}/{selectedActivity.content.totalQuestions}
                            </span>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">정확도</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm">전체 정확도</span>
                          <span className="font-medium">{selectedActivity.content.accuracy}%</span>
                        </div>
                        <Progress value={selectedActivity.content.accuracy} className="h-2.5" />
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">어려웠던 부분</h4>
                      <Card className="duo-card">
                        <CardContent className="p-4">
                          <ul className="space-y-1 text-sm">
                            {selectedActivity.content.difficultWords
                              ? selectedActivity.content.difficultWords.map((word: string, index: number) => (
                                  <li key={index} className="flex items-center">
                                    <span className="text-warning mr-2">•</span>
                                    {word}
                                  </li>
                                ))
                              : selectedActivity.content.difficultTopics.map((topic: string, index: number) => (
                                  <li key={index} className="flex items-center">
                                    <span className="text-warning mr-2">•</span>
                                    {topic}
                                  </li>
                                ))}
                          </ul>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                )}

                {selectedActivity.type === "achievement" && (
                  <div className="space-y-4">
                    <div className="flex justify-center">
                      <div className="w-24 h-24 rounded-full bg-warning/20 flex items-center justify-center">
                        <Award className="h-12 w-12 text-warning" />
                      </div>
                    </div>

                    <div className="text-center">
                      <h3 className="font-bold text-lg">{selectedActivity.content.achievementName}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{selectedActivity.content.description}</p>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">연속 학습</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm">현재 스트릭</span>
                          <span className="font-medium">{selectedActivity.content.streakDays}일</span>
                        </div>
                        <Progress
                          value={(selectedActivity.content.streakDays / selectedActivity.content.nextMilestone) * 100}
                          className="h-2.5"
                        />
                        <div className="text-xs text-muted-foreground text-right">
                          다음 목표: {selectedActivity.content.nextMilestone}일
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">업적 진행 상황</h4>
                      <Card className="duo-card">
                        <CardContent className="p-4 space-y-3">
                          <div className="flex justify-between">
                            <span className="text-sm">완료한 업적</span>
                            <span className="font-medium">
                              {selectedActivity.content.completedAchievements}/
                              {selectedActivity.content.totalAchievements}
                            </span>
                          </div>
                          <Progress
                            value={
                              (selectedActivity.content.completedAchievements /
                                selectedActivity.content.totalAchievements) *
                              100
                            }
                            className="h-2.5"
                          />
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                )}

                <Button className="w-full duo-button bg-primary text-white mt-4" asChild>
                  <a href={`/activities/${selectedActivity.id}`}>
                    상세 활동 내역 보기
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
