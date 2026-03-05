"use client"

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  LucideChevronLeft,
  LucideInfo,
  LucideClapperboard,
  LucideStar,
} from "lucide-react"

// Mock data for person-to-person matching
const AVATAR_DATA = [
  {
    id: 1,
    name: "Haruki",
    img: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop&crop=face",
    match: 98,
    aura: "Cinephile / Sci-Fi Enthusiast",
  },
  {
    id: 2,
    name: "Sakura",
    img: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop&crop=face",
    match: 94,
    aura: "Romantic Comedy Lover",
  },
  {
    id: 3,
    name: "Kenji",
    img: "https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop&crop=face",
    match: 92,
    aura: "Horror Aficionado",
  },
  {
    id: 4,
    name: "Mika",
    img: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop&crop=face",
    match: 89,
    aura: "Indie Film Curator",
  },
  {
    id: 5,
    name: "Ren",
    img: "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop&crop=face",
    match: 87,
    aura: "Documentary Enthusiast",
  },
  {
    id: 6,
    name: "Yuki",
    img: "https://images.pexels.com/photos/1484794/pexels-photo-1484794.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop&crop=face",
    match: 85,
    aura: "Noir & Thriller Fan",
  },
  {
    id: 7,
    name: "Hiro",
    img: "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop&crop=face",
    match: 82,
    aura: "Action Blockbuster Lover",
  },
  {
    id: 8,
    name: "Aoi",
    img: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop&crop=face",
    match: 80,
    aura: "Animation & Studio Ghibli",
  },
  {
    id: 9,
    name: "Takumi",
    img: "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop&crop=face",
    match: 78,
    aura: "Classic Cinema Buff",
  },
  {
    id: 10,
    name: "Nana",
    img: "https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop&crop=face",
    match: 75,
    aura: "International Film Fan",
  },
]

const InkBloomBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden bg-black -z-10">
      {/* Indigo Cloud */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          x: [-20, 20, -20],
          y: [-20, 30, -20],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 -left-1/4 w-[80%] h-[80%] rounded-full bg-indigo-900/30 blur-[120px]"
      />
      {/* Emerald Cloud */}
      <motion.div
        animate={{
          scale: [1.2, 1, 1.2],
          x: [30, -30, 30],
          y: [40, -40, 40],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-1/4 -right-1/4 w-[70%] h-[70%] rounded-full bg-emerald-900/20 blur-[100px]"
      />
      {/* Burgundy Cloud */}
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          x: [0, 50, 0],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] rounded-full bg-rose-950/25 blur-[140px]"
      />
    </div>
  )
}

type AvatarData = (typeof AVATAR_DATA)[number]

