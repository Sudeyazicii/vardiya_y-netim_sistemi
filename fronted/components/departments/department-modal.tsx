"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { X } from "lucide-react"

interface DepartmentModalProps {
  onSubmit: (name: string) => void
  onClose: () => void
  initialValue?: string
  isEdit?: boolean
}

export function DepartmentModal({ onSubmit, onClose, initialValue = "", isEdit = false }: DepartmentModalProps) {
  const [name, setName] = useState(initialValue)

  useEffect(() => {
    setName(initialValue)
  }, [initialValue])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (name.trim()) {
      onSubmit(name)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-md">
        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">{isEdit ? "Departmanı Düzenle" : "Yeni Departman Ekle"}</h2>
            <button onClick={onClose} className="p-1 hover:bg-secondary rounded-md transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">
                Departman Adı
              </label>
              <Input
                id="name"
                type="text"
                placeholder="Departman adını girin"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-input"
                autoFocus
              />
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
