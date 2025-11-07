"use client"

import { useEffect, useState } from "react"
import { Layout } from "@/components/layout"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { DepartmentModal } from "@/components/departments/department-modal"
import { DepartmentList } from "@/components/departments/department-list"

interface Department {
  id: string
  name: string
}

export default function DepartmentsPage() {
  const [departments, setDepartments] = useState<Department[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingDepartment, setEditingDepartment] = useState<Department | null>(null)

  // Backend’den departmanları çek ve ad -> name eşle
  useEffect(() => {
    fetch("http://localhost:3002/api/v1/departmanlar")
      .then(res => res.json())
      .then((data: any[]) => {
        const formatted = data.map(d => ({
          id: d.id.toString(),
          name: d.ad
        }))
        setDepartments(formatted)
      })
      .catch(err => console.error(err))
  }, [])

  const handleAddDepartment = (data: { name: string }) => {
    if (editingDepartment) {
      // Düzenle
      fetch(`http://localhost:3002/api/v1/departmanlar/${editingDepartment.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ad: data.name }),
      })
        .then(res => res.json())
        .then(updated => {
          setDepartments(departments.map(d =>
            d.id === updated.id.toString() ? { id: updated.id.toString(), name: updated.ad } : d
          ))
          setEditingDepartment(null)
        })
    } else {
      // Yeni departman ekle
      fetch("http://localhost:3002/api/v1/departmanlar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ad: data.name }),
      })
        .then(res => res.json())
        .then(newDept =>
          setDepartments([...departments, { id: newDept.id.toString(), name: newDept.ad }])
        )
    }
    setIsModalOpen(false)
  }

  const handleDeleteDepartment = (id: string) => {
    fetch(`http://localhost:3002/api/v1/departmanlar/${id}`, { method: "DELETE" })
      .then(() => setDepartments(departments.filter(d => d.id !== id)))
  }

  const handleEditDepartment = (department: Department) => {
    setEditingDepartment(department)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setEditingDepartment(null)
  }

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-foreground">Departmanlar</h1>
          <Button
            onClick={() => setIsModalOpen(true)}
            className="bg-primary hover:bg-primary/90 text-primary-foreground flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Yeni Departman Ekle
          </Button>
        </div>

        <DepartmentList
          departments={departments}
          onEdit={handleEditDepartment}
          onDelete={handleDeleteDepartment}
        />

        {isModalOpen && (
          <DepartmentModal
            onSubmit={(name: string) => handleAddDepartment({ name })}
            onClose={handleCloseModal}
            initialValue={editingDepartment?.name || ""}
            isEdit={!!editingDepartment}
          />
        )}
      </div>
    </Layout>
  )
}
