"use client"

import { useEffect, useRef } from "react"
import { useTheme } from "@/contexts/theme-context"

interface LeadGrowthChartProps {
  timeRange: "7d" | "30d" | "90d"
}

export function LeadGrowthChart({ timeRange }: LeadGrowthChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { theme } = useTheme()
  const isDark = theme === "dark"

  // Generate mock data based on time range
  const generateData = () => {
    const dataPoints = timeRange === "7d" ? 7 : timeRange === "30d" ? 30 : 90
    const data = []

    // Start with a base value
    let value = 5 + Math.random() * 5

    for (let i = 0; i < dataPoints; i++) {
      // Add some randomness but keep a general upward trend
      const change = Math.random() * 3 - 1 // Random value between -1 and 2
      value = Math.max(1, value + change) // Ensure value doesn't go below 1

      // Add occasional spikes for visual interest
      if (Math.random() > 0.9) {
        value += 3 + Math.random() * 2
      }

      data.push(Math.round(value))
    }

    return data
  }

  const data = generateData()
  const maxValue = Math.max(...data) * 1.2 // Add 20% padding to the top

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const dpr = window.devicePixelRatio || 1
    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr
    ctx.scale(dpr, dpr)

    // Clear canvas
    ctx.clearRect(0, 0, rect.width, rect.height)

    // Set colors based on theme
    const gridColor = isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"
    const textColor = isDark ? "rgba(255, 255, 255, 0.7)" : "rgba(0, 0, 0, 0.7)"
    const lineColor = "#2be0bc"
    const gradientColor = isDark ? "rgba(43, 224, 188, 0.1)" : "rgba(43, 224, 188, 0.2)"

    // Draw grid lines
    ctx.strokeStyle = gridColor
    ctx.lineWidth = 1

    // Horizontal grid lines
    const gridLines = 5
    for (let i = 0; i <= gridLines; i++) {
      const y = rect.height - (i / gridLines) * rect.height
      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.lineTo(rect.width, y)
      ctx.stroke()

      // Add labels for y-axis
      if (i > 0) {
        const value = Math.round((i / gridLines) * maxValue)
        ctx.fillStyle = textColor
        ctx.font = "10px sans-serif"
        ctx.textAlign = "left"
        ctx.fillText(value.toString(), 5, y - 5)
      }
    }

    // Draw data line
    const xStep = rect.width / (data.length - 1)

    // Create gradient for area under the line
    const gradient = ctx.createLinearGradient(0, 0, 0, rect.height)
    gradient.addColorStop(0, gradientColor)
    gradient.addColorStop(1, "rgba(43, 224, 188, 0)")

    // Draw filled area
    ctx.beginPath()
    ctx.moveTo(0, rect.height)

    data.forEach((value, index) => {
      const x = index * xStep
      const y = rect.height - (value / maxValue) * rect.height
      ctx.lineTo(x, y)
    })

    ctx.lineTo((data.length - 1) * xStep, rect.height)
    ctx.closePath()
    ctx.fillStyle = gradient
    ctx.fill()

    // Draw line
    ctx.beginPath()
    data.forEach((value, index) => {
      const x = index * xStep
      const y = rect.height - (value / maxValue) * rect.height

      if (index === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }
    })

    ctx.strokeStyle = lineColor
    ctx.lineWidth = 2
    ctx.stroke()

    // Draw data points
    data.forEach((value, index) => {
      const x = index * xStep
      const y = rect.height - (value / maxValue) * rect.height

      ctx.beginPath()
      ctx.arc(x, y, 3, 0, Math.PI * 2)
      ctx.fillStyle = lineColor
      ctx.fill()
      ctx.strokeStyle = isDark ? "#1e1e1e" : "#ffffff"
      ctx.lineWidth = 1
      ctx.stroke()
    })

    // Add x-axis labels (only for specific points to avoid crowding)
    const labelInterval = timeRange === "7d" ? 1 : timeRange === "30d" ? 5 : 15
    data.forEach((_, index) => {
      if (index % labelInterval === 0 || index === data.length - 1) {
        const x = index * xStep
        const label =
          timeRange === "7d" ? ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][index % 7] : `Day ${index + 1}`

        ctx.fillStyle = textColor
        ctx.font = "10px sans-serif"
        ctx.textAlign = "center"
        ctx.fillText(label, x, rect.height - 5)
      }
    })
  }, [data, maxValue, isDark, timeRange])

  return (
    <div className="relative w-full h-full">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  )
}
