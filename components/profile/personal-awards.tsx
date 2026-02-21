"use client"

import { useState } from "react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Trophy, ChevronRight } from "lucide-react"

interface Movie {
  id: string
  title: string
  poster: string
  year: number
}

interface AwardCategory {
  id: string
  name: string
  icon: string
  winner: Movie
  rankings: Movie[]
}

interface PersonalAwardsProps {
  awards: AwardCategory[]
}

export function PersonalAwards({ awards }: PersonalAwardsProps) {
  const [selectedAward, setSelectedAward] = useState<AwardCategory | null>(null)

  return (
    <div className="py-4">
      <div className="mb-3 flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Trophy className="size-4 text-primary" />
          <h2 className="text-sm font-semibold text-foreground">My Academy Award</h2>
        </div>
        <span className="text-xs text-muted-foreground">Swipe for more</span>
      </div>

      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-2 px-4">
          {awards.map((award) => (
            <CarouselItem key={award.id} className="basis-[140px] pl-2">
              <button
                type="button"
                onClick={() => setSelectedAward(award)}
                className="group relative w-full overflow-hidden rounded-xl border border-border/50 bg-card transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5"
              >
                <div className="aspect-[2/3] overflow-hidden">
                  <img
                    src={award.winner.poster}
                    alt={award.winner.title}
                    className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                </div>

                <div className="absolute inset-x-0 bottom-0 p-3">
                  <div className="mb-1 flex items-center gap-1">
                    <span className="text-lg">{award.icon}</span>
                    <span className="text-[10px] font-medium uppercase tracking-wider text-primary">
                      #1
                    </span>
                  </div>
                  <p className="truncate text-xs font-semibold text-foreground">
                    {award.name}
                  </p>
                  <p className="mt-0.5 truncate text-[10px] text-muted-foreground">
                    {award.winner.title}
                  </p>
                </div>

                <div className="absolute right-2 top-2 flex size-5 items-center justify-center rounded-full bg-background/80 opacity-0 transition-opacity group-hover:opacity-100">
                  <ChevronRight className="size-3 text-foreground" />
                </div>
              </button>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <Dialog open={!!selectedAward} onOpenChange={() => setSelectedAward(null)}>
        <DialogContent className="max-w-sm border-border bg-card">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-foreground">
              <span className="text-xl">{selectedAward?.icon}</span>
              {selectedAward?.name} Rankings
            </DialogTitle>
          </DialogHeader>
          <div className="mt-2 space-y-3">
            {selectedAward?.rankings.map((movie, index) => (
              <div
                key={movie.id}
                className="flex items-center gap-3 rounded-lg p-2 transition-colors hover:bg-secondary"
              >
                <span
                  className={`flex size-6 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                    index === 0
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground"
                  }`}
                >
                  {index + 1}
                </span>
                <img
                  src={movie.poster}
                  alt={movie.title}
                  className="size-12 rounded object-cover"
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-foreground">
                    {movie.title}
                  </p>
                  <p className="text-xs text-muted-foreground">{movie.year}</p>
                </div>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
