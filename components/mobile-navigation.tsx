"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, BookOpen, MessageCircle, Award, BarChart2 } from "lucide-react"
import { cn } from "@/lib/utils"

export default function MobileNavigation() {
  const pathname = usePathname()

  const navItems = [
    { href: "/", label: "홈", icon: Home },
    { href: "/courses", label: "코스", icon: BookOpen },
    { href: "/conversation", label: "대화", icon: MessageCircle },
    { href: "/dashboard", label: "분석", icon: BarChart2 },
    { href: "/vocabulary", label: "어휘", icon: Award },
  ]

  // 현재 경로가 특정 경로에 포함되는지 확인하는 함수
  const isPathInRoute = (path: string) => {
    if (path === "/") return pathname === "/"
    return pathname.startsWith(path)
  }

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-background border-t border-border z-50 pb-safe">
      <nav className="flex justify-around items-center h-16">
        {navItems.map((item) => {
          const isActive = isPathInRoute(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn("duo-nav-item", isActive ? "active" : "text-muted-foreground")}
            >
              <item.icon className="h-6 w-6 mb-1" />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
