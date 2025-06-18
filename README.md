# Weather Dashboard

A beautiful, responsive weather dashboard built with Next.js, Tailwind CSS, and Chart.js.

## Features

- 🌍 **Geolocation**: Automatically detects user location
- 🌤️ **Current Weather**: Shows temperature, humidity, wind speed, and conditions
- 📈 **5-Day Forecast**: Interactive temperature chart
- 🎨 **Glassmorphism Design**: Modern UI with backdrop blur effects
- 📱 **Responsive**: Works on all device sizes

## Setup Instructions

### 1. Get OpenWeatherMap API Key
1. Visit [OpenWeatherMap](https://openweathermap.org/api)
2. Sign up for a free account
3. Generate an API key

### 2. Environment Variables
Create a `.env.local` file in the root directory:
\`\`\`
NEXT_PUBLIC_OPENWEATHER_API_KEY=your_api_key_here
\`\`\`

### 3. Install Dependencies
\`\`\`bash
npm install
\`\`\`

### 4. Run Development Server
\`\`\`bash
npm run dev
\`\`\`

### 5. Deploy to Vercel
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy!

## Technologies Used

- **Next.js 15**: React framework with App Router
- **Tailwind CSS**: Utility-first CSS framework
- **Chart.js & react-chartjs-2**: Interactive charts
- **OpenWeatherMap API**: Weather data source
- **Geolocation API**: User location detection

## Browser Permissions

The app requires location permission to fetch weather data for your area. Make sure to allow location access when prompted.
