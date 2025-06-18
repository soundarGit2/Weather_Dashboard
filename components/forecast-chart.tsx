"use client"

import { useRef } from "react"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js"
import { Line } from "react-chartjs-2"

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler)

interface ForecastChartProps {
  forecastData: {
    list: Array<{
      dt: number
      main: {
        temp: number
      }
      dt_txt: string
    }>
  }
}

export default function ForecastChart({ forecastData }: ForecastChartProps) {
  const chartRef = useRef<ChartJS<"line">>(null)

  // Extract data for the next 5 days (one reading per day at noon)
  const dailyData = forecastData.list.filter((item, index) => index % 8 === 0).slice(0, 5)

  const labels = dailyData.map((item) => {
    const date = new Date(item.dt * 1000)
    return date.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })
  })

  const temperatures = dailyData.map((item) => Math.round(item.main.temp))

  const data = {
    labels,
    datasets: [
      {
        label: "Temperature (°C)",
        data: temperatures,
        borderColor: "rgba(255, 255, 255, 1)",
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        pointBackgroundColor: "rgba(255, 255, 255, 1)",
        pointBorderColor: "rgba(255, 255, 255, 1)",
        pointBorderWidth: 2,
        pointRadius: 6,
        pointHoverRadius: 8,
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "5-Day Temperature Forecast",
        color: "white",
        font: {
          size: 20,
          weight: "bold" as const,
        },
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        titleColor: "white",
        bodyColor: "white",
        borderColor: "rgba(255, 255, 255, 0.3)",
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: false,
        callbacks: {
          label: (context: any) => `${context.parsed.y}°C`,
        },
      },
    },
    scales: {
      x: {
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
          borderColor: "rgba(255, 255, 255, 0.3)",
        },
        ticks: {
          color: "white",
          font: {
            size: 12,
          },
        },
      },
      y: {
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
          borderColor: "rgba(255, 255, 255, 0.3)",
        },
        ticks: {
          color: "white",
          font: {
            size: 12,
          },
          callback: (value: any) => `${value}°C`,
        },
      },
    },
    elements: {
      point: {
        hoverBackgroundColor: "rgba(255, 255, 255, 1)",
        hoverBorderColor: "rgba(255, 255, 255, 1)",
      },
    },
  }

  return (
    <div className="backdrop-blur-md bg-white/20 rounded-3xl p-8 shadow-2xl border border-white/30">
      <div className="h-80">
        <Line ref={chartRef} data={data} options={options} />
      </div>

      <div className="mt-6 grid grid-cols-5 gap-2">
        {dailyData.map((item, index) => (
          <div key={index} className="text-center">
            <div className="text-white font-semibold text-lg">{Math.round(item.main.temp)}°</div>
            <div className="text-white/70 text-xs">
              {new Date(item.dt * 1000).toLocaleDateString("en-US", { weekday: "short" })}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
