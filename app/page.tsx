"use client"

import { useState, useEffect } from "react"
import WeatherCard from "@/components/weather-card"
import ForecastChart from "@/components/forecast-chart"

interface WeatherData {
  name: string
  main: {
    temp: number
    humidity: number
  }
  wind: {
    speed: number
  }
  weather: Array<{
    main: string
    description: string
  }>
}

interface ForecastData {
  list: Array<{
    dt: number
    main: {
      temp: number
    }
    dt_txt: string
  }>
}

export default function App() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null)
  const [forecastData, setForecastData] = useState<ForecastData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        // Get user's location
        const position = await getCurrentPosition()
        const { latitude, longitude } = position.coords

        const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY || "demo-key"

        // Fetch current weather
        const weatherResponse = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`,
        )

        if (!weatherResponse.ok) {
          throw new Error("Failed to fetch weather data")
        }

        const weather = await weatherResponse.json()
        setWeatherData(weather)

        // Fetch 5-day forecast
        const forecastResponse = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`,
        )

        if (!forecastResponse.ok) {
          throw new Error("Failed to fetch forecast data")
        }

        const forecast = await forecastResponse.json()
        setForecastData(forecast)
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred")
      } finally {
        setLoading(false)
      }
    }

    fetchWeatherData()
  }, [])

  const getCurrentPosition = (): Promise<GeolocationPosition> => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error("Geolocation is not supported by this browser"))
        return
      }

      navigator.geolocation.getCurrentPosition(resolve, reject, {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      })
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 flex items-center justify-center">
        <div className="text-white text-2xl font-semibold animate-pulse">Loading weather data...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 flex items-center justify-center">
        <div className="text-white text-xl font-semibold bg-red-500/20 backdrop-blur-sm rounded-lg p-6">
          Error: {error}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 p-4">
      <div className="container mx-auto max-w-6xl">
        <h1 className="text-4xl font-bold text-white text-center mb-8 drop-shadow-lg">Weather Dashboard</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {weatherData && (
            <div className="lg:col-span-1">
              <WeatherCard weatherData={weatherData} />
            </div>
          )}

          {forecastData && (
            <div className="lg:col-span-1">
              <ForecastChart forecastData={forecastData} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
