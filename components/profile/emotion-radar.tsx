"use client"

import { useEffect, useState } from "react"

const AXES = [
  { label: "Catharsis", color: "#E63946", value: 0.85 },
  { label: "Tension", color: "#F77F00", value: 0.92 },
  { label: "Wonder", color: "#00B4D8", value: 0.65 },
  { label: "Melancholy", color: "#457B9D", value: 0.70 },
  { label: "Euphoria", color: "#FCBF49", value: 0.55 },
  { label: "Chaos", color: "#D62828", value: 0.80 },
  { label: "Intimacy", color: "#F4ACB7", value: 0.45 },
  { label: "Nostalgia", color: "#606C38", value: 0.75 },
]

const HEAD_CX = 60
const HEAD_CY = 54
const HEAD_R = 12
const BODY_PATH =
  "M 52,66 C 46,70 38,76 36,84 " +
  "L 38,96 L 40,116 L 42,132 " +
  "L 40,160 L 38,182 L 50,184 L 52,162 L 54,136 " +
  "Q 60,132 66,136 " +
  "L 68,162 L 70,184 L 82,182 L 80,160 " +
  "L 78,132 L 80,116 L 82,96 " +
  "L 84,84 C 82,76 74,70 68,66 Z"
const LEFT_ARM_PATH =
  "M 36,84 L 30,60 L 38,36 L 46,26 L 54,28 L 46,38 L 40,60 L 46,78 Z"
const RIGHT_ARM_PATH =
  "M 84,84 L 90,60 L 82,36 L 74,26 L 66,28 L 74,38 L 80,60 L 74,78 Z"
const OSCAR_HEAD_CX = 60
const OSCAR_HEAD_CY = 8
const OSCAR_HEAD_R = 5
const OSCAR_BODY_PATH = "M 57,13 L 56,19 L 57,24 L 63,24 L 64,19 L 63,13 Z"
const OSCAR_BASE_PATH = "M 53,24 L 52,28 L 68,28 L 67,24 Z"
const VIEW_WIDTH = 120
const VIEW_HEIGHT = 190

export function EmotionRadar() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 80)
    return () => clearTimeout(timer)
  }, [])

  const totalValue = AXES.reduce((sum, a) => sum + a.value, 0)
  let currentY = 0
  const stripes = AXES.map((axis) => {
    const height = (axis.value / totalValue) * VIEW_HEIGHT
    const stripe = { y: currentY, height, color: axis.color }
    currentY += height
    return stripe
  })

  return (
    <div className="flex items-center gap-2">
      <div className="h-[132px] w-[96px] flex-shrink-0">
        <svg
          viewBox={`0 0 ${VIEW_WIDTH} ${VIEW_HEIGHT}`}
          className="h-full w-full"
        >
          <defs>
            <clipPath id="person-clip">
              <circle cx={OSCAR_HEAD_CX} cy={OSCAR_HEAD_CY} r={OSCAR_HEAD_R} />
              <path d={OSCAR_BODY_PATH} />
              <path d={OSCAR_BASE_PATH} />
              <path d={LEFT_ARM_PATH} />
              <path d={RIGHT_ARM_PATH} />
              <circle cx={HEAD_CX} cy={HEAD_CY} r={HEAD_R} />
              <path d={BODY_PATH} />
            </clipPath>
          </defs>

          <g clipPath="url(#person-clip)">
            {stripes.map((stripe, i) => (
              <rect
                key={i}
                x="0"
                y={stripe.y}
                width={VIEW_WIDTH}
                height={stripe.height + 0.5}
                fill={stripe.color}
                opacity={visible ? 0.9 : 0}
                style={{
                  transition: "opacity 0.5s ease-out",
                  transitionDelay: `${i * 70}ms`,
                }}
              />
            ))}
          </g>

          <circle
            cx={OSCAR_HEAD_CX}
            cy={OSCAR_HEAD_CY}
            r={OSCAR_HEAD_R}
            fill="none"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="0.8"
          />
          <path
            d={OSCAR_BODY_PATH}
            fill="none"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="0.8"
          />
          <path
            d={OSCAR_BASE_PATH}
            fill="none"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="0.8"
          />
          <path
            d={LEFT_ARM_PATH}
            fill="none"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="0.8"
          />
          <path
            d={RIGHT_ARM_PATH}
            fill="none"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="0.8"
          />
          <circle
            cx={HEAD_CX}
            cy={HEAD_CY}
            r={HEAD_R}
            fill="none"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="0.8"
          />
          <path
            d={BODY_PATH}
            fill="none"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="0.8"
          />
        </svg>
      </div>

      <div className="flex flex-col gap-[5px]">
        {AXES.map((axis, i) => (
          <div key={i} className="flex items-center gap-1.5">
            <div
              className="h-[6px] w-[6px] rounded-full flex-shrink-0"
              style={{ backgroundColor: axis.color }}
            />
            <span className="text-[9px] leading-tight text-muted-foreground/70">
              {axis.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
