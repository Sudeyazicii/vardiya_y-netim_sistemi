"use client"

import { useEffect, useState } from "react"
import { Layout } from "@/components/layout"
import { ShiftList } from "@/components/shifts/shift-list"
import { ShiftModal } from "@/components/shifts/shift-modal"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

interface Shift {
  id: string
  employee: string
  date: string
  startTime: string
  endTime: string
}

interface Employee {
  id: string
  ad: string
  soyad: string
}

export default function ShiftsPage() {
  const [shifts, setShifts] = useState<Shift[]>([])
  const [employees, setEmployees] = useState<Employee[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingShift, setEditingShift] = useState<Shift | null>(null)

  useEffect(() => {
    // Çalışanları çek
    fetch("http://localhost:3002/api/v1/calisans")
      .then(res => res.json())
      .then(data => setEmployees(data))
      .catch(err => console.error(err))

    // Vardiyaları çek ve çalışan id -> isim eşle
    fetch("http://localhost:3002/api/v1/vardiyalar")
      .then(res => res.json())
      .then(data => {
        const formatted = data.map((v: any) => {
          const emp = employees.find(e => e.id === v.calisan_id)
          return {
            id: v.id.toString(),
            employee: emp ? `${emp.ad} ${emp.soyad}` : "Bilinmiyor",
            date: v.tarih,
            startTime: v.baslangic,
            endTime: v.bitis
          }
        })
        setShifts(formatted)
      })
      .catch(err => console.error(err))
  }, [employees]) // employees yüklendiğinde vardiyaları da eşle

  const handleAddShift = (data: Omit<Shift, "id">) => {
    if (editingShift) {
      fetch(`http://localhost:3002/api/v1/vardiyalar/${editingShift.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          calisan_id: employees.find(e => `${e.ad} ${e.soyad}` === data.employee)?.id,
          tarih: data.date,
          baslangic: data.startTime,
          bitis: data.endTime
        }),
      })
        .then(res => res.json())
        .then(updated => {
          setShifts(shifts.map(s => s.id === updated.id.toString() ? {
            id: updated.id.toString(),
            employee: data.employee,
            date: updated.tarih,
            startTime: updated.baslangic,
            endTime: updated.bitis
          } : s))
          setEditingShift(null)
        })
    } else {
      fetch("http://localhost:3002/api/v1/vardiyalar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          calisan_id: employees.find(e => `${e.ad} ${e.soyad}` === data.employee)?.id,
          tarih: data.date,
          baslangic: data.startTime,
          bitis: data.endTime
        }),
      })
        .then(res => res.json())
        .then(newShift => {
          setShifts([...shifts, {
            id: newShift.id.toString(),
            employee: data.employee,
            date: newShift.tarih,
            startTime: newShift.baslangic,
            endTime: newShift.bitis
          }])
        })
    }
    setIsModalOpen(false)
  }

  const handleDeleteShift = (id: string) => {
    fetch(`http://localhost:3002/api/v1/vardiyalar/${id}`, { method: "DELETE" })
      .then(() => setShifts(shifts.filter(s => s.id !== id)))
  }

  const handleEditShift = (shift: Shift) => {
    setEditingShift(shift)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setEditingShift(null)
  }

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-foreground">Vardiyalar</h1>
          <Button
            onClick={() => setIsModalOpen(true)}
            className="bg-primary hover:bg-primary/90 text-primary-foreground flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Yeni Vardiya Ekle
          </Button>
        </div>

        <ShiftList shifts={shifts} onEdit={handleEditShift} onDelete={handleDeleteShift} />

        {isModalOpen && (
          <ShiftModal
            onSubmit={handleAddShift}
            onClose={handleCloseModal}
            initialValue={editingShift}
            isEdit={!!editingShift}
            employees={employees.map(e => `${e.ad} ${e.soyad}`)}
          />
        )}
      </div>
    </Layout>
  )
}
