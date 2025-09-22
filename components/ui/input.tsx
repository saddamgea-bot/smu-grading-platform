"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Paperclip, Upload, Database, FileText, ImageIcon, File, X, Search } from "lucide-react"

interface InputProps extends React.ComponentProps<"input"> {
  showAttachment?: boolean
  onAttachmentSelect?: (files: File[], sources: string[]) => void
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, showAttachment = false, onAttachmentSelect, ...props }, ref) => {
    const [showAttachmentDialog, setShowAttachmentDialog] = React.useState(false)
    const [selectedFiles, setSelectedFiles] = React.useState<File[]>([])
    const [selectedSources, setSelectedSources] = React.useState<string[]>([])
    const [searchQuery, setSearchQuery] = React.useState("")
    const fileInputRef = React.useRef<HTMLInputElement>(null)

    // Mock knowledge sources data
    const knowledgeSources = [
      { id: "1", name: "Course Syllabus", type: "PDF", course: "COR101", size: "2.3 MB" },
      { id: "2", name: "Lecture Notes - Week 1", type: "PDF", course: "COR101", size: "1.8 MB" },
      { id: "3", name: "Assignment Guidelines", type: "DOCX", course: "COR101", size: "0.5 MB" },
      { id: "4", name: "Research Paper Template", type: "DOCX", course: "COR101", size: "0.3 MB" },
      { id: "5", name: "Grading Rubric", type: "PDF", course: "COR101", size: "0.8 MB" },
    ]

    const filteredSources = knowledgeSources.filter(
      (source) =>
        source.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        source.course.toLowerCase().includes(searchQuery.toLowerCase()),
    )

    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(event.target.files || [])
      setSelectedFiles((prev) => [...prev, ...files])
    }

    const handleSourceToggle = (sourceId: string) => {
      setSelectedSources((prev) =>
        prev.includes(sourceId) ? prev.filter((id) => id !== sourceId) : [...prev, sourceId],
      )
    }

    const handleAttach = () => {
      onAttachmentSelect?.(selectedFiles, selectedSources)
      setShowAttachmentDialog(false)
      setSelectedFiles([])
      setSelectedSources([])
    }

    const getFileIcon = (type: string) => {
      switch (type.toLowerCase()) {
        case "pdf":
          return <FileText className="h-4 w-4 text-red-500" />
        case "docx":
        case "doc":
          return <FileText className="h-4 w-4 text-blue-500" />
        case "jpg":
        case "jpeg":
        case "png":
        case "gif":
          return <ImageIcon className="h-4 w-4 text-green-500" />
        default:
          return <File className="h-4 w-4 text-gray-500" />
      }
    }

    if (!showAttachment) {
      return (
        <input
          type={type}
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            className,
          )}
          ref={ref}
          {...props}
        />
      )
    }

    return (
      <div className="relative">
        <div className="flex items-center">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute left-1 z-10 h-8 w-8 p-0"
            onClick={() => setShowAttachmentDialog(true)}
          >
            <Paperclip className="h-4 w-4" />
          </Button>
          <input
            type={type}
            className={cn(
              "flex h-10 w-full rounded-md border border-input bg-background pl-10 pr-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
              className,
            )}
            ref={ref}
            {...props}
          />
        </div>

        <Dialog open={showAttachmentDialog} onOpenChange={setShowAttachmentDialog}>
          <DialogContent className="max-w-4xl max-h-[80vh]">
            <DialogHeader>
              <DialogTitle>Add Attachments</DialogTitle>
            </DialogHeader>

            <Tabs defaultValue="files" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="files">Upload Files</TabsTrigger>
                <TabsTrigger value="knowledge">Knowledge Base</TabsTrigger>
              </TabsList>

              <TabsContent value="files" className="space-y-4">
                <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-lg">
                  <Upload className="h-8 w-8 mb-2 text-muted-foreground" />
                  <p className="text-sm font-medium">Upload Files</p>
                  <p className="text-xs text-muted-foreground mb-4">Drag and drop or click to browse</p>
                  <Button onClick={() => fileInputRef.current?.click()}>Choose Files</Button>
                  <input ref={fileInputRef} type="file" multiple className="hidden" onChange={handleFileSelect} />
                </div>

                {selectedFiles.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Selected Files:</h4>
                    {selectedFiles.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-muted rounded">
                        <div className="flex items-center gap-2">
                          {getFileIcon(file.name.split(".").pop() || "")}
                          <span className="text-sm">{file.name}</span>
                          <Badge variant="secondary">{(file.size / 1024 / 1024).toFixed(1)} MB</Badge>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedFiles((prev) => prev.filter((_, i) => i !== index))}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="knowledge" className="space-y-4">
                <div className="flex items-center gap-2">
                  <Search className="h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search knowledge base..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1 px-3 py-2 border rounded-md"
                  />
                </div>

                <ScrollArea className="h-[300px]">
                  <div className="space-y-2">
                    {filteredSources.length === 0 ? (
                      <div className="text-center py-8 text-muted-foreground">
                        <Database className="h-8 w-8 mx-auto mb-2" />
                        <p>No knowledge sources found</p>
                      </div>
                    ) : (
                      filteredSources.map((source) => (
                        <div
                          key={source.id}
                          className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                            selectedSources.includes(source.id) ? "bg-primary/10 border-primary" : "hover:bg-muted"
                          }`}
                          onClick={() => handleSourceToggle(source.id)}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              {getFileIcon(source.type)}
                              <div>
                                <p className="font-medium text-sm">{source.name}</p>
                                <p className="text-xs text-muted-foreground">
                                  {source.course} • {source.size}
                                </p>
                              </div>
                            </div>
                            <Badge variant={source.type === "PDF" ? "destructive" : "secondary"}>{source.type}</Badge>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </ScrollArea>
              </TabsContent>
            </Tabs>

            <div className="flex justify-between items-center pt-4 border-t">
              <div className="text-sm text-muted-foreground">
                {selectedFiles.length} files, {selectedSources.length} sources selected
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setShowAttachmentDialog(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAttach}>Attach ({selectedFiles.length + selectedSources.length})</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    )
  },
)
Input.displayName = "Input"

export { Input }
