"use client"

import { useState } from "react"
import { MovieSwipe } from "@/components/movie-swipe"
import { ProfileScreen } from "@/components/profile-screen"
import { RadarScreen } from "@/components/radar-screen"
import { DialogueScreen } from "@/components/dialogue-screen"
import { BottomNavigation, type TabType } from "@/components/bottom-navigation"
import type { Movie } from "@/lib/data"

export default function CinematicApp() {
  const [activeTab, setActiveTab] = useState<TabType>("discover")
  const [, setWatchlist] = useState<Movie[]>([])
  const [, setArchive] = useState<Movie[]>([])

  const handleAddToWatchlist = (movie: Movie) => {
    setWatchlist((prev) => [...prev, movie])
  }

  const handleMarkAsSeen = (movie: Movie) => {
    setArchive((prev) => [...prev, movie])
  }

  const handlePass = (_movie: Movie) => {}

  return (
    <div className="flex h-screen flex-col bg-background">
      <div className="mx-auto flex h-full w-full max-w-md flex-col overflow-hidden">
        <main className="flex-1 overflow-hidden">
          {activeTab === "discover" && (
            <MovieSwipe
              onAddToWatchlist={handleAddToWatchlist}
              onMarkAsSeen={handleMarkAsSeen}
              onPass={handlePass}
            />
          )}
          {activeTab === "collection" && <ProfileScreen />}
          {activeTab === "radar" && <RadarScreen />}
          {activeTab === "dialogue" && <DialogueScreen />}
        </main>

        <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} />
      </div>
    </div>
  )
}
