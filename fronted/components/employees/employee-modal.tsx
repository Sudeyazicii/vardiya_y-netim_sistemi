"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { X } from "lucide-react"

interface Employee {
  id?: string
  firstName: string
  lastName: string
  email: string
  department: string
}

interface EmployeeModalProps {
  onSubmit: (data: Omit<Employee, "id">) => void
  onClose: () => void
  initialValue?: Employee | null
  isEdit?: boolean
  departments: string[]
}

export function EmployeeModal({ onSubmit, onClose, initialValue, isEdit = false, departments }: EmployeeModalProps) {
  const [data, setData] = useState<Omit<Employee, "id">>({
    firstName: "",
    lastName: "",
    email: "",
    department: departments[0] || "",
  })

  useEffect(() => {
    if (initialValue) {
      setData({
        firstName: initialValue.firstName,
        lastName: initialValue.lastName,
        email: initialValue.email,
        department: initialValue.department,
      })
    } else {
      setData({
        firstName: "",
        lastName: "",
        email: "",
        department: departments[0] || "",
      })
    }
  }, [initialValue, departments])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (data.firstName.trim() && data.lastName.trim() && data.email.trim()) {
      onSubmit(data)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-md">
        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">{isEdit ? "Çalışanı Düzenle" : "Yeni Çalışan Ekle"}</h2>
            <button onClick={onClose} className="p-1 hover:bg-secondary rounded-md transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="firstName" className="text-sm font-medium">
                Ad
              </label>
              <Input
                id="firstName"
                type="text"
                placeholder="Ad"
                value={data.firstName}
                onChange={(e) => setData({ ...data, firstName: e.target.value })}
                className="bg-input"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="lastName" className="text-sm font-medium">
                Soyad
              </label>
              <Input
                id="lastName"
                type="text"
                placeholder="Soyad"
                value={data.lastName}
                onChange={(e) => setData({ ...data, lastName: e.target.value })}
                className="bg-input"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="Email"
                value={data.email}
                onChange={(e) => setData({ ...data, email: e.target.value })}
                className="bg-input"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="department" className="text-sm font-medium">
                Departman
              </label>
              <select
                id="department"
                value={data.department}
                onChange={(e) => setData({ ...data, department: e.target.value })}
                className="w-full px-3 py-2 bg-input border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              >
                {departments.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
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
