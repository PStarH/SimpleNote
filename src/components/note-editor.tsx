'use client'

import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { type Note } from "@/types/note"

interface NoteEditorProps {
  note: Note | null
  onNoteChange: (field: 'title' | 'content', value: string) => void
}

export function NoteEditor({ note, onNoteChange }: NoteEditorProps) {
  if (!note) {
    return (
      <div className="flex items-center justify-center h-full text-muted-foreground">
        Select a note or create a new one
      </div>
    )
  }

  return (
    <>
      <Input
        value={note.title}
        onChange={(e) => onNoteChange('title', e.target.value)}
        className="mb-4 text-lg font-semibold"
        placeholder="Note title"
      />
      <textarea
        value={note.content}
        onChange={(e) => onNoteChange('content', e.target.value)}
        className="flex-grow resize-none rounded-md border bg-transparent p-4 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        placeholder="Write your note here..."
      />
    </>
  )
}