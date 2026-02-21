"use client"

import { useState } from "react"
import { LayoutGrid, Heart, Eye } from "lucide-react"
import { cn } from "@/lib/utils"
import Image from "next/image"

interface Movie {
  id: string
  title: string
  image: string
  userComment?: string | null
}

interface MovieCollectionProps {
  watched: Movie[]
  watchlist: Movie[]
}

export function MovieCollection({ watched, watchlist }: MovieCollectionProps) {
  const [activeTab, setActiveTab] = useState<"watched" | "wantToWatch">("watched")

  const displayMovies = activeTab === "watched" ? watched : watchlist

  return (
    <div className="flex-1 px-4">
      <h2 className="mb-4 text-sm font-medium tracking-wider text-muted-foreground">
        COLLECTION
      </h2>

      <div className="mb-4 flex overflow-hidden rounded-lg border border-border bg-card/50">
        <button
          type="button"
          onClick={() => setActiveTab("watched")}
          className={cn(
            "flex flex-1 items-center justify-center gap-2 py-3 text-sm font-medium transition-all",
            activeTab === "watched"
              ? "bg-secondary text-foreground"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          <LayoutGrid className="h-4 w-4" />
          Watched
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("wantToWatch")}
          className={cn(
            "flex flex-1 items-center justify-center gap-2 py-3 text-sm font-medium transition-all",
            activeTab === "wantToWatch"
              ? "bg-secondary text-foreground"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          <Heart className="h-4 w-4" />
          Want to Watch
        </button>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {displayMovies.map((movie) => (
          <div key={movie.id} className="group relative aspect-[3/4] cursor-pointer overflow-hidden rounded-sm">
            <Image
              src={movie.image}
              alt={movie.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />

            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-2 pt-8">
              <p className="text-xs font-medium text-white">{movie.title}</p>
              {movie.userComment && (
                <p className="mt-0.5 line-clamp-2 text-[10px] leading-tight text-zinc-400">
                  {movie.userComment}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {displayMovies.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="rounded-full bg-muted p-4">
            {activeTab === "wantToWatch" ? (
              <Heart className="h-8 w-8 text-muted-foreground" />
            ) : (
              <Eye className="h-8 w-8 text-muted-foreground" />
            )}
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            {activeTab === "wantToWatch"
              ? "No movies added yet"
              : "No watched movies yet"}
          </p>
        </div>
      )}
    </div>
  )
}
