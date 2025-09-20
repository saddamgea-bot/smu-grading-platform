"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, Tooltip } from "recharts"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Target, TrendingUp, ArrowRight, Info } from "lucide-react"

const skillsData = [
  { skill: "Essays", level: 6.8, maxLevel: 10, growth: 0.5 },
  { skill: "Quizzes", level: 7.5, maxLevel: 10, growth: 0.3 },
  { skill: "Case Studies", level: 8.2, maxLevel: 10, growth: 0.2 },
  { skill: "Presentations", level: 5.4, maxLevel: 10, growth: 0.7 },
  { skill: "Group Projects", level: 7.0, maxLevel: 10, growth: 0.4 },
  { skill: "Exams", level: 6.2, maxLevel: 10, growth: 0.6 },
]

const currentData = [
  { subject: "Essays", value: 68, fullMark: 100 },
  { subject: "Quizzes", value: 75, fullMark: 100 },
  { subject: "Case Studies", value: 82, fullMark: 100 },
  { subject: "Presentations", value: 54, fullMark: 100 },
  { subject: "Group Projects", value: 70, fullMark: 100 },
  { subject: "Exams", value: 62, fullMark: 100 },
]

const goalData = [
  { subject: "Essays", value: 80, fullMark: 100 },
  { subject: "Quizzes", value: 85, fullMark: 100 },
  { subject: "Case Studies", value: 90, fullMark: 100 },
  { subject: "Presentations", value: 75, fullMark: 100 },
  { subject: "Group Projects", value: 85, fullMark: 100 },
  { subject: "Exams", value: 80, fullMark: 100 },
]

const previousData = [
  { subject: "Essays", value: 60, fullMark: 100 },
  { subject: "Quizzes", value: 70, fullMark: 100 },
  { subject: "Case Studies", value: 78, fullMark: 100 },
  { subject: "Presentations", value: 45, fullMark: 100 },
  { subject: "Group Projects", value: 65, fullMark: 100 },
  { subject: "Exams", value: 55, fullMark: 100 },
]

