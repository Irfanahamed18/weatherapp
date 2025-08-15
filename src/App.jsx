import React, { useState } from "react";

export default function WeatherApp() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const API_KEY = "9d114bf26b6575e6f65e075124340036";

  const fetchWeather = async () => {
    if (!city) return;
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      const data = await res.json();
      if (data.cod === 200) {
        setWeather(data);
      } else {
        setWeather(null);
        alert("City not found!");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-200 via-blue-300 to-blue-400 p-4">
      <h1 className="text-4xl font-bold text-gray-900 mb-6">🌤 Weather App</h1>

      <div className="flex gap-2 w-full max-w-md">
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900"
        />
        <button
          onClick={fetchWeather}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-md"
        >
          Search
        </button>
      </div>

      {weather && (
        <div className="mt-8 bg-white/80 backdrop-blur-md rounded-xl p-6 shadow-lg text-center w-full max-w-md">
          <h2 className="text-2xl font-bold text-gray-800">{weather.name}</h2>
          <p className="text-gray-700 text-lg">{weather.weather[0].description}</p>
          <p className="text-5xl font-extrabold text-blue-700 mt-2">
            {weather.main.temp}°C
          </p>
          <div className="flex justify-around mt-4 text-gray-700">
            <p>💧 Humidity: {weather.main.humidity}%</p>
            <p>💨 Wind: {weather.wind.speed} m/s</p>
          </div>
        </div>
      )}
    </div>
  );
}