const OrbitingAvatar = ({
  avatar,
  index,
  total,
  onFocus,
  isFocused,
}: {
  avatar: AvatarData
  index: number
  total: number
  onFocus: (avatar: AvatarData) => void
  isFocused: boolean
}) => {
  const angleOffset = (index / total) * Math.PI * 2
  const [rotation, setRotation] = useState(0)

  useEffect(() => {
    let frame: number
    const animate = () => {
      setRotation((prev) => prev + 0.002)
      frame = requestAnimationFrame(animate)
    }
    animate()
    return () => cancelAnimationFrame(frame)
  }, [])

  const currentAngle = angleOffset + rotation
  const radiusX = 140

  const x = Math.cos(currentAngle) * radiusX
  const z = Math.sin(currentAngle)
  const y =
    Math.sin(currentAngle * 0.5) * 40 + Math.sin(currentAngle) * 60

  const scale = 0.6 + (z + 1) * 0.25
  const opacity = 0.4 + (z + 1) * 0.3
  const zIndex = Math.round((z + 1) * 100)

  return (
    <div
      className="absolute top-1/2 left-1/2 transition-all duration-300 ease-out"
      style={{
        transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) scale(${isFocused ? 1.4 : scale})`,
        zIndex: isFocused ? 200 : zIndex,
        opacity: isFocused ? 1 : opacity,
      }}
      onClick={() => onFocus(avatar)}
    >
      {/* Trail Line */}
      <svg className="absolute top-1/2 left-1/2 -z-10 w-[400px] h-[400px] -translate-x-1/2 -translate-y-1/2 pointer-events-none overflow-visible">
        <motion.line
          x1="200"
          y1="200"
          x2={200 - x}
          y2={200 - y}
          stroke="white"
          strokeWidth="0.5"
          strokeOpacity={0.15}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2 }}
        />
      </svg>

      <div className="relative group cursor-pointer">
        <div
          className={`
          w-16 h-16 rounded-full border border-white/10 overflow-hidden ring-offset-2 ring-offset-black
          ${isFocused ? "ring-2 ring-white/40" : "ring-0"}
          transition-all duration-500
        `}
        >
          <img
            src={avatar.img}
            alt={avatar.name}
            className="w-full h-full object-cover object-top group-hover:brightness-110 transition-all"
          />
        </div>

        {/* Match Badge */}
        <AnimatePresence>
          {isFocused && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 5, scale: 0.8 }}
              className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap"
            >
              <div className="px-2 py-0.5 bg-white text-black text-[10px] font-bold tracking-tighter rounded-full flex items-center gap-1 shadow-lg shadow-white/10 uppercase">
                <LucideStar size={8} fill="currentColor" />
                {avatar.match}% Match
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export function RadarScreen() {
  const [focusedAvatar, setFocusedAvatar] = useState<AvatarData | null>(null)
  const [searching, setSearching] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setSearching(false), 2000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="relative w-full h-full min-h-0 bg-black text-white font-sans overflow-hidden flex flex-col">
      <InkBloomBackground />

      {/* Header */}
      <header className="relative z-50 flex items-center justify-between p-6 pt-12">
        <button
          type="button"
          className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 backdrop-blur-md"
        >
          <LucideChevronLeft size={20} />
        </button>
        <div className="text-center">
          <h1 className="text-xs font-bold tracking-[0.3em] uppercase opacity-50">
            Discovery
          </h1>
          <p className="text-lg font-light tracking-tight">CineMatch</p>
        </div>
        <button
          type="button"
          className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 backdrop-blur-md"
        >
          <LucideInfo size={18} />
        </button>
      </header>

      {/* Main Experience */}
      <main className="flex-1 relative">
        {/* Center Anchor */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
          <motion.div
            animate={
              searching
                ? {
                    scale: [1, 1.1, 1],
                    opacity: [0.5, 1, 0.5],
                  }
                : {}
            }
            transition={{ duration: 2, repeat: Infinity }}
            className="w-24 h-24 rounded-full border border-white/20 p-1 flex items-center justify-center relative"
          >
            <div className="absolute inset-0 rounded-full border border-white/5 animate-ping opacity-20" />
            <div className="w-full h-full rounded-full overflow-hidden border border-white/40">
              <img
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&fit=crop"
                alt="Your Profile"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          <div className="mt-4 text-center">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-[10px] font-medium uppercase tracking-[0.2em] text-indigo-300"
            >
              {searching ? "Finding Cinephile Matches..." : "Matches Found"}
            </motion.p>
          </div>
        </div>

        {/* Orbiting Elements */}
        {!searching &&
          AVATAR_DATA.map((avatar, idx) => (
            <OrbitingAvatar
              key={avatar.id}
              avatar={avatar}
              index={idx}
              total={AVATAR_DATA.length}
              isFocused={focusedAvatar?.id === avatar.id}
              onFocus={setFocusedAvatar}
            />
          ))}
      </main>

      {/* Footer Controls */}
      <footer className="relative z-50 p-8 pb-12 flex flex-col gap-6 items-center">
        <AnimatePresence mode="wait">
          {focusedAvatar ? (
            <motion.div
              key="details"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="text-center"
            >
              <h2 className="text-2xl font-light tracking-tight mb-1">
                {focusedAvatar.name}
              </h2>
              <p className="text-[10px] uppercase tracking-widest opacity-60">
                {focusedAvatar.aura}
              </p>
            </motion.div>
          ) : (
            <motion.p
              key="hint"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              className="text-[11px] uppercase tracking-[0.3em] font-medium"
            >
              Tap a person to view details
            </motion.p>
          )}
        </AnimatePresence>

        <div className="flex items-center gap-4 w-full max-w-xs">
          <button
            type="button"
            className="flex-1 py-4 rounded-2xl bg-white text-black font-bold text-xs uppercase tracking-widest hover:bg-white/90 transition-colors"
          >
            Start Sync
          </button>
          <button
            type="button"
            className="w-14 h-14 flex items-center justify-center rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md"
          >
            <LucideClapperboard size={20} />
          </button>
        </div>
      </footer>

      {/* Vignette Overlays */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,black_90%)] opacity-60" />
      <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-black to-transparent" />
      <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-black to-transparent" />
    </div>
  )
}
