"use client"

import type React from "react"

import { useRouter, usePathname } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"

export function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()

  const handleLogout = () => {
    sessionStorage.removeItem("authenticated")
    router.push("/login")
  }

  const isActive = (path: string) => pathname === path

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-card shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <div>
                <h1 className="text-2xl font-bold text-primary">Vardiya Sistemi</h1>
              </div>
              <nav className="hidden sm:flex items-center gap-1">
                <Link
                  href="/departmanlar"
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive("/departmanlar")
                      ? "bg-primary text-primary-foreground"
                      : "text-foreground hover:bg-secondary"
                  }`}
                >
                  Departmanlar
                </Link>
                <Link
                  href="/calisanlar"
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive("/calisanlar")
                      ? "bg-primary text-primary-foreground"
                      : "text-foreground hover:bg-secondary"
                  }`}
                >
                  Çalışanlar
                </Link>
                <Link
                  href="/vardiyalar"
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive("/vardiyalar")
                      ? "bg-primary text-primary-foreground"
                      : "text-foreground hover:bg-secondary"
                  }`}
                >
                  Vardiyalar
                </Link>
              </nav>
            </div>
            <Button
              onClick={handleLogout}
              variant="outline"
              size="sm"
              className="flex items-center gap-2 bg-transparent"
            >
              <LogOut className="w-4 h-4" />
              Çıkış Yap
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">{children}</main>
    </div>
  )
}
