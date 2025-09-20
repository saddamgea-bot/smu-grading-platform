"use client"

import { useState } from "react"
import { Check, Clock, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { DuoCharacter } from "@/components/duo-character"

export default function DailyQuest() {
  // 실제 앱에서는 API에서 데이터를 가져옵니다
  const [quests, setQuests] = useState([
    {
      id: 1,
      title: "오늘의 레슨 완료하기",
      completed: false,
      progress: 0,
      total: 1,
      link: "/courses/beginner/1",
      xp: 20,
    },
    { id: 2, title: "5개 단어 학습하기", completed: false, progress: 2, total: 5, link: "/vocabulary", xp: 15 },
    { id: 3, title: "대화 연습 1회 진행하기", completed: true, progress: 1, total: 1, link: "/conversation", xp: 10 },
  ])

  const [showCelebration, setShowCelebration] = useState(false)
  const [showAllCompletedMessage, setShowAllCompletedMessage] = useState(false)

  const completeQuest = (id: number) => {
    const updatedQuests = quests.map((quest) =>
      quest.id === id ? { ...quest, completed: true, progress: quest.total } : quest,
    )
    setQuests(updatedQuests)
    setShowCelebration(true)

    // 모든 퀘스트가 완료되었는지 확인
    const allCompleted = updatedQuests.every((quest) => quest.completed)
    if (allCompleted) {
      // 모든 퀘스트 완료 시 특별 메시지 표시
      setTimeout(() => {
        setShowCelebration(false)
        setShowAllCompletedMessage(true)
        setTimeout(() => setShowAllCompletedMessage(false), 2000)
      }, 1500)
    } else {
      setTimeout(() => setShowCelebration(false), 1500)
    }
  }

  const completedCount = quests.filter((q) => q.completed).length
  const totalQuests = quests.length
  const overallProgress = Math.round((completedCount / totalQuests) * 100)

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-2">
        <div>
          <div className="text-sm text-muted-foreground mb-1">전체 진행률</div>
          <div className="font-bold">
            {completedCount}/{totalQuests} 완료
          </div>
        </div>
        <div className="text-sm font-bold">{overallProgress}%</div>
      </div>

      <div className="duo-progress">
        <div className="duo-progress-value" style={{ width: `${overallProgress}%` }} />
      </div>

      <div className="space-y-3 mt-4">
        {quests.map((quest) => (
          <div key={quest.id} className="flex items-center justify-between p-4 rounded-xl border-2 bg-card">
            <div className="flex-1 mr-4">
              <div className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                    quest.completed ? "bg-success/20" : "bg-primary/10"
                  }`}
                >
                  {quest.completed ? (
                    <Check className="h-4 w-4 text-success" />
                  ) : (
                    <Clock className="h-4 w-4 text-primary" />
                  )}
                </div>
                <div className="font-bold">{quest.title}</div>
              </div>

              <div className="ml-11 mt-2">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-muted-foreground">진행률</span>
                  <span className="font-medium">
                    {quest.progress}/{quest.total}
                  </span>
                </div>
                <div className="duo-progress">
                  <div className="duo-progress-value" style={{ width: `${(quest.progress / quest.total) * 100}%` }} />
                </div>
              </div>
            </div>

            <div className="flex flex-col items-end">
              <div className="text-sm font-bold text-primary mb-2">+{quest.xp} XP</div>
              <Button
                variant={quest.completed ? "ghost" : "default"}
                size="sm"
                className={quest.completed ? "text-success" : "duo-button bg-primary text-white"}
                asChild={quest.completed}
                onClick={quest.completed ? undefined : () => completeQuest(quest.id)}
              >
                {quest.completed ? (
                  <Link href={quest.link}>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                ) : (
                  "완료"
                )}
              </Button>
            </div>
          </div>
        ))}
      </div>

      {showCelebration && (
        <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
          <div className="bg-white/80 dark:bg-black/80 p-8 rounded-2xl flex flex-col items-center animate-scale-in">
            <DuoCharacter mood="excited" size="xl" animation="celebrate" />
            <div className="mt-4 text-2xl font-bold">축하합니다!</div>
            <div className="text-primary font-bold">+XP 획득!</div>
          </div>
        </div>
      )}
      {showAllCompletedMessage && (
        <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
          <div className="bg-white/80 dark:bg-black/80 p-8 rounded-2xl flex flex-col items-center animate-scale-in">
            <DuoCharacter mood="excited" size="xl" animation="celebrate" />
            <div className="mt-4 text-2xl font-bold">모든 퀘스트 완료!</div>
            <div className="text-primary font-bold">오늘의 목표를 달성했습니다!</div>
          </div>
        </div>
      )}
    </div>
  )
}
