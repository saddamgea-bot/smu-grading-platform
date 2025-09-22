"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { usePathname } from "next/navigation"
import { Menu, User, Settings, LogOut, UserCheck, UserCircle } from "lucide-react"
import { ModeToggle } from "@/components/mode-toggle"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

export default function Header() {
  const pathname = usePathname()
  const [isSubmenuOpen, setIsSubmenuOpen] = useState<string | null>(null)

  const mainNavItems = [
    { href: "/", label: "Dashboard" },
    { href: "/courses", label: "Courses" },
    { href: "/courses/cor101/assessments", label: "Assessments" },
    { href: "/learning-prediction", label: "Analytics" },
    { href: "/knowledge-base", label: "Knowledge Base" },
  ]

  const toggleSubmenu = (label: string) => {
    if (isSubmenuOpen === label) {
      setIsSubmenuOpen(null)
    } else {
      setIsSubmenuOpen(label)
    }
  }

  const isPathInRoute = (path: string) => {
    if (path === "/") return pathname === "/"
    return pathname.startsWith(path)
  }

  const isSubmenuActive = (children: { href: string; label: string }[]) => {
    return children.some((child) => isPathInRoute(child.href))
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="/" className="mr-6 flex items-center space-x-3">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/design-mode-images/image%281%29%281%29-q8pHZrtflFH7TAWNez4N3SMXLCFqhg.png"
            alt="SMU Logo"
            width={40}
            height={40}
            className="object-contain"
          />
          <div className="flex flex-col">
            <span className="font-bold text-lg text-primary">AI Grading Platform</span>
            <span className="text-xs text-foreground/80">Singapore Management University</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium flex-1">
          {mainNavItems.map((item) => {
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-sm transition-colors hover:text-primary font-medium",
                  isPathInRoute(item.href) ? "text-primary" : "text-foreground/70",
                )}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className="flex items-center justify-end space-x-4">
          <ModeToggle />

          <div className="hidden md:flex items-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center space-x-2 h-auto p-2 hover:bg-accent">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg" alt="Instructor" />
                    <AvatarFallback>
                      <User className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col text-left">
                    <span className="text-sm font-medium">Chen Shen Fu</span>
                    <span className="text-xs text-muted-foreground">Instructor</span>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem asChild>
                  <Link href="/profile" className="flex items-center">
                    <UserCircle className="mr-2 h-4 w-4" />
                    Account Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  Account Settings
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <UserCheck className="mr-2 h-4 w-4" />
                  Switch Account
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600">
                  <LogOut className="mr-2 h-4 w-4" />
                  Log Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Mobile Menu Trigger */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open menu">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[80vw] sm:w-[350px]">
              <div className="flex items-center mt-4 mb-8">
                <Avatar className="h-12 w-12">
                  <AvatarImage src="/placeholder.svg" alt="Instructor" />
                  <AvatarFallback>
                    <User className="h-6 w-6" />
                  </AvatarFallback>
                </Avatar>
                <div className="ml-3">
                  <div className="font-medium text-lg">Chen Shen Fu</div>
                  <div className="text-sm text-muted-foreground">SMU Instructor</div>
                </div>
              </div>
              <nav className="flex flex-col gap-4">
                {mainNavItems.map((item) => {
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "py-2 font-medium",
                        isPathInRoute(item.href) ? "text-primary" : "text-foreground/70",
                      )}
                    >
                      {item.label}
                    </Link>
                  )
                })}
                <div className="border-t pt-4 mt-4">
                  <Link href="/profile" className="block py-2 font-medium text-foreground/70">
                    Account Profile
                  </Link>
                  <div className="py-2 font-medium text-foreground/70">Account Settings</div>
                  <div className="py-2 font-medium text-foreground/70">Switch Account</div>
                  <div className="py-2 font-medium text-red-600">Log Out</div>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
