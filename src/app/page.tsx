'use client'

import { useCallback, useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Toaster } from "@/components/ui/toaster"
import { useToast } from "@/components/ui/use-toast"
import { NoteList } from "@/components/note-list"
import { NoteEditor } from "@/components/note-editor"
import { Toolbar } from "@/components/toolbar"
import { type Note } from "@/types/note"

export default function QuickNoteApp() {
  const [notes, setNotes] = useState<Note[]>(() => {
    if (typeof window !== 'undefined') {
      const savedNotes = localStorage.getItem('quick-notes')
      return savedNotes ? JSON.parse(savedNotes) : []
    }
    return []
  })
  const [currentNote, setCurrentNote] = useState<Note | null>(null)
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('quick-notes', JSON.stringify(notes))
    }
  }, [notes])

  useEffect(() => {
    if (notes.length > 0 && !currentNote) {
      setCurrentNote(notes[0])
    }
  }, [notes, currentNote])

  const saveNote = useCallback(() => {
    if (currentNote) {
      setNotes(prevNotes =>
        prevNotes.map(note =>
          note.id === currentNote.id ? currentNote : note
        )
      )
      toast({
        title: "Note saved",
        description: "Your note has been saved successfully.",
      })
    }
  }, [currentNote, toast])

  const createNewNote = () => {
    const newNote = { id: Date.now(), title: 'New Note', content: '' }
    setNotes(prevNotes => [...prevNotes, newNote])
    setCurrentNote(newNote)
  }

  const deleteNote = (id: number) => {
    setNotes(prevNotes => prevNotes.filter(note => note.id !== id))
    if (currentNote?.id === id) {
      setCurrentNote(notes.length > 1 ? notes[0] : null)
    }
    toast({
      title: "Note deleted",
      description: "The note has been deleted successfully.",
    })
  }

  const handleNoteChange = (field: 'title' | 'content', value: string) => {
    if (currentNote) {
      setCurrentNote({ ...currentNote, [field]: value })
    }
  }

  const exportNote = () => {
    if (currentNote) {
      const blob = new Blob([`# ${currentNote.title}\n\n${currentNote.content}`], { type: 'text/markdown' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${currentNote.title}.md`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
      toast({
        title: "Note exported",
        description: "Your note has been exported as a Markdown file.",
      })
    }
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case 'n':
            e.preventDefault()
            createNewNote()
            break
          case 's':
            e.preventDefault()
            saveNote()
            break
          case 'e':
            e.preventDefault()
            exportNote()
            break
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [saveNote, exportNote])

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-4 max-w-6xl">
        <Card className="border-muted shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-2xl font-bold">Quick Note</CardTitle>
            <Toolbar
              onNewNote={createNewNote}
              onSaveNote={saveNote}
              onExportNote={exportNote}
              onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
              hasCurrentNote={!!currentNote}
            />
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4 h-[calc(100vh-200px)]">
              <NoteList
                notes={notes}
                currentNote={currentNote}
                onSelectNote={setCurrentNote}
                onDeleteNote={deleteNote}
                isSidebarOpen={isSidebarOpen}
              />
              <Card className="w-full md:w-3/4 flex flex-col border-muted">
                <CardContent className="flex flex-col h-full p-4">
                  <NoteEditor
                    note={currentNote}
                    onNoteChange={handleNoteChange}
                  />
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
        <div className="mt-4 text-sm text-muted-foreground">
          <p>Keyboard shortcuts:</p>
          <ul className="list-disc list-inside">
            <li>Ctrl/Cmd + N: New note</li>
            <li>Ctrl/Cmd + S: Save note</li>
            <li>Ctrl/Cmd + E: Export note</li>
          </ul>
        </div>
      </div>
      <Toaster />
    </div>
  )
}