"use client"
import { Button } from "@/components/ui/button"
import { Edit2, Trash2 } from "lucide-react"

interface Employee {
  id: string
  firstName: string
  lastName: string
  email: string
  department: string
}

interface EmployeeListProps {
  employees: Employee[]
  onEdit: (employee: Employee) => void
  onDelete: (id: string) => void
}

export function EmployeeList({ employees, onEdit, onDelete }: EmployeeListProps) {
  if (employees.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground bg-card rounded-lg border border-border">
        Çalışan bulunmamaktadır
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-border bg-secondary/50">
            <th className="px-4 py-3 text-left text-sm font-semibold">Ad</th>
            <th className="px-4 py-3 text-left text-sm font-semibold">Soyad</th>
            <th className="px-4 py-3 text-left text-sm font-semibold">Email</th>
            <th className="px-4 py-3 text-left text-sm font-semibold">Departman</th>
            <th className="px-4 py-3 text-left text-sm font-semibold">İşlemler</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp.id} className="border-b border-border hover:bg-secondary/30 transition-colors">
              <td className="px-4 py-3 text-sm">{emp.firstName}</td>
              <td className="px-4 py-3 text-sm">{emp.lastName}</td>
              <td className="px-4 py-3 text-sm text-muted-foreground">{emp.email}</td>
              <td className="px-4 py-3 text-sm">{emp.department}</td>
              <td className="px-4 py-3 text-sm">
                <div className="flex gap-2">
                  <Button
                    onClick={() => onEdit(emp)}
                    variant="ghost"
                    size="sm"
                    className="text-primary hover:text-primary/90"
                  >
                    <Edit2 className="w-4 h-4" />
                  </Button>
                  <Button
                    onClick={() => onDelete(emp.id)}
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
