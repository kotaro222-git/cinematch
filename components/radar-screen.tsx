"use client"

import { useEffect, useRef, useState } from "react"
import * as THREE from "three"

const imageUrls = [
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1544005313945-3f2917c472ef?w=400&h=400&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1534528741775-5658abf45f1d?w=400&h=400&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1519345182560-3f2988babdf9?w=400&h=400&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1517841905240-b1c1722653e1?w=400&h=400&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=400&h=400&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=400&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&h=400&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=400&h=400&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1463453091185-61582044d556?w=400&h=400&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&h=400&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400&h=400&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?w=400&h=400&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1521119989659-a83eee488004?w=400&h=400&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?w=400&h=400&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1552058544-f2b08422138a?w=400&h=400&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1496440737103-cd596325d314?w=400&h=400&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?w=400&h=400&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1504257432389-52343af06ae3?w=400&h=400&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=400&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=400&h=400&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1485875437517-e32da4c3d028?w=400&h=400&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1514315384763-ba401779410f?w=400&h=400&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1487412720507-e32da4c3d028?w=400&h=400&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1504199367641-ebb94b2b6a24?w=400&h=400&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1506794778202-cad84cf4ff4e?w=400&h=400&fit=crop&crop=face",
]

export function RadarScreen() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    const rect = container.getBoundingClientRect()
    const width = rect.width || container.clientWidth || 400
    const height = rect.height || container.clientHeight || 700

    const radius = 5
    const cardCount = 30
    const rows = 3
    const friction = 0.96
    const rowSpacing = 1.6

    let isDragging = false
    let previousMouseX = 0
    let rotationVelocity = 0

    const scene = new THREE.Scene()
    scene.fog = new THREE.FogExp2(0x000000, 0.05)

    const camera = new THREE.PerspectiveCamera(70, width / height, 0.1, 1000)
    camera.position.z = 11
    camera.position.y = 0

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    container.appendChild(renderer.domElement)

    const cylinderGroup = new THREE.Group()
    scene.add(cylinderGroup)

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9)
    scene.add(ambientLight)

    const pointLight = new THREE.PointLight(0xffffff, 1)
    pointLight.position.set(0, 10, 10)
    scene.add(pointLight)

    const baseCardSize = 1.5
    const cardsPerRow = cardCount / rows

    const loadImageElement = (url: string): Promise<HTMLImageElement> => {
      return new Promise((resolve, reject) => {
        const img = new window.Image()
        img.crossOrigin = "anonymous"
        img.onload = () => resolve(img)
        img.onerror = () => reject(new Error("load failed"))
        img.src = url
      })
    }

    const createMatchOverlay = (loadedImg: HTMLImageElement | null, matchPercent: number, fallbackColor: string) => {
      const size = 512
      const canvas = document.createElement("canvas")
      canvas.width = size
      canvas.height = size
      const ctx = canvas.getContext("2d")!

      if (loadedImg) {
        ctx.drawImage(loadedImg, 0, 0, size, size)
      } else {
        ctx.fillStyle = fallbackColor
        ctx.fillRect(0, 0, size, size)
      }

      const gradient = ctx.createLinearGradient(0, size * 0.6, 0, size)
      gradient.addColorStop(0, "rgba(0,0,0,0)")
      gradient.addColorStop(0.5, "rgba(0,0,0,0.5)")
      gradient.addColorStop(1, "rgba(0,0,0,0.85)")
      ctx.fillStyle = gradient
      ctx.fillRect(0, size * 0.6, size, size * 0.4)

      ctx.save()
      ctx.translate(size, 0)
      ctx.scale(-1, 1)

      ctx.textAlign = "center"
      ctx.textBaseline = "middle"

      const percentStr = `${matchPercent}%`
      ctx.font = "bold 72px -apple-system, BlinkMacSystemFont, sans-serif"
      ctx.fillStyle = matchPercent >= 80 ? "#4ade80" : matchPercent >= 60 ? "#facc15" : "#f87171"
      ctx.fillText(percentStr, size / 2, size * 0.82)

      ctx.font = "500 28px -apple-system, BlinkMacSystemFont, sans-serif"
      ctx.fillStyle = "rgba(255,255,255,0.7)"
      ctx.fillText("Match", size / 2, size * 0.93)

      ctx.restore()

      const tex = new THREE.CanvasTexture(canvas)
      tex.needsUpdate = true
      return tex
    }

    const matchPercentages: number[] = []
    for (let i = 0; i < cardCount; i++) {
      matchPercentages.push(Math.floor(Math.random() * 40 + 30) + Math.floor(Math.random() * 30))
    }

    const cardGeometry = new THREE.PlaneGeometry(baseCardSize, baseCardSize)

    for (let i = 0; i < cardCount; i++) {
      const rowIdx = Math.floor(i / cardsPerRow)
      const colIdx = i % cardsPerRow

      const offsetAngle = (rowIdx % 2) * (Math.PI / cardsPerRow)
      const angle = (colIdx / cardsPerRow) * Math.PI * 2 + offsetAngle

      const url = imageUrls[i % imageUrls.length]

      const material = new THREE.MeshBasicMaterial({
        side: THREE.DoubleSide,
        transparent: true,
        color: 0x333333,
      })

      const card = new THREE.Mesh(cardGeometry, material)

      const x = Math.sin(angle) * radius
      const z = Math.cos(angle) * radius
      const y = (rowIdx - Math.floor(rows / 2)) * rowSpacing

      card.position.set(x, y, z)
      card.lookAt(0, y, 0)

      card.userData = {
        baseY: y,
        offset: Math.random() * Math.PI * 2,
        floatSpeed: 0.005 + Math.random() * 0.01,
        matchPercent: matchPercentages[i],
      }

      cylinderGroup.add(card)

      const matchPct = matchPercentages[i]
      loadImageElement(url)
        .then((img) => {
          const overlayTex = createMatchOverlay(img, matchPct, "#444")
          material.map = overlayTex
          material.color.set(0xffffff)
          material.needsUpdate = true
        })
        .catch(() => {
          const overlayTex = createMatchOverlay(null, matchPct, "#444")
          material.map = overlayTex
          material.color.set(0xffffff)
          material.needsUpdate = true
        })
    }

    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      isDragging = true
      const x = "touches" in e ? e.touches[0].clientX : e.clientX
      previousMouseX = x
    }

    const onPointerMove = (e: MouseEvent | TouchEvent) => {
      if (!isDragging) return
      if ("touches" in e) e.preventDefault()

      const x = "touches" in e ? e.touches[0].clientX : e.clientX
      const deltaX = x - previousMouseX

      rotationVelocity += deltaX * 0.0004
      previousMouseX = x
    }

    const onPointerUp = () => {
      isDragging = false
    }

    const onResize = () => {
      const newRect = container.getBoundingClientRect()
      const w = newRect.width || 400
      const h = newRect.height || 700
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }

    container.addEventListener("mousedown", onPointerDown)
    container.addEventListener("mousemove", onPointerMove)
    window.addEventListener("mouseup", onPointerUp)

    container.addEventListener("touchstart", onPointerDown, { passive: false })
    container.addEventListener("touchmove", onPointerMove, { passive: false })
    window.addEventListener("touchend", onPointerUp)

    window.addEventListener("resize", onResize)

    let animationId: number

    const animate = () => {
      animationId = requestAnimationFrame(animate)

      cylinderGroup.rotation.y += rotationVelocity

      if (!isDragging) {
        rotationVelocity *= friction
      }

      const time = Date.now() * 0.001
      cylinderGroup.children.forEach((card) => {
        if (card.userData.baseY !== undefined) {
          card.position.y = card.userData.baseY + Math.sin(time * 2 + card.userData.offset) * 0.05
        }
      })

      renderer.render(scene, camera)
    }

    animate()

    setTimeout(() => {
      setLoading(false)
    }, 500)

    return () => {
      cancelAnimationFrame(animationId)

      container.removeEventListener("mousedown", onPointerDown)
      container.removeEventListener("mousemove", onPointerMove)
      window.removeEventListener("mouseup", onPointerUp)

      container.removeEventListener("touchstart", onPointerDown)
      container.removeEventListener("touchmove", onPointerMove)
      window.removeEventListener("touchend", onPointerUp)

      window.removeEventListener("resize", onResize)

      renderer.dispose()
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
    }
  }, [])

  return (
    <div className="relative h-full w-full overflow-hidden bg-black">
      {loading && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black text-sm text-white/50 transition-opacity duration-500">
          Scanning for matches...
        </div>
      )}
      <div ref={containerRef} className="h-full w-full touch-none" />
      <div className="pointer-events-none absolute bottom-6 w-full text-center text-xs text-white/40 drop-shadow-md">
        Swipe to explore matches
      </div>
    </div>
  )
}
