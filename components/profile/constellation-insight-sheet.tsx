"use client"

import { motion, AnimatePresence } from "framer-motion"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { NeuralConstellation } from "@/components/profile/neural-constellation"

export type CategoryKey = "horror" | "romance" | "action" | "scifi" | "comedy"
export type EmotionKey = "tension" | "passion" | "energy" | "wonder" | "joy"

export interface CategoryStat {
  id: CategoryKey
  name: string
  icon: string
  value: number
  color: string
}

export interface EmotionStat {
  id: EmotionKey
  name: string
  value: number
  color: string
}

const CATEGORY_LABELS: Record<CategoryKey, { name: string; icon: string; color: string }> = {
  horror: { name: "ホラー", icon: "👻", color: "#8B0000" },
  romance: { name: "恋愛", icon: "💕", color: "#C2185B" },
  action: { name: "アクション", icon: "💥", color: "#E65100" },
  scifi: { name: "SF", icon: "🚀", color: "#0D47A1" },
  comedy: { name: "コメディ", icon: "😂", color: "#F9A825" },
}

const EMOTION_LABELS: Record<EmotionKey, { name: string; color: string }> = {
  tension: { name: "緊張感", color: "#8B0000" },
  passion: { name: "情熱", color: "#C2185B" },
  energy: { name: "活力", color: "#E65100" },
  wonder: { name: "畏敬", color: "#0D47A1" },
  joy: { name: "歓喜", color: "#F9A825" },
}

interface ConstellationInsightSheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  topCategory: CategoryKey
  topEmotion: EmotionKey
  categoryStats: Record<CategoryKey, number>
  emotionStats: Record<EmotionKey, number>
}

export function ConstellationInsightSheet({
  open,
  onOpenChange,
  topCategory,
  topEmotion,
  categoryStats,
  emotionStats,
}: ConstellationInsightSheetProps) {
  const categoryList: CategoryStat[] = (Object.keys(CATEGORY_LABELS) as CategoryKey[]).map(
    (id) => ({
      id,
      ...CATEGORY_LABELS[id],
      value: categoryStats[id] ?? 0,
    })
  )
  const emotionList: EmotionStat[] = (Object.keys(EMOTION_LABELS) as EmotionKey[]).map(
    (id) => ({
      id,
      ...EMOTION_LABELS[id],
      value: emotionStats[id] ?? 0,
    })
  )
  const maxCategory = Math.max(...categoryList.map((c) => c.value), 1)
  const maxEmotion = Math.max(...emotionList.map((e) => e.value), 1)

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className="h-[85vh] max-h-[720px] rounded-t-3xl border-t border-border/50 bg-gradient-to-b from-card via-card to-background px-0 pb-10"
      >
        <SheetHeader className="px-6 pb-2 text-left">
          <SheetTitle className="text-base font-medium text-foreground/90">
            映画マインドの星座
          </SheetTitle>
        </SheetHeader>

        <div className="overflow-y-auto px-6 pb-10">
          {/* 星座のプレビュー */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="mb-8 flex justify-center"
          >
            <div className="rounded-2xl border border-white/5 bg-black/30 p-4 backdrop-blur-sm">
              <NeuralConstellation
                category={topCategory}
                emotion={topEmotion}
                width={160}
                height={160}
              />
            </div>
          </motion.div>

          {/* 好きなカテゴリ */}
          <motion.section
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="mb-8"
          >
            <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold tracking-tight text-foreground">
              <span className="text-primary">◆</span>
              好きなカテゴリ
            </h3>
            <div className="space-y-3">
              <AnimatePresence mode="popLayout">
                {categoryList
                  .sort((a, b) => b.value - a.value)
                  .map((cat, i) => (
                    <motion.div
                      key={cat.id}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 * i, duration: 0.3 }}
                      className="group"
                    >
                      <div className="mb-1.5 flex items-center justify-between">
                        <span className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span className="text-base">{cat.icon}</span>
                          {cat.name}
                        </span>
                        <span className="text-xs font-medium tabular-nums text-foreground/80">
                          {cat.value}%
                        </span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-white/5">
                        <motion.div
                          className="h-full rounded-full"
                          style={{ backgroundColor: cat.color }}
                          initial={{ width: 0 }}
                          animate={{
                            width: `${(cat.value / maxCategory) * 100}%`,
                          }}
                          transition={{
                            delay: 0.1 + i * 0.05,
                            duration: 0.6,
                            ease: [0.25, 0.46, 0.45, 0.94],
                          }}
                        />
                      </div>
                    </motion.div>
                  ))}
              </AnimatePresence>
            </div>
          </motion.section>

          {/* 高評価時の感情 */}
          <motion.section
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.14, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold tracking-tight text-foreground">
              <span className="text-primary">◆</span>
              高評価時の感情
            </h3>
            <p className="mb-4 text-[11px] leading-relaxed text-muted-foreground">
              映画を高く評価した際に、どの感情が強く動いたかの傾向です
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              {emotionList.map((emotion, i) => (
                <motion.div
                  key={emotion.id}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.08 + i * 0.04, duration: 0.35 }}
                  className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.02] p-3 backdrop-blur-sm transition-colors hover:border-white/10 hover:bg-white/[0.04]"
                >
                  <div
                    className="h-9 w-9 flex-shrink-0 rounded-lg flex items-center justify-center"
                    style={{
                      backgroundColor: `${emotion.color}22`,
                      boxShadow: `0 0 20px ${emotion.color}20`,
                    }}
                  >
                    <div
                      className="h-2.5 w-2.5 rounded-full"
                      style={{ backgroundColor: emotion.color }}
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-medium text-foreground">
                      {emotion.name}
                    </p>
                    <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-white/5">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ backgroundColor: emotion.color }}
                        initial={{ width: 0 }}
                        animate={{
                          width: `${(emotion.value / maxEmotion) * 100}%`,
                        }}
                        transition={{
                          delay: 0.2 + i * 0.05,
                          duration: 0.5,
                          ease: [0.25, 0.46, 0.45, 0.94],
                        }}
                      />
                    </div>
                  </div>
                  <span className="text-[11px] font-semibold tabular-nums text-foreground/70">
                    {emotion.value}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.section>
        </div>
      </SheetContent>
    </Sheet>
  )
}
