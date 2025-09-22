"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import {
  MessageSquare,
  Send,
  Bot,
  User,
  Database,
  BookOpen,
  Paperclip,
  Plus,
  Trash2,
  ImageIcon,
  FileText,
  Upload,
  X,
} from "lucide-react"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
  sources?: string[]
  attachments?: Attachment[]
}

interface Attachment {
  id: string
  name: string
  type: "image" | "pdf" | "document" | "knowledge"
  size?: string
  url?: string
}

interface ChatSession {
  id: string
  title: string
  messages: Message[]
  lastUpdated: Date
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
  const [chatSessions, setChatSessions] = useState<ChatSession[]>([
    {
      id: "1",
      title: "Grading Help",
      lastUpdated: new Date(),
      messages: [
        {
          id: "1",
          role: "assistant",
          content:
            "Hello! I'm your AI assistant for SMU grading and assessment. I can help you with rubric creation, grading questions, and accessing your course materials. What would you like to work on today?",
          timestamp: new Date(),
        },
      ],
    },
  ])

  const [currentSessionId, setCurrentSessionId] = useState("1")
  const [input, setInput] = useState("")
  const [selectedSources, setSelectedSources] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [attachments, setAttachments] = useState<Attachment[]>([])
  const [showAttachmentDialog, setShowAttachmentDialog] = useState(false)
  const [showKnowledgeBaseDialog, setShowKnowledgeBaseDialog] = useState(false)
  const [knowledgeSearchQuery, setKnowledgeSearchQuery] = useState("")

  const currentSession = chatSessions.find((s) => s.id === currentSessionId)
  const messages = currentSession?.messages || []

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

  const filteredKnowledgeBaseSources = knowledgeSources.filter(
    (source) =>
      source.accessible &&
      (knowledgeSearchQuery === "" ||
        source.name.toLowerCase().includes(knowledgeSearchQuery.toLowerCase()) ||
        source.course.toLowerCase().includes(knowledgeSearchQuery.toLowerCase())),
  )

  const createNewChat = () => {
    const newSession: ChatSession = {
      id: Date.now().toString(),
      title: "New Chat",
      lastUpdated: new Date(),
      messages: [
        {
          id: "1",
          role: "assistant",
          content: "Hello! I'm your AI assistant for SMU grading and assessment. How can I help you today?",
          timestamp: new Date(),
        },
      ],
    }
    setChatSessions([newSession, ...chatSessions])
    setCurrentSessionId(newSession.id)
  }

  const deleteChat = (sessionId: string) => {
    if (chatSessions.length <= 1) return // Keep at least one chat

    const updatedSessions = chatSessions.filter((s) => s.id !== sessionId)
    setChatSessions(updatedSessions)

    if (currentSessionId === sessionId) {
      setCurrentSessionId(updatedSessions[0].id)
    }
  }

  const handleSendMessage = () => {
    if (!input.trim() && attachments.length === 0) return

    const newMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
      attachments: attachments.length > 0 ? [...attachments] : undefined,
    }

    const updatedSessions = chatSessions.map((session) => {
      if (session.id === currentSessionId) {
        return {
          ...session,
          messages: [...session.messages, newMessage],
          lastUpdated: new Date(),
          title: session.messages.length === 1 ? input.slice(0, 30) + "..." : session.title,
        }
      }
      return session
    })

