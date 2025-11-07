"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { X } from "lucide-react"

interface Shift {
  id?: string
  employee: string
  date: string
  startTime: string
  endTime: string
}

interface ShiftModalProps {
  onSubmit: (data: Omit<Shift, "id">) => void
  onClose: () => void
  initialValue?: Shift | null
  isEdit?: boolean
  employees: string[]
}

export function ShiftModal({ onSubmit, onClose, initialValue, isEdit = false, employees }: ShiftModalProps) {
  const [data, setData] = useState<Omit<Shift, "id">>({
    employee: employees[0] || "",
    date: new Date().toISOString().split("T")[0],
    startTime: "09:00",
    endTime: "17:00",
  })

  useEffect(() => {
    if (initialValue) {
      setData({
        employee: initialValue.employee,
        date: initialValue.date,
        startTime: initialValue.startTime,
        endTime: initialValue.endTime,
      })
    } else {
      setData({
        employee: employees[0] || "",
        date: new Date().toISOString().split("T")[0],
        startTime: "09:00",
        endTime: "17:00",
      })
    }
  }, [initialValue, employees])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (data.employee && data.date && data.startTime && data.endTime) {
      onSubmit(data)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-md">
        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">{isEdit ? "Vardiyayı Düzenle" : "Yeni Vardiya Ekle"}</h2>
            <button onClick={onClose} className="p-1 hover:bg-secondary rounded-md transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="employee" className="text-sm font-medium">
                Çalışan
              </label>
              <select
                id="employee"
                value={data.employee}
                onChange={(e) => setData({ ...data, employee: e.target.value })}
                className="w-full px-3 py-2 bg-input border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              >
                {employees.map((emp) => (
                  <option key={emp} value={emp}>
                    {emp}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label htmlFor="date" className="text-sm font-medium">
                Tarih
              </label>
              <Input
                id="date"
                type="date"
                value={data.date}
                onChange={(e) => setData({ ...data, date: e.target.value })}
                className="bg-input"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="startTime" className="text-sm font-medium">
                  Başlangıç Saati
                </label>
                <Input
                  id="startTime"
                  type="time"
                  value={data.startTime}
                  onChange={(e) => setData({ ...data, startTime: e.target.value })}
                  className="bg-input"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="endTime" className="text-sm font-medium">
                  Bitiş Saati
                </label>
                <Input
                  id="endTime"
                  type="time"
                  value={data.endTime}
                  onChange={(e) => setData({ ...data, endTime: e.target.value })}
                  className="bg-input"
                />
              </div>
            </div>

            <div className="flex gap-2 justify-end">
              <Button type="button" variant="outline" onClick={onClose}>
                İptal
              </Button>
              <Button type="submit" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                {isEdit ? "Güncelle" : "Ekle"}
              </Button>
            </div>
          </form>
        </div>
      </Card>
    </div>
  )
}
