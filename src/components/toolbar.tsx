'use client'

import { Button } from "@/components/ui/button"
import { PlusCircle, Save, Download, Menu } from 'lucide-react'

interface ToolbarProps {
  onNewNote: () => void
  onSaveNote: () => void
  onExportNote: () => void
  onToggleSidebar: () => void
  hasCurrentNote: boolean
}

export function Toolbar({ onNewNote, onSaveNote, onExportNote, onToggleSidebar, hasCurrentNote }: ToolbarProps) {
  return (
    <div className="flex space-x-2">
      <Button onClick={onToggleSidebar} size="sm" variant="outline" className="md:hidden">
        <Menu className="w-4 h-4" />
      </Button>
      <Button onClick={onNewNote} size="sm" variant="outline">
        <PlusCircle className="w-4 h-4 mr-2" />
        <span className="hidden sm:inline">New Note</span>
      </Button>
      <Button onClick={onSaveNote} size="sm" variant="outline">
        <Save className="w-4 h-4 mr-2" />
        <span className="hidden sm:inline">Save</span>
      </Button>
      <Button onClick={onExportNote} size="sm" variant="outline" disabled={!hasCurrentNote}>
        <Download className="w-4 h-4 mr-2" />
        <span className="hidden sm:inline">Export</span>
      </Button>
    </div>
  )
}