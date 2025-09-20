"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Trophy } from "lucide-react"
import Link from "next/link"
import { XPProgressBar } from "./xp-progress-bar"

export default function LevelProgress() {
  const currentLevel = 3
  const currentXP = 720
  const nextLevelXP = 1000

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-3">
            <Trophy className="h-6 w-6 text-primary" />
          </div>
          <div>
            <div className="text-2xl font-bold">Level {currentLevel}</div>
            <div className="text-sm text-muted-foreground">Grading Expert</div>
          </div>
        </div>
        <Button variant="ghost" size="sm" className="text-primary font-bold" asChild>
          <Link href="/rewards">
            <span className="sr-only md:not-sr-only md:inline-block">View Details</span>
            <ArrowRight className="h-4 w-4 md:ml-1" />
          </Link>
        </Button>
      </div>

      <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-xl p-4">
        <div className="font-bold mb-2">Progress to Next Level</div>
        <XPProgressBar currentXP={currentXP} maxXP={nextLevelXP} />
      </div>

      <div className="bg-muted rounded-xl p-4 text-sm">
        <div className="font-bold mb-2">Recent XP Earned</div>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span>Completed Cost Analysis Grading</span>
            <span className="font-bold text-primary">+50 XP</span>
          </div>
          <div className="flex justify-between items-center">
            <span>Used AI Rubric Assistant</span>
            <span className="font-bold text-primary">+30 XP</span>
          </div>
          <div className="flex justify-between items-center">
            <span>3 Days Consecutive Grading</span>
            <span className="font-bold text-primary">+20 XP</span>
          </div>
        </div>
      </div>

      <Button className="w-full duo-button bg-primary text-white" asChild>
        <Link href="/courses">
          Continue Grading
          <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </Button>
    </div>
  )
}
