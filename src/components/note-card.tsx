'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Trash2 } from 'lucide-react'
import { type Note } from "@/types/note"

interface NoteCardProps {
  note: Note
  isActive: boolean
  onSelect: (note: Note) => void
  onDelete: (id: number) => void
}

export function NoteCard({ note, isActive, onSelect, onDelete }: NoteCardProps) {
  return (
    <li
      className={`flex items-center justify-between cursor-pointer p-2 rounded transition-colors ${
        isActive ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'
      }`}
      onClick={() => onSelect(note)}
    >
      <span className="truncate">{note.title}</span>
      <Button
        size="icon"
        variant="ghost"
        onClick={(e) => {
          e.stopPropagation()
          onDelete(note.id)
        }}
        className={isActive ? 'hover:bg-primary/90' : ''}
      >
        <Trash2 className="w-4 h-4" />
      </Button>
    </li>
  )
}