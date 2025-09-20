"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { X, Bot, CheckCircle } from "lucide-react"

interface SmartCorrectionNotificationProps {
  isVisible: boolean
  onClose: () => void
  correctionType: string
  onApplyToSimilar: () => void
  onJustThisOne: () => void
}

export function SmartCorrectionNotification({
  isVisible,
  onClose,
  correctionType,
  onApplyToSimilar,
  onJustThisOne,
}: SmartCorrectionNotificationProps) {
  if (!isVisible) return null

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 animate-in slide-in-from-bottom-2">
      <Card className="academic-card shadow-lg border-primary/20 bg-primary/5">
        <CardContent className="p-4 bg-input text-border">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                <Bot className="h-4 w-4 text-primary" />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="text-sm font-medium">Correction noted.</span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                Would you like to automatically apply this type of {correctionType} correction to other similar AI
                errors in this batch?
              </p>
              <div className="flex items-center space-x-2 mt-3">
                <Button
                  size="sm"
                  onClick={onApplyToSimilar}
                  className="academic-button bg-primary text-primary-foreground"
                >
                  Yes, Auto-Correct Similar
                </Button>
                <Button size="sm" variant="outline" onClick={onJustThisOne} className="academic-button bg-transparent">
                  No, Just This One
                </Button>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose} className="flex-shrink-0 h-6 w-6 p-0">
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
