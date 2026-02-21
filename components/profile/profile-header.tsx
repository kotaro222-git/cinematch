"use client"

import { Settings } from "lucide-react"
import { NeuralConstellation } from "@/components/profile/neural-constellation"

interface ProfileHeaderProps {
  name: string
  username: string
  avatar: string
  bio: string
  moviesWatched: number
  following: number
  followers: number
  topCategory?: "horror" | "romance" | "action" | "scifi" | "comedy"
  topEmotion?: "tension" | "passion" | "energy" | "wonder" | "joy"
}

export function ProfileHeader({
  name,
  username,
  bio,
  moviesWatched,
  following,
  followers,
  topCategory = "horror",
  topEmotion = "tension",
}: ProfileHeaderProps) {
  return (
    <div className="px-4 pt-6 pb-4">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="relative h-14 w-14 overflow-hidden rounded-full border-2 border-primary/30 bg-muted">
            <div className="flex h-full w-full items-center justify-center text-xl font-bold text-foreground">
              {name.charAt(0)}
            </div>
          </div>
          <div>
            <h1 className="text-lg font-bold text-foreground">{name}</h1>
            <p className="text-sm text-muted-foreground">@{username}</p>
          </div>
        </div>
        <button
          type="button"
          className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
        >
          <Settings className="h-5 w-5" />
        </button>
      </div>

      <div className="mt-3 flex items-start justify-between gap-3">
        <div className="flex-1">
          <p className="whitespace-pre-line text-sm text-foreground/80">{bio}</p>
          <div className="mt-3 flex gap-5">
            <div className="text-center">
              <p className="text-lg font-bold text-foreground">{moviesWatched}</p>
              <p className="text-[11px] text-muted-foreground">Watched</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold text-foreground">{following}</p>
              <p className="text-[11px] text-muted-foreground">Following</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold text-foreground">{followers}</p>
              <p className="text-[11px] text-muted-foreground">Followers</p>
            </div>
          </div>
        </div>
        <div className="flex-shrink-0">
          <NeuralConstellation
            category={topCategory}
            emotion={topEmotion}
            width={140}
            height={140}
          />
        </div>
      </div>
    </div>
  )
}