    setChatSessions(updatedSessions)
    setInput("")
    setAttachments([])

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: `I understand you're asking about "${input}". Based on the selected sources${
          selectedSources.length > 0 ? ` (${selectedSources.length} documents)` : ""
        }${attachments.length > 0 ? ` and ${attachments.length} attachment(s)` : ""}, I can help you with that. Let me analyze the relevant information from your course materials.`,
        timestamp: new Date(),
        sources: selectedSources.length > 0 ? selectedSources : undefined,
      }

      const finalUpdatedSessions = chatSessions.map((session) => {
        if (session.id === currentSessionId) {
          return {
            ...session,
            messages: [...session.messages, newMessage, aiResponse],
            lastUpdated: new Date(),
          }
        }
        return session
      })
      setChatSessions(finalUpdatedSessions)
    }, 1000)
  }

  const toggleSource = (sourceId: string) => {
    setSelectedSources((prev) => (prev.includes(sourceId) ? prev.filter((id) => id !== sourceId) : [...prev, sourceId]))
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files) return

    Array.from(files).forEach((file) => {
      const attachment: Attachment = {
        id: Date.now().toString() + Math.random(),
        name: file.name,
        type: file.type.startsWith("image/") ? "image" : file.type === "application/pdf" ? "pdf" : "document",
        size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
      }
      setAttachments((prev) => [...prev, attachment])
    })
    setShowAttachmentDialog(false)
  }

  const addKnowledgeSource = (sourceId: string) => {
    const source = knowledgeSources.find((s) => s.id === sourceId)
    if (!source) return

    const attachment: Attachment = {
      id: sourceId,
      name: source.name,
      type: "knowledge",
      size: source.course,
    }
    setAttachments((prev) => [...prev, attachment])
    setShowKnowledgeBaseDialog(false)
  }

  const removeAttachment = (attachmentId: string) => {
    setAttachments((prev) => prev.filter((a) => a.id !== attachmentId))
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
        <Card className="lg:col-span-1">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Chat History</CardTitle>
              <Button size="sm" variant="outline" onClick={createNewChat}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[500px]">
              <div className="space-y-2">
                {chatSessions.map((session) => (
                  <div
                    key={session.id}
                    className={`p-3 rounded-lg border cursor-pointer transition-colors group ${
                      currentSessionId === session.id ? "bg-primary/10 border-primary" : "hover:bg-muted"
                    }`}
                    onClick={() => setCurrentSessionId(session.id)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{session.title}</p>
                        <p className="text-xs text-muted-foreground">{session.lastUpdated.toLocaleDateString()}</p>
                      </div>
                      {chatSessions.length > 1 && (
                        <Button
                          size="sm"
                          variant="ghost"
                          className="opacity-0 group-hover:opacity-100 h-6 w-6 p-0"
                          onClick={(e) => {
                            e.stopPropagation()
                            deleteChat(session.id)
                          }}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Chat Interface */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              AI Chat - {currentSession?.title}
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
                        {message.attachments && message.attachments.length > 0 && (
                          <div className="mt-2 pt-2 border-t border-border/20">
                            <div className="flex flex-wrap gap-1">
                              {message.attachments.map((attachment) => (
                                <Badge key={attachment.id} variant="secondary" className="text-xs">
                                  {attachment.type === "image" && <ImageIcon className="h-3 w-3 mr-1" />}
                                  {attachment.type === "pdf" && <FileText className="h-3 w-3 mr-1" />}
                                  {attachment.type === "knowledge" && <Database className="h-3 w-3 mr-1" />}
                                  {attachment.name}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
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

            {attachments.length > 0 && (
              <div className="mb-4 p-3 bg-muted rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Paperclip className="h-4 w-4" />
                  <span className="text-sm font-medium">Attachments ({attachments.length})</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {attachments.map((attachment) => (
                    <div key={attachment.id} className="flex items-center gap-2 bg-background rounded px-2 py-1">
                      {attachment.type === "image" && <ImageIcon className="h-4 w-4" />}
                      {attachment.type === "pdf" && <FileText className="h-4 w-4" />}
                      {attachment.type === "knowledge" && <Database className="h-4 w-4" />}
                      <span className="text-sm">{attachment.name}</span>
                      {attachment.size && <span className="text-xs text-muted-foreground">({attachment.size})</span>}
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-4 w-4 p-0"
                        onClick={() => removeAttachment(attachment.id)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex gap-2">
              <Dialog open={showAttachmentDialog} onOpenChange={setShowAttachmentDialog}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="icon" className="self-end bg-transparent">
                    <Paperclip className="h-4 w-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Add Attachments</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="file-upload" className="cursor-pointer">
                          <div className="flex flex-col items-center p-6 border-2 border-dashed rounded-lg hover:bg-muted transition-colors">
                            <Upload className="h-8 w-8 mb-2" />
                            <span className="text-sm font-medium">Upload Files</span>
                            <span className="text-xs text-muted-foreground">Images, PDFs, Documents</span>
                          </div>
                        </label>
                        <input
                          id="file-upload"
                          type="file"
                          multiple
                          accept="image/*,.pdf,.doc,.docx,.txt"
                          onChange={handleFileUpload}
                          className="hidden"
                        />
                      </div>
                      <div
                        className="flex flex-col items-center p-6 border-2 border-dashed rounded-lg hover:bg-muted transition-colors cursor-pointer"
                        onClick={() => setShowKnowledgeBaseDialog(true)}
                      >
                        <Database className="h-8 w-8 mb-2" />
                        <span className="text-sm font-medium">Knowledge Sources</span>
                        <span className="text-xs text-muted-foreground">Course Materials</span>
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h4 className="text-sm font-medium mb-2">Available Knowledge Sources</h4>
                      <ScrollArea className="h-32">
                        <div className="space-y-1">
                          {filteredSources.map((source) => (
                            <div
                              key={source.id}
                              className="flex items-center justify-between p-2 rounded hover:bg-muted cursor-pointer"
                              onClick={() => addKnowledgeSource(source.id)}
                            >
                              <div>
                                <p className="text-sm">{source.name}</p>
                                <p className="text-xs text-muted-foreground">{source.course}</p>
                              </div>
                              <Badge variant="outline" className="text-xs">
                                {source.type}
                              </Badge>
                            </div>
                          ))}
                        </div>
                      </ScrollArea>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>

              <Dialog open={showKnowledgeBaseDialog} onOpenChange={setShowKnowledgeBaseDialog}>
                <DialogContent className="sm:max-w-4xl max-h-[80vh]">
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                      <Database className="h-5 w-5" />
                      Knowledge Base - Course Materials
                    </DialogTitle>
                  </DialogHeader>
                  <div className="mb-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search knowledge base..."
                        value={knowledgeSearchQuery}
                        onChange={(e) => setKnowledgeSearchQuery(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <ScrollArea className="h-[60vh]">
                    <div className="space-y-6">
                      {filteredKnowledgeBaseSources.length === 0 ? (
                        <div className="text-center py-8">
                          <Database className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                          <p className="text-muted-foreground">
                            {knowledgeSearchQuery
                              ? "No materials found matching your search."
                              : "No accessible materials found."}
                          </p>
                        </div>
                      ) : (
                        Array.from(new Set(filteredKnowledgeBaseSources.map((s) => s.course))).map((course) => (
                          <div key={course} className="space-y-3">
                            <div className="flex items-center gap-2">
                              <BookOpen className="h-4 w-4" />
                              <h3 className="text-lg font-semibold">{course}</h3>
                              <Badge variant="secondary">
                                {filteredKnowledgeBaseSources.filter((s) => s.course === course).length} materials
                              </Badge>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              {filteredKnowledgeBaseSources
                                .filter((source) => source.course === course)
                                .map((source) => (
                                  <div
                                    key={source.id}
                                    className={`p-4 rounded-lg border transition-colors ${
                                      source.accessible
                                        ? "hover:bg-muted cursor-pointer"
                                        : "opacity-50 cursor-not-allowed bg-muted/50"
                                    }`}
                                    onClick={() => {
                                      if (source.accessible) {
                                        addKnowledgeSource(source.id)
                                        setShowKnowledgeBaseDialog(false)
                                      }
                                    }}
                                  >
                                    <div className="flex items-start justify-between">
                                      <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-2">
                                          {source.type === "pdf" && <FileText className="h-4 w-4 text-red-500" />}
                                          {source.type === "doc" && <FileText className="h-4 w-4 text-blue-500" />}
                                          {source.type === "rubric" && <Database className="h-4 w-4 text-green-500" />}
                                          {source.type === "syllabus" && (
                                            <BookOpen className="h-4 w-4 text-purple-500" />
                                          )}
                                          <Badge variant="outline" className="text-xs">
                                            {source.type}
                                          </Badge>
                                        </div>
                                        <h4 className="font-medium text-sm mb-1">{source.name}</h4>
                                        <p className="text-xs text-muted-foreground">
                                          Last updated: {source.lastUpdated.toLocaleDateString()}
                                        </p>
                                        {!source.accessible && (
                                          <p className="text-xs text-red-500 mt-1">Access restricted</p>
                                        )}
                                      </div>
                                      {source.accessible && (
                                        <Button
                                          size="sm"
                                          variant="ghost"
                                          className="h-8 w-8 p-0"
                                          onClick={(e) => {
                                            e.stopPropagation()
                                            addKnowledgeSource(source.id)
                                            setShowKnowledgeBaseDialog(false)
                                          }}
                                        >
                                          <Plus className="h-4 w-4" />
                                        </Button>
                                      )}
                                    </div>
                                  </div>
                                ))}
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </ScrollArea>
                  <div className="flex justify-end pt-4 border-t">
                    <Button variant="outline" onClick={() => setShowKnowledgeBaseDialog(false)}>
                      Close
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>

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
