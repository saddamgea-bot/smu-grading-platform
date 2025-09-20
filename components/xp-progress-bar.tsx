import { cn } from "@/lib/utils"
import { memo } from "react"

interface XPProgressBarProps {
  currentXP: number
  maxXP: number
  className?: string
}

// React.memo로 컴포넌트를 감싸 불필요한 리렌더링 방지
export const XPProgressBar = memo(function XPProgressBar({ currentXP, maxXP, className }: XPProgressBarProps) {
  const progress = Math.min(100, Math.round((currentXP / maxXP) * 100))

  return (
    <div className={cn("space-y-1", className)}>
      <div className="flex justify-between text-xs font-medium">
        <span>{currentXP} XP</span>
        <span>{maxXP} XP</span>
      </div>
      <div className="duo-progress">
        <div className="duo-progress-value" style={{ width: `${progress}%` }} />
      </div>
    </div>
  )
})
