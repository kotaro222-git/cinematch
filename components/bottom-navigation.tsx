"use client"

import { Film, LayoutGrid, Radar, MessageCircle } from "lucide-react"
import { cn } from "@/lib/utils"

export type TabType = "discover" | "collection" | "radar" | "dialogue"

interface BottomNavigationProps {
  activeTab: TabType
  onTabChange: (tab: TabType) => void
}

const tabs: { id: TabType; label: string; icon: typeof Film }[] = [
  { id: "discover", label: "Discover", icon: Film },
  { id: "collection", label: "Collection", icon: LayoutGrid },
  { id: "radar", label: "Radar", icon: Radar },
  { id: "dialogue", label: "Dialogue", icon: MessageCircle },
]

export function BottomNavigation({ activeTab, onTabChange }: BottomNavigationProps) {
  return (
    <nav className="border-t border-border bg-background/80 backdrop-blur-xl">
      <div className="flex items-center justify-around py-2">
        {tabs.map((tab) => {
          const Icon = tab.icon
          const isActive = activeTab === tab.id
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onTabChange(tab.id)}
              className={cn(
                "flex flex-col items-center gap-1 px-4 py-1.5 transition-all",
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Icon
                className={cn(
                  "h-5 w-5 transition-transform",
                  isActive && "scale-110"
                )}
              />
              <span className="text-[10px] font-medium tracking-wide">
                {tab.label}
              </span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
