import React, { useState } from "react";
import axios from "axios";

export default function Weather({ onCityChange }) {
  const [city, setCity] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [weather, setWeather] = useState({});

  function displayWeather(response) {
    setLoaded(true);
    setWeather({
      temperature: response.data.main.temp,
      wind: response.data.wind.speed,
      humidity: response.data.main.humidity,
      icon: `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
      description: response.data.weather[0].description,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (onCityChange) {
      onCityChange(city);
    }
    
    const apiKey = "3fd91e83d21c4db97b409a3e896f8db6";
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayWeather);
  }

  function updateCity(event) {
    setCity(event.target.value);
  }

    return (
  <div className="weather-app">
    <div className="search-bar">
      <form onSubmit={handleSubmit} className="search-form">
        <input
        type="search"
        className="search-form-input"
        placeholder="Enter a city"
        onChange={updateCity}
      />

      <button type="submit" className="search-form-button">
        Submit
      </button>
    </form>
    </div>

   
    {loaded && (
      <div className="weather-results">
        {/* Weather icon above city name */}
        <div className="weather-icon">
          <img src={weather.icon} alt={weather.description} />
        </div>
    

       
        <h1 className="weather-city">{city}</h1>

        <ul className="weather-details">
          <li>Temperature: {Math.round(weather.temperature)}°C</li>
          <li>Description: {weather.description}</li>
          <li>Humidity: {weather.humidity}%</li>
          <li>Wind: {weather.wind} km/h</li>
        </ul>
      </div>
    )}
  </div>
    );
  }
