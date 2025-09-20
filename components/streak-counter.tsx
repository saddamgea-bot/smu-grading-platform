import { Flame } from "lucide-react"
import { cn } from "@/lib/utils"
import { memo } from "react"

interface StreakCounterProps {
  days: number
  className?: string
}

// React.memo로 컴포넌트를 감싸 불필요한 리렌더링 방지
export const StreakCounter = memo(function StreakCounter({ days, className }: StreakCounterProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-warning/20">
        <Flame className="w-6 h-6 text-warning" />
      </div>
      <div>
        <div className="text-sm font-medium text-muted-foreground">연속 학습</div>
        <div className="font-bold">{days}일</div>
      </div>
    </div>
  )
})
