"use client"

import { useEffect, useId, useMemo, useRef } from "react"

const EMOTION_COLORS: Record<string, string> = {
  tension: "#8B0000",
  passion: "#C2185B",
  energy: "#E65100",
  wonder: "#0D47A1",
  joy: "#F9A825",
}

type Category = "horror" | "romance" | "action" | "scifi" | "comedy"
type Emotion = "tension" | "passion" | "energy" | "wonder" | "joy"

const CATEGORY_PATTERNS: Record<Category, { points: [number, number][]; edges: [number, number][] }> = {
  horror: {
    points: [
      [0.50, 0.10],
      [0.15, 0.28],
      [0.85, 0.22],
      [0.28, 0.60],
      [0.75, 0.55],
      [0.50, 0.90],
      [0.10, 0.80],
    ],
    edges: [
      [0, 1], [0, 2], [1, 3], [2, 4], [3, 5],
      [4, 5], [3, 6], [0, 4], [1, 6], [2, 5],
    ],
  },
  romance: {
    points: [
      [0.50, 0.18],
      [0.25, 0.35],
      [0.75, 0.35],
      [0.20, 0.58],
      [0.80, 0.58],
      [0.50, 0.85],
    ],
    edges: [
      [0, 1], [0, 2], [1, 3], [2, 4], [3, 5],
      [4, 5], [1, 2], [3, 4],
    ],
  },
  action: {
    points: [
      [0.50, 0.10],
      [0.15, 0.25],
      [0.85, 0.25],
      [0.35, 0.55],
      [0.65, 0.55],
      [0.50, 0.90],
      [0.10, 0.70],
      [0.90, 0.70],
    ],
    edges: [
      [0, 1], [0, 2], [1, 3], [2, 4], [3, 5],
      [4, 5], [1, 6], [2, 7], [3, 6], [4, 7],
      [0, 3], [0, 4],
    ],
  },
  scifi: {
    points: [
      [0.50, 0.15],
      [0.22, 0.32],
      [0.78, 0.32],
      [0.15, 0.60],
      [0.85, 0.60],
      [0.35, 0.82],
      [0.65, 0.82],
    ],
    edges: [
      [0, 1], [0, 2], [1, 3], [2, 4], [3, 5],
      [4, 6], [5, 6], [1, 2], [3, 4], [0, 5], [0, 6],
    ],
  },
  comedy: {
    points: [
      [0.50, 0.20],
      [0.28, 0.38],
      [0.72, 0.38],
      [0.22, 0.65],
      [0.78, 0.65],
      [0.50, 0.80],
    ],
    edges: [
      [0, 1], [0, 2], [1, 3], [2, 4], [3, 5],
      [4, 5], [1, 2], [3, 4], [0, 5],
    ],
  },
}

interface NeuralConstellationProps {
  category?: Category
  emotion?: Emotion
  width?: number
  height?: number
}

export function NeuralConstellation({
  category = "horror",
  emotion = "tension",
  width = 180,
  height = 180,
}: NeuralConstellationProps) {
  const color = EMOTION_COLORS[emotion]
  const pattern = CATEGORY_PATTERNS[category]
  const uid = useId().replace(/:/g, "")
  const styleRef = useRef<HTMLStyleElement | null>(null)

  const { points, edges } = useMemo(() => {
    const pad = 14
    const pts = pattern.points.map(([px, py]) => ({
      x: pad + px * (width - pad * 2),
      y: pad + py * (height - pad * 2),
    }))
    return { points: pts, edges: pattern.edges }
  }, [pattern, width, height])

  const pulseEdges = useMemo(() => {
    const indices: number[] = []
    const step = Math.max(1, Math.floor(edges.length / 3))
    for (let i = 0; i < edges.length; i += step) {
      indices.push(i)
    }
    return indices
  }, [edges])

  useEffect(() => {
    const keyframes = pulseEdges.map((edgeIdx, pulseIdx) => {
      const [from, to] = edges[edgeIdx]
      const p1 = points[from]
      const p2 = points[to]
      const dx = p2.x - p1.x
      const dy = p2.y - p1.y
      const length = Math.sqrt(dx * dx + dy * dy)
      const dashLen = 6
      return `
        @keyframes nc${uid}p${edgeIdx} {
          0% { stroke-dashoffset: ${dashLen}; stroke-opacity: 0; }
          5% { stroke-opacity: 0.9; }
          30% { stroke-dashoffset: ${-length}; stroke-opacity: 0.9; }
          35% { stroke-opacity: 0; }
          100% { stroke-opacity: 0; stroke-dashoffset: ${-length}; }
        }
      `
    }).join("\n")

    const el = document.createElement("style")
    el.textContent = keyframes
    document.head.appendChild(el)
    styleRef.current = el

    return () => {
      if (styleRef.current) {
        document.head.removeChild(styleRef.current)
        styleRef.current = null
      }
    }
  }, [uid, pulseEdges, edges, points])

  const filterId = (name: string) => `${uid}${name}`

  return (
    <div className="relative overflow-hidden rounded-xl" style={{ width, height }}>
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        className="absolute inset-0"
      >
        <defs>
          <filter id={filterId("gd")} x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id={filterId("gl")} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id={filterId("cg")} x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="8" />
          </filter>
          <radialGradient id={filterId("bg")} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={color} stopOpacity="0.18" />
            <stop offset="70%" stopColor={color} stopOpacity="0.05" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </radialGradient>
        </defs>

        <rect x="0" y="0" width={width} height={height} fill={`url(#${filterId("bg")})`} />

        {edges.map(([from, to], i) => (
          <line
            key={`ge-${i}`}
            x1={points[from].x}
            y1={points[from].y}
            x2={points[to].x}
            y2={points[to].y}
            stroke={color}
            strokeWidth={3}
            strokeOpacity={0.12}
            filter={`url(#${filterId("cg")})`}
          />
        ))}

        {edges.map(([from, to], i) => (
          <line
            key={`e-${i}`}
            x1={points[from].x}
            y1={points[from].y}
            x2={points[to].x}
            y2={points[to].y}
            stroke="rgba(255,255,255,0.18)"
            strokeWidth={0.5}
            filter={`url(#${filterId("gl")})`}
          />
        ))}

        {pulseEdges.map((edgeIdx, pulseIdx) => {
          const [from, to] = edges[edgeIdx]
          const p1 = points[from]
          const p2 = points[to]
          const dx = p2.x - p1.x
          const dy = p2.y - p1.y
          const length = Math.sqrt(dx * dx + dy * dy)
          const dashLen = 6

          return (
            <line
              key={`pu-${edgeIdx}`}
              x1={p1.x}
              y1={p1.y}
              x2={p2.x}
              y2={p2.y}
              stroke="white"
              strokeWidth={1.5}
              strokeOpacity={0}
              strokeDasharray={`${dashLen} ${length + dashLen}`}
              filter={`url(#${filterId("gd")})`}
              style={{
                animation: `nc${uid}p${edgeIdx} 3s ${pulseIdx * 1}s ease-in-out infinite`,
              }}
            />
          )
        })}

        {points.map((pt, i) => (
          <circle
            key={`gc-${i}`}
            cx={pt.x}
            cy={pt.y}
            r={5}
            fill={color}
            opacity={0.3}
            filter={`url(#${filterId("cg")})`}
          />
        ))}

        {points.map((pt, i) => (
          <circle
            key={`c-${i}`}
            cx={pt.x}
            cy={pt.y}
            r={1.5}
            fill="white"
            filter={`url(#${filterId("gd")})`}
          />
        ))}
      </svg>
    </div>
  )
}
