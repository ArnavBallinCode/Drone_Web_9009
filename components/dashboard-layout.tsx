"use client"

import type React from "react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { ModeToggle } from "@/components/mode-toggle"
import {
  Gauge,
  Compass,
  BarChart3,
  MapPin,
  Layers,
  Settings,
  Info,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <DashboardSidebar pathname={pathname} />

        {/* ✅ Ensures children stretch and scroll correctly */}
        <div className="flex flex-col flex-1 min-w-0 overflow-auto">
      <main className="flex-1 w-full max-w-none p-6">{children}</main>


          <footer className="w-full text-center py-4 bg-gray-900/60 text-white border-t border-gray-700 backdrop-blur-md shadow-inner">
            Made with ❤️ by <span className="font-semibold text-blue-400">SkySync GCS</span>
            <div className="mt-1"></div>
            Powered by <span className="font-semibold text-blue-400">Arnav Angarkar</span>
          </footer>

        </div>
      </div>
    </SidebarProvider>
  )
}

function DashboardSidebar({ pathname }: { pathname: string }) {
  return (
    <Sidebar>
      <SidebarHeader className="flex items-center justify-between">
        <div className="flex items-center gap-2 px-2">
          <Gauge className="h-6 w-6 text-primary" />
          <span className="font-bold text-lg">MAVLink</span>
        </div>
        <SidebarTrigger />
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname === "/"}>
              <Link href="/">
                <BarChart3 />
                <span>Dashboard</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname === "/attitude"}>
              <Link href="/attitude">
                <Compass />
                <span>Attitude</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname === "/position"}>
              <Link href="/position">
                <MapPin />
                <span>Position</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname === "/parameters"}>
              <Link href="/parameters">
                <Layers />
                <span>Parameters</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-4 flex justify-between items-center">
        <ModeToggle />
        <div className="flex gap-2">
          <Link href="/settings" className="p-2 rounded-md hover:bg-muted">
            <Settings className="h-5 w-5" />
          </Link>
          <Link href="/about" className="p-2 rounded-md hover:bg-muted">
            <Info className="h-5 w-5" />
          </Link>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