export default function StrengthsWeaknesses() {
  const [selectedView, setSelectedView] = useState("current")
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const strengths = [...skillsData].sort((a, b) => b.level - a.level).slice(0, 2)
  const weaknesses = [...skillsData].sort((a, b) => a.level - b.level).slice(0, 2)

  const getSelectedSkillInfo = () => {
    return skillsData.find((skill) => skill.skill === selectedSkill)
  }

  const getChartData = () => {
    switch (selectedView) {
      case "current":
        return currentData
      case "goal":
        return [
          ...currentData.map((item) => ({ ...item, name: "Current" })),
          ...goalData.map((item) => ({ ...item, name: "Goal" })),
        ]
      case "progress":
        return [
          ...previousData.map((item) => ({ ...item, name: "Previous" })),
          ...currentData.map((item) => ({ ...item, name: "Current" })),
        ]
      default:
        return currentData
    }
  }

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border border-border p-3 rounded-lg shadow-md">
          <p className="font-bold mb-1">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm flex items-center">
              <span className="w-3 h-3 inline-block mr-2 rounded-full" style={{ backgroundColor: entry.color }}></span>
              {entry.name ? `${entry.name}: ${entry.value}%` : `${entry.value}%`}
            </p>
          ))}
        </div>
      )
    }
    return null
  }

  const handleSkillClick = (skill: string) => {
    setSelectedSkill(skill)
    setIsDialogOpen(true)
  }

  return (
    <div className="space-y-6">
      <Tabs value={selectedView} onValueChange={setSelectedView} className="w-full">
        <TabsList className="grid grid-cols-3 w-full">
          <TabsTrigger value="current" className="font-medium">
            Current Performance
          </TabsTrigger>
          <TabsTrigger value="goal" className="font-medium">
            Target Comparison
          </TabsTrigger>
          <TabsTrigger value="progress" className="font-medium">
            Progress Trends
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart
            cx="50%"
            cy="50%"
            outerRadius="80%"
            data={
              selectedView === "current"
                ? currentData
                : selectedView === "goal"
                  ? currentData.concat(goalData)
                  : previousData.concat(currentData)
            }
          >
            <PolarGrid stroke="hsl(var(--muted))" />
            <PolarAngleAxis
              dataKey="subject"
              tick={{ fill: "hsl(var(--foreground))" }}
              onClick={(data) => data && handleSkillClick(data.value)}
              style={{ cursor: "pointer" }}
            />
            <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: "hsl(var(--muted-foreground))" }} />

            {selectedView === "progress" && (
              <Radar
                name="Previous"
                dataKey="value"
                stroke="hsl(var(--muted-foreground))"
                fill="hsl(var(--muted-foreground))"
                fillOpacity={0.3}
                data={previousData}
              />
            )}

            <Radar
              name="Current"
              dataKey="value"
              stroke="hsl(var(--primary))"
              fill="hsl(var(--primary))"
              fillOpacity={0.3}
              data={currentData}
              animationDuration={1000}
              animationEasing="ease-in-out"
            />

            {selectedView === "goal" && (
              <Radar
                name="Goal"
                dataKey="value"
                stroke="hsl(var(--success))"
                fill="hsl(var(--success))"
                fillOpacity={0.3}
                data={goalData}
                strokeDasharray="5 5"
              />
            )}

            <Tooltip content={<CustomTooltip />} />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      <div className="text-center text-sm text-muted-foreground">
        <p>Click on each section of the chart to view detailed information.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="duo-card">
          <CardContent className="p-4">
            <h3 className="font-bold text-lg mb-3 flex items-center">
              <Target className="h-5 w-5 mr-2 text-success" />
              Strong Areas
            </h3>
            <div className="space-y-4">
              {strengths.map((skill) => (
                <div key={skill.skill} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Button
                      variant="link"
                      className="font-medium p-0 h-auto text-foreground hover:text-primary"
                      onClick={() => handleSkillClick(skill.skill)}
                    >
                      {skill.skill}
                    </Button>
                    <span className="text-sm font-bold text-success">
                      {skill.level.toFixed(1)}/{skill.maxLevel}
                    </span>
                  </div>
                  <Progress value={(skill.level / skill.maxLevel) * 100} className="h-2 bg-muted" />
                  <div className="flex justify-between items-center text-xs">
                    <p className="text-muted-foreground">{getSkillDescription(skill.skill, true)}</p>
                    <span className="text-success flex items-center">
                      <TrendingUp className="h-3 w-3 mr-1" />+{skill.growth.toFixed(1)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="duo-card">
          <CardContent className="p-4">
            <h3 className="font-bold text-lg mb-3 flex items-center">
              <Info className="h-5 w-5 mr-2 text-warning" />
              Areas for Improvement
            </h3>
            <div className="space-y-4">
              {weaknesses.map((skill) => (
                <div key={skill.skill} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Button
                      variant="link"
                      className="font-medium p-0 h-auto text-foreground hover:text-primary"
                      onClick={() => handleSkillClick(skill.skill)}
                    >
                      {skill.skill}
                    </Button>
                    <span className="text-sm font-bold text-warning">
                      {skill.level.toFixed(1)}/{skill.maxLevel}
                    </span>
                  </div>
                  <Progress value={(skill.level / skill.maxLevel) * 100} className="h-2 bg-muted" />
                  <div className="flex justify-between items-center text-xs">
                    <p className="text-muted-foreground">{getSkillDescription(skill.skill, false)}</p>
                    <span className="text-warning flex items-center">
                      <TrendingUp className="h-3 w-3 mr-1" />+{skill.growth.toFixed(1)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 스킬 상세 정보 다이얼로그 */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{selectedSkill} Performance Details</DialogTitle>
            <DialogDescription>Details on current level and improvement strategies.</DialogDescription>
          </DialogHeader>

          {selectedSkill && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Current Level</span>
                  <span className="font-bold">
                    {getSelectedSkillInfo()?.level.toFixed(1)}/{getSelectedSkillInfo()?.maxLevel}
                  </span>
                </div>
                <Progress
                  value={((getSelectedSkillInfo()?.level || 0) / (getSelectedSkillInfo()?.maxLevel || 1)) * 100}
                  className="h-2.5 bg-muted"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Target Level</span>
                  <span className="font-bold text-success">
                    {Math.min(10, (getSelectedSkillInfo()?.level || 0) + 1).toFixed(1)}/10
                  </span>
                </div>
                <Progress
                  value={Math.min(100, (((getSelectedSkillInfo()?.level || 0) + 1) / 10) * 100)}
                  className="h-2.5 bg-muted"
                />
              </div>

              <div className="bg-muted p-4 rounded-lg space-y-3">
                <h4 className="font-medium">Improvement Strategies</h4>
                <ul className="space-y-2 text-sm">
                  {getSkillImprovementTips(selectedSkill).map((tip, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Recent 30-Day Growth Rate</span>
                <span className="font-medium text-success flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1" />+{getSelectedSkillInfo()?.growth.toFixed(1)} Points
                </span>
              </div>

              <Button className="w-full duo-button bg-primary text-white" asChild>
                <a href={`/skills/${selectedSkill.toLowerCase()}`}>
                  {selectedSkill} Improvement Course
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

function getSkillDescription(skill: string, isStrength: boolean): string {
  if (isStrength) {
    switch (skill) {
      case "Essays":
        return "Students demonstrate strong analytical and writing skills."
      case "Quizzes":
        return "Consistent performance on knowledge-based assessments."
      case "Case Studies":
        return "Excellent application of theoretical concepts to real scenarios."
      case "Presentations":
        return "Strong communication and presentation abilities."
      case "Group Projects":
        return "Effective collaboration and project management skills."
      case "Exams":
        return "Solid understanding of course material under pressure."
      default:
        return "Strong performance in this assessment type."
    }
  } else {
    switch (skill) {
      case "Essays":
        return "Students need more practice with analytical writing."
      case "Quizzes":
        return "Review of fundamental concepts may be needed."
      case "Case Studies":
        return "More practice applying theory to practical situations."
      case "Presentations":
        return "Students could benefit from presentation skills training."
      case "Group Projects":
        return "Collaboration and teamwork skills need development."
      case "Exams":
        return "Test-taking strategies and time management need work."
      default:
        return "This area requires additional attention and practice."
    }
  }
}

function getSkillImprovementTips(skill: string): string[] {
  switch (skill) {
    case "Essays":
      return [
        "Provide more detailed rubrics with clear expectations.",
        "Offer writing workshops and peer review sessions.",
        "Give specific feedback on structure and argumentation.",
        "Encourage use of writing center resources.",
      ]
    case "Quizzes":
      return [
        "Review quiz questions for clarity and fairness.",
        "Provide study guides before assessments.",
        "Consider offering practice quizzes.",
        "Analyze common wrong answers to identify knowledge gaps.",
      ]
    case "Case Studies":
      return [
        "Provide more scaffolding for case analysis.",
        "Offer examples of strong case study responses.",
        "Break down complex cases into smaller components.",
        "Encourage group discussion before individual work.",
      ]
    case "Presentations":
      return [
        "Provide presentation skills training sessions.",
        "Offer practice opportunities with feedback.",
        "Create clear rubrics for presentation assessment.",
        "Encourage use of visual aids and technology.",
      ]
    case "Group Projects":
      return [
        "Provide guidelines for effective teamwork.",
        "Implement peer evaluation systems.",
        "Offer conflict resolution resources.",
        "Consider assigning roles within groups.",
      ]
    case "Exams":
      return [
        "Review exam format and question types.",
        "Provide study strategies and time management tips.",
        "Offer review sessions before major exams.",
        "Consider alternative assessment formats.",
      ]
    default:
      return [
        "Analyze student performance data regularly.",
        "Seek feedback from students on assessment methods.",
        "Consider professional development opportunities.",
        "Collaborate with colleagues on best practices.",
      ]
  }
}
