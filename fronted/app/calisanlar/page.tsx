"use client"

import { useEffect, useState } from "react"
import { Layout } from "@/components/layout"
import { EmployeeList } from "@/components/employees/employee-list"
import { EmployeeModal } from "@/components/employees/employee-modal"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

interface Employee {
  id: string
  firstName: string
  lastName: string
  email: string
  department: string
}

interface Department {
  id: number
  ad: string
}

export default function EmployeesPage() {
  const [employees, setEmployees] = useState<Employee[]>([])
  const [departments, setDepartments] = useState<Department[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null)

  // Önce departmanları yükle, sonra çalışanları eşleştir
  useEffect(() => {
    fetch("http://localhost:3002/api/v1/departmanlar")
      .then(res => res.json())
      .then((deps: Department[]) => {
        setDepartments(deps)

        // departmanlar yüklendikten sonra çalışanları al
        fetch("http://localhost:3002/api/v1/calisans")
          .then(res => res.json())
          .then((data: any[]) => {
            const formatted = data.map(e => ({
              id: e.id.toString(),
              firstName: e.ad,
              lastName: e.soyad,
              email: e.email,
              department: deps.find(d => d.id === e.departman_id)?.ad || ""
            }))
            setEmployees(formatted)
          })
          .catch(err => console.error(err))
      })
      .catch(err => console.error(err))
  }, [])

  const handleAddEmployee = (data: Omit<Employee, "id">) => {
    if (editingEmployee) {
      fetch(`http://localhost:3002/api/v1/calisans/${editingEmployee.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ad: data.firstName,
          soyad: data.lastName,
          email: data.email,
          departman_id: departments.find(d => d.ad === data.department)?.id || null
        }),
      })
        .then(res => res.json())
        .then(updated => {
          setEmployees(employees.map(e => (e.id === updated.id.toString() ? {
            id: updated.id.toString(),
            firstName: updated.ad,
            lastName: updated.soyad,
            email: updated.email,
            department: departments.find(d => d.id === updated.departman_id)?.ad || ""
          } : e)))
          setEditingEmployee(null)
        })
    } else {
      fetch("http://localhost:3002/api/v1/calisans", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ad: data.firstName,
          soyad: data.lastName,
          email: data.email,
          departman_id: departments.find(d => d.ad === data.department)?.id || null
        }),
      })
        .then(res => res.json())
        .then(newEmployee => {
          setEmployees([...employees, {
            id: newEmployee.id.toString(),
            firstName: newEmployee.ad,
            lastName: newEmployee.soyad,
            email: newEmployee.email,
            department: departments.find(d => d.id === newEmployee.departman_id)?.ad || ""
          }])
        })
    }
    setIsModalOpen(false)
  }

  const handleDeleteEmployee = (id: string) => {
    fetch(`http://localhost:3002/api/v1/calisans/${id}`, { method: "DELETE" })
      .then(() => setEmployees(employees.filter(e => e.id !== id)))
  }

  const handleEditEmployee = (employee: Employee) => {
    setEditingEmployee(employee)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setEditingEmployee(null)
  }

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-foreground">Çalışanlar</h1>
          <Button
            onClick={() => setIsModalOpen(true)}
            className="bg-primary hover:bg-primary/90 text-primary-foreground flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Yeni Çalışan Ekle
          </Button>
        </div>

        <EmployeeList employees={employees} onEdit={handleEditEmployee} onDelete={handleDeleteEmployee} />

        {isModalOpen && (
          <EmployeeModal
            onSubmit={handleAddEmployee}
            onClose={handleCloseModal}
            initialValue={editingEmployee || { firstName: "", lastName: "", email: "", department: "" }}
            isEdit={!!editingEmployee}
            departments={departments.map(d => d.ad)}
          />
        )}
      </div>
    </Layout>
  )
}
