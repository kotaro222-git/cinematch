"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import { X, Heart, Eye, Search } from "lucide-react"
import { movies, type Movie } from "@/lib/data"
import { cn } from "@/lib/utils"

interface MovieSwipeProps {
  onAddToWatchlist: (movie: Movie) => void
  onMarkAsSeen: (movie: Movie) => void
  onPass: (movie: Movie) => void
}

export function MovieSwipe({ onAddToWatchlist, onMarkAsSeen, onPass }: MovieSwipeProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [swipeDirection, setSwipeDirection] = useState<"left" | "right" | "down" | null>(null)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const startPos = useRef({ x: 0, y: 0 })

  const currentMovie = movies[currentIndex % movies.length]

  const handleSwipe = (direction: "left" | "right" | "down") => {
    setSwipeDirection(direction)
    setTimeout(() => {
      if (direction === "right") {
        onAddToWatchlist(currentMovie)
      } else if (direction === "down") {
        onMarkAsSeen(currentMovie)
      } else {
        onPass(currentMovie)
      }
      setCurrentIndex((prev) => prev + 1)
      setSwipeDirection(null)
      setDragOffset({ x: 0, y: 0 })
    }, 300)
  }

  const handleDragStart = (clientX: number, clientY: number) => {
    setIsDragging(true)
    startPos.current = { x: clientX, y: clientY }
  }

  const handleDragMove = (clientX: number, clientY: number) => {
    if (!isDragging) return
    const deltaX = clientX - startPos.current.x
    const deltaY = clientY - startPos.current.y
    setDragOffset({ x: deltaX, y: deltaY })
  }

  const handleDragEnd = () => {
    if (!isDragging) return
    setIsDragging(false)

    const threshold = 100
    if (dragOffset.x > threshold) {
      handleSwipe("right")
    } else if (dragOffset.x < -threshold) {
      handleSwipe("left")
    } else if (dragOffset.y > threshold) {
      handleSwipe("down")
    } else {
      setDragOffset({ x: 0, y: 0 })
    }
  }

  const getCardStyle = () => {
    if (swipeDirection === "left") {
      return "translate-x-[-150%] rotate-[-30deg] opacity-0"
    }
    if (swipeDirection === "right") {
      return "translate-x-[150%] rotate-[30deg] opacity-0"
    }
    if (swipeDirection === "down") {
      return "translate-y-[150%] opacity-0"
    }
    return ""
  }

  return (
    <div className="flex h-full flex-col bg-background">
      <div className="flex items-center justify-between px-4 py-3">
        <span className="text-xs font-medium tracking-widest text-muted-foreground">NOW PLAYING</span>
        <button type="button" className="p-2 text-muted-foreground transition-colors hover:text-foreground">
          <Search className="h-5 w-5" />
        </button>
      </div>

      <div className="relative flex-1 px-4 pb-4">
        <div
          className={cn(
            "relative h-full w-full cursor-grab overflow-hidden rounded-2xl transition-all duration-300 active:cursor-grabbing",
            getCardStyle()
          )}
          style={{
            transform:
              !swipeDirection && isDragging
                ? `translateX(${dragOffset.x}px) translateY(${dragOffset.y * 0.3}px) rotate(${dragOffset.x * 0.05}deg)`
                : undefined,
          }}
          onMouseDown={(e) => handleDragStart(e.clientX, e.clientY)}
          onMouseMove={(e) => handleDragMove(e.clientX, e.clientY)}
          onMouseUp={handleDragEnd}
          onMouseLeave={handleDragEnd}
          onTouchStart={(e) => handleDragStart(e.touches[0].clientX, e.touches[0].clientY)}
          onTouchMove={(e) => handleDragMove(e.touches[0].clientX, e.touches[0].clientY)}
          onTouchEnd={handleDragEnd}
        >
          <Image
            src={currentMovie.image}
            alt={currentMovie.title}
            fill
            className="object-cover"
            priority
            draggable={false}
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

          <div className="absolute inset-x-0 bottom-0 px-6 pb-8 pt-6">
            <h1 className="mb-2 text-4xl font-bold text-white">{currentMovie.title}</h1>
            <p className="mb-10 text-sm italic text-white/70">{`"${currentMovie.tagline}"`}</p>

            <div className="flex items-center justify-center gap-12">
              <button
                type="button"
                onClick={() => handleSwipe("left")}
                className="flex h-14 w-14 items-center justify-center rounded-full border border-white/30 bg-black/30 text-white backdrop-blur-sm transition-all hover:scale-110 hover:bg-white/20"
              >
                <X className="h-6 w-6" />
              </button>

              <button
                type="button"
                onClick={() => handleSwipe("down")}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-black/30 text-white backdrop-blur-sm transition-all hover:scale-110 hover:bg-white/20"
              >
                <Eye className="h-5 w-5" />
              </button>

              <button
                type="button"
                onClick={() => handleSwipe("right")}
                className="flex h-14 w-14 items-center justify-center rounded-full border border-white/30 bg-black/30 text-white backdrop-blur-sm transition-all hover:scale-110 hover:bg-white/20"
              >
                <Heart className="h-6 w-6" />
              </button>
            </div>
          </div>

          {isDragging && (
            <>
              {dragOffset.x > 50 && (
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl bg-accent/90 px-6 py-3 text-accent-foreground">
                  <span className="text-lg font-bold tracking-wider">WATCHLIST</span>
                </div>
              )}
              {dragOffset.x < -50 && (
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl bg-destructive/90 px-6 py-3 text-destructive-foreground">
                  <span className="text-lg font-bold tracking-wider">PASS</span>
                </div>
              )}
              {dragOffset.y > 50 && (
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl bg-primary/90 px-6 py-3 text-primary-foreground">
                  <span className="text-lg font-bold tracking-wider">SEEN</span>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
