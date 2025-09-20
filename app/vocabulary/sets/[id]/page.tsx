"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Play, RotateCcw, CheckCircle, XCircle } from "lucide-react"
import Link from "next/link"

interface VocabularyWord {
  id: string
  word: string
  definition: string
  example: string
  difficulty: "easy" | "medium" | "hard"
  mastered: boolean
}

interface VocabularySet {
  id: string
  title: string
  description: string
  words: VocabularyWord[]
  progress: number
}

export default function VocabularySetPage() {
  const params = useParams()
  const setId = params.id as string

  const [vocabularySet, setVocabularySet] = useState<VocabularySet | null>(null)
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [showDefinition, setShowDefinition] = useState(false)
  const [studyMode, setStudyMode] = useState<"review" | "practice">("review")

  useEffect(() => {
    // Mock data - replace with actual API call
    const mockSet: VocabularySet = {
      id: setId,
      title: "Business English Essentials",
      description: "Key vocabulary for business communication and presentations",
      progress: 65,
      words: [
        {
          id: "1",
          word: "Synergy",
          definition:
            "The interaction of elements that when combined produce a total effect greater than the sum of the individual elements",
          example: "The synergy between our marketing and sales teams led to a 40% increase in revenue.",
          difficulty: "medium",
          mastered: true,
        },
        {
          id: "2",
          word: "Paradigm",
          definition: "A typical example or pattern of something; a model",
          example: "The new management approach represents a paradigm shift in how we handle customer relations.",
          difficulty: "hard",
          mastered: false,
        },
        {
          id: "3",
          word: "Leverage",
          definition: "Use something to maximum advantage",
          example: "We need to leverage our existing customer base to expand into new markets.",
          difficulty: "medium",
          mastered: false,
        },
        {
          id: "4",
          word: "Stakeholder",
          definition: "A person with an interest or concern in something, especially a business",
          example: "All stakeholders must be consulted before making this strategic decision.",
          difficulty: "easy",
          mastered: true,
        },
      ],
    }
    setVocabularySet(mockSet)
  }, [setId])

  const handleNextWord = () => {
    if (vocabularySet && currentWordIndex < vocabularySet.words.length - 1) {
      setCurrentWordIndex(currentWordIndex + 1)
      setShowDefinition(false)
    }
  }

  const handlePreviousWord = () => {
    if (currentWordIndex > 0) {
      setCurrentWordIndex(currentWordIndex - 1)
      setShowDefinition(false)
    }
  }

  const toggleMastery = () => {
    if (vocabularySet) {
      const updatedWords = [...vocabularySet.words]
      updatedWords[currentWordIndex].mastered = !updatedWords[currentWordIndex].mastered
      setVocabularySet({
        ...vocabularySet,
        words: updatedWords,
      })
    }
  }

  if (!vocabularySet) {
    return <div>Loading...</div>
  }

  const currentWord = vocabularySet.words[currentWordIndex]
  const masteredCount = vocabularySet.words.filter((word) => word.mastered).length

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="mb-6">
        <Link href="/vocabulary" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Vocabulary Sets
        </Link>
        <h1 className="text-3xl font-bold tracking-tight">{vocabularySet.title}</h1>
        <p className="text-muted-foreground mt-2">{vocabularySet.description}</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>
                  Word {currentWordIndex + 1} of {vocabularySet.words.length}
                </CardTitle>
                <Badge variant={currentWord.mastered ? "default" : "secondary"}>
                  {currentWord.mastered ? "Mastered" : "Learning"}
                </Badge>
              </div>
              <Progress value={((currentWordIndex + 1) / vocabularySet.words.length) * 100} className="w-full" />
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <h2 className="text-4xl font-bold text-blue-600 mb-4">{currentWord.word}</h2>
                <Badge
                  variant={
                    currentWord.difficulty === "easy"
                      ? "secondary"
                      : currentWord.difficulty === "medium"
                        ? "default"
                        : "destructive"
                  }
                >
                  {currentWord.difficulty}
                </Badge>
              </div>

              {showDefinition && (
                <div className="space-y-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div>
                    <h3 className="font-semibold mb-2">Definition:</h3>
                    <p className="text-muted-foreground">{currentWord.definition}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Example:</h3>
                    <p className="italic text-muted-foreground">"{currentWord.example}"</p>
                  </div>
                </div>
              )}

              <div className="flex justify-center space-x-4">
                {!showDefinition ? (
                  <Button onClick={() => setShowDefinition(true)} size="lg">
                    <Play className="mr-2 h-4 w-4" />
                    Show Definition
                  </Button>
                ) : (
                  <div className="flex space-x-2">
                    <Button onClick={toggleMastery} variant={currentWord.mastered ? "outline" : "default"} size="lg">
                      {currentWord.mastered ? (
                        <>
                          <XCircle className="mr-2 h-4 w-4" />
                          Mark as Learning
                        </>
                      ) : (
                        <>
                          <CheckCircle className="mr-2 h-4 w-4" />
                          Mark as Mastered
                        </>
                      )}
                    </Button>
                  </div>
                )}
              </div>

              <div className="flex justify-between">
                <Button onClick={handlePreviousWord} disabled={currentWordIndex === 0} variant="outline">
                  Previous
                </Button>
                <Button onClick={handleNextWord} disabled={currentWordIndex === vocabularySet.words.length - 1}>
                  Next
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Mastered Words</span>
                    <span>
                      {masteredCount}/{vocabularySet.words.length}
                    </span>
                  </div>
                  <Progress value={(masteredCount / vocabularySet.words.length) * 100} />
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600">
                    {Math.round((masteredCount / vocabularySet.words.length) * 100)}%
                  </p>
                  <p className="text-sm text-muted-foreground">Complete</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Study Options</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full bg-transparent" variant="outline">
                <RotateCcw className="mr-2 h-4 w-4" />
                Review All Words
              </Button>
              <Button className="w-full bg-transparent" variant="outline">
                <Play className="mr-2 h-4 w-4" />
                Practice Quiz
              </Button>
              <Button className="w-full bg-transparent" variant="outline">
                Study Unmastered Only
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
