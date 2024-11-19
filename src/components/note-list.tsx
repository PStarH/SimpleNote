'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { NoteCard } from "@/components/note-card"
import { type Note } from "@/types/note"

interface NoteListProps {
  notes: Note[]
  currentNote: Note | null
  onSelectNote: (note: Note) => void
  onDeleteNote: (id: number) => void
  isSidebarOpen: boolean
}

export function NoteList({ notes, currentNote, onSelectNote, onDeleteNote, isSidebarOpen }: NoteListProps) {
  return (
    <Card className={`${isSidebarOpen ? 'block' : 'hidden'} md:block w-full md:w-1/4 overflow-hidden border-muted`}>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Notes</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[calc(100vh-300px)]">
          <ul className="space-y-1 p-4">
            {notes.map(note => (
              <NoteCard
                key={note.id}
                note={note}
                isActive={note.id === currentNote?.id}
                onSelect={onSelectNote}
                onDelete={onDeleteNote}
              />
            ))}
          </ul>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}