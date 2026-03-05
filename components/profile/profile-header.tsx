"use client"

import { useState } from "react"
import { Settings } from "lucide-react"
import { NeuralConstellation } from "@/components/profile/neural-constellation"
import {
  ConstellationInsightSheet,
  type CategoryKey,
  type EmotionKey,
} from "@/components/profile/constellation-insight-sheet"

interface ProfileHeaderProps {
  name: string
  username: string
  avatar: string
  bio: string
  moviesWatched: number
  following: number
  followers: number
  topCategory?: CategoryKey
  topEmotion?: EmotionKey
  categoryStats?: Record<CategoryKey, number>
  emotionStats?: Record<EmotionKey, number>
}

const DEFAULT_CATEGORY_STATS: Record<CategoryKey, number> = {
  horror: 28,
  romance: 18,
  action: 24,
  scifi: 16,
  comedy: 14,
}

const DEFAULT_EMOTION_STATS: Record<EmotionKey, number> = {
  tension: 92,
  passion: 58,
  energy: 78,
  wonder: 72,
  joy: 65,
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
  categoryStats = DEFAULT_CATEGORY_STATS,
  emotionStats = DEFAULT_EMOTION_STATS,
}: ProfileHeaderProps) {
  const [insightOpen, setInsightOpen] = useState(false)
  return (
    <div className="px-4 pt-4 pb-3">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2">
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

      <div className="relative mt-2">
        {/* テキストブロックのみが高さを決定（星座は独立） */}
        <div className="pr-[178px]">
          <p className="whitespace-pre-line text-sm text-foreground/80">{bio}</p>
          <div className="mt-2 flex gap-5">
            <div className="text-center">
              <p className="text-lg font-bold text-primary">{moviesWatched}</p>
              <p className="text-[11px] text-muted-foreground">鑑賞済み</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold text-foreground">{following}</p>
              <p className="text-[11px] text-muted-foreground">フォロー</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold text-foreground">{followers}</p>
              <p className="text-[11px] text-muted-foreground">フォロワー</p>
            </div>
          </div>
        </div>
        {/* 星座：absoluteで完全に独立。タップで詳細を表示 */}
        <div className="absolute right-[29px] top-[calc(50%-5px)] -translate-y-1/2">
          <button
            type="button"
            onClick={() => setInsightOpen(true)}
            className="group rounded-xl transition-transform active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            aria-label="星座の詳細を見る"
          >
            <NeuralConstellation
              category={topCategory}
              emotion={topEmotion}
              width={143}
              height={143}
            />
            <span className="absolute inset-0 rounded-xl ring-1 ring-inset ring-white/0 transition-all group-hover:ring-white/10 group-active:ring-white/5" />
          </button>
        </div>

        <ConstellationInsightSheet
          open={insightOpen}
          onOpenChange={setInsightOpen}
          topCategory={topCategory}
          topEmotion={topEmotion}
          categoryStats={categoryStats}
          emotionStats={emotionStats}
        />
      </div>
    </div>
  )
}
