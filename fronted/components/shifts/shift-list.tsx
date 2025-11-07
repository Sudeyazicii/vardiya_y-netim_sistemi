"use client"

import { Button } from "@/components/ui/button"
import { Edit2, Trash2 } from "lucide-react"

interface Shift {
  id: string
  employee: string
  date: string
  startTime: string
  endTime: string
}

interface ShiftListProps {
  shifts: Shift[]
  onEdit: (shift: Shift) => void
  onDelete: (id: string) => void
}

export function ShiftList({ shifts, onEdit, onDelete }: ShiftListProps) {
  if (shifts.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground bg-card rounded-lg border border-border">
        Vardiya bulunmamaktadır
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-border bg-secondary/50">
            <th className="px-4 py-3 text-left text-sm font-semibold">Çalışan</th>
            <th className="px-4 py-3 text-left text-sm font-semibold">Tarih</th>
            <th className="px-4 py-3 text-left text-sm font-semibold">Başlangıç</th>
            <th className="px-4 py-3 text-left text-sm font-semibold">Bitiş</th>
            <th className="px-4 py-3 text-left text-sm font-semibold">İşlemler</th>
          </tr>
        </thead>
        <tbody>
          {shifts.map((shift) => (
            <tr key={shift.id} className="border-b border-border hover:bg-secondary/30 transition-colors">
              <td className="px-4 py-3 text-sm font-medium">{shift.employee}</td>
              <td className="px-4 py-3 text-sm">{new Date(shift.date).toLocaleDateString("tr-TR")}</td>
              <td className="px-4 py-3 text-sm">{shift.startTime}</td>
              <td className="px-4 py-3 text-sm">{shift.endTime}</td>
              <td className="px-4 py-3 text-sm">
                <div className="flex gap-2">
                  <Button
                    onClick={() => onEdit(shift)}
                    variant="ghost"
                    size="sm"
                    className="text-primary hover:text-primary/90"
                  >
                    <Edit2 className="w-4 h-4" />
                  </Button>
                  <Button
                    onClick={() => onDelete(shift.id)}
                    variant="ghost"
                    size="sm"
                    className="text-destructive hover:text-destructive/90"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
