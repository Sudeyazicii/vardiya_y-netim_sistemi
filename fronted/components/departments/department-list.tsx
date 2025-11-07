"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Edit2, Trash2 } from "lucide-react"

interface Department {
  id: string
  name: string
}

interface DepartmentListProps {
  departments: Department[]
  onEdit: (department: Department) => void
  onDelete: (id: string) => void
}

export function DepartmentList({ departments, onEdit, onDelete }: DepartmentListProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {departments.length === 0 ? (
        <div className="col-span-full text-center py-12 text-muted-foreground">Departman bulunmamaktadır</div>
      ) : (
        departments.map((dept) => (
          <Card key={dept.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">{dept.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <Button
                  onClick={() => onEdit(dept)}
                  variant="outline"
                  size="sm"
                  className="flex-1 flex items-center gap-2"
                >
                  <Edit2 className="w-4 h-4" />
                  Düzenle
                </Button>
                <Button
                  onClick={() => onDelete(dept.id)}
                  variant="outline"
                  size="sm"
                  className="flex-1 text-destructive hover:text-destructive flex items-center gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  Sil
                </Button>
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  )
}
