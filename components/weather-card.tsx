interface WeatherCardProps {
  weatherData: {
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
}

export default function WeatherCard({ weatherData }: WeatherCardProps) {
  const { name, main, wind, weather } = weatherData
  const temperature = Math.round(main.temp)
  const condition = weather[0]

  return (
    <div className="backdrop-blur-md bg-white/20 rounded-3xl p-8 shadow-2xl border border-white/30">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-2">{name}</h2>
        <div className="text-6xl font-light text-white mb-4">{temperature}°C</div>
        <p className="text-xl text-white/90 capitalize mb-6">{condition.description}</p>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="text-center">
          <div className="text-2xl font-semibold text-white">{main.humidity}%</div>
          <div className="text-white/80 text-sm uppercase tracking-wide">Humidity</div>
        </div>

        <div className="text-center">
          <div className="text-2xl font-semibold text-white">{Math.round(wind.speed * 3.6)} km/h</div>
          <div className="text-white/80 text-sm uppercase tracking-wide">Wind Speed</div>
        </div>
      </div>

      <div className="mt-6 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm">
          <span className="text-2xl">{getWeatherIcon(condition.main)}</span>
        </div>
      </div>
    </div>
  )
}

function getWeatherIcon(condition: string): string {
  const icons: Record<string, string> = {
    Clear: "☀️",
    Clouds: "☁️",
    Rain: "🌧️",
    Drizzle: "🌦️",
    Thunderstorm: "⛈️",
    Snow: "❄️",
    Mist: "🌫️",
    Fog: "🌫️",
    Haze: "🌫️",
  }

  return icons[condition] || "🌤️"
}
