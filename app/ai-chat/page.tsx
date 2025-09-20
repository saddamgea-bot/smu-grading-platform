"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MessageSquare, Send, Search, Bot, User, Database, BookOpen } from "lucide-react"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
  sources?: string[]
}

interface KnowledgeSource {
  id: string
  name: string
  type: "pdf" | "doc" | "rubric" | "syllabus"
  course: string
  lastUpdated: Date
  accessible: boolean
}

export default function AIChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content:
        "Hello! I'm your AI assistant for SMU grading and assessment. I can help you with rubric creation, grading questions, and accessing your course materials. What would you like to work on today?",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [selectedSources, setSelectedSources] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState("")

  const knowledgeSources: KnowledgeSource[] = [
    {
      id: "1",
      name: "Business Fundamentals Syllabus",
      type: "syllabus",
      course: "COR101",
      lastUpdated: new Date("2024-01-15"),
      accessible: true,
    },
    {
      id: "2",
      name: "Mid-term Rubric Template",
      type: "rubric",
      course: "COR101",
      lastUpdated: new Date("2024-02-01"),
      accessible: true,
    },
    {
      id: "3",
      name: "Financial Accounting Guidelines",
      type: "pdf",
      course: "ACC101",
      lastUpdated: new Date("2024-01-20"),
      accessible: true,
    },
    {
      id: "4",
      name: "Organizational Behavior Case Studies",
      type: "doc",
      course: "MGMT201",
      lastUpdated: new Date("2024-01-25"),
      accessible: true,
    },
    {
      id: "5",
      name: "Corporate Finance Rubric",
      type: "rubric",
      course: "FIN301",
      lastUpdated: new Date("2024-02-05"),
      accessible: false,
    },
  ]

  const filteredSources = knowledgeSources.filter(
    (source) =>
      source.accessible &&
      (searchQuery === "" ||
        source.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        source.course.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  const handleSendMessage = () => {
    if (!input.trim()) return

    const newMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    }

    setMessages([...messages, newMessage])
    setInput("")

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: `I understand you're asking about "${input}". Based on the selected sources${
          selectedSources.length > 0 ? ` (${selectedSources.length} documents)` : ""
        }, I can help you with that. Let me analyze the relevant information from your course materials.`,
        timestamp: new Date(),
        sources: selectedSources.length > 0 ? selectedSources : undefined,
      }
      setMessages((prev) => [...prev, aiResponse])
    }, 1000)
  }

  const toggleSource = (sourceId: string) => {
    setSelectedSources((prev) => (prev.includes(sourceId) ? prev.filter((id) => id !== sourceId) : [...prev, sourceId]))
  }

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight text-balance">AI Assistant</h1>
        <p className="text-muted-foreground text-lg">
          Get help with grading, rubrics, and course materials using AI with access to your knowledge base.
        </p>
        <div className="mt-4">
          <Button
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-8 py-3 text-lg"
            asChild
          >
            <a href="/ai-guidelines">
              <BookOpen className="mr-2 h-5 w-5" />
              Human AI Teaching Guidelines
            </a>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Knowledge Sources Panel */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              Knowledge Sources
            </CardTitle>
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search sources..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8"
              />
            </div>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[400px]">
              <div className="space-y-2">
                {filteredSources.map((source) => (
                  <div
                    key={source.id}
                    className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                      selectedSources.includes(source.id) ? "bg-primary/10 border-primary" : "hover:bg-muted"
                    }`}
                    onClick={() => toggleSource(source.id)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="text-sm font-medium">{source.name}</p>
                        <p className="text-xs text-muted-foreground">{source.course}</p>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {source.type}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
            <div className="mt-4 pt-4 border-t">
              <p className="text-xs text-muted-foreground">{selectedSources.length} sources selected</p>
            </div>
          </CardContent>
        </Card>

        {/* Chat Interface */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              AI Chat
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[400px] mb-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`flex gap-3 max-w-[80%] ${message.role === "user" ? "flex-row-reverse" : "flex-row"}`}
                    >
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                        }`}
                      >
                        {message.role === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                      </div>
                      <div
                        className={`rounded-lg p-3 ${
                          message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                        {message.sources && message.sources.length > 0 && (
                          <div className="mt-2 pt-2 border-t border-border/20">
                            <p className="text-xs opacity-70">Sources: {message.sources.length} documents</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <div className="flex gap-2">
              <Textarea
                placeholder="Ask about grading, rubrics, or course materials..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault()
                    handleSendMessage()
                  }
                }}
                className="min-h-[60px]"
              />
              <Button onClick={handleSendMessage} className="self-end">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
