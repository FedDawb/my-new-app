import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Weather({ city, onCityChange }) {
  const [inputCity, setInputCity] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [weather, setWeather] = useState({});
  const [forecast, setForcast] =useState([]);
  const [unit, setUnit] = useState("C");

  useEffect(()=>{
      const apiKey = "3fd91e83d21c4db97b409a3e896f8db6";

      //current
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
      axios.get(apiUrl).then(displayWeather);
   


     // forecast
     const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
     axios.get(forecastUrl).then((response) => {
      const dailyForecast = response.data.list.filter((item) =>
        item.dt_txt.includes("12:00")
    );
     setForcast(dailyForecast);
     });
 },[city]);



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
    if (inputCity.trim() !== "") {
      onCityChange(inputCity);
      setInputCity("");
    }
  }

   function toggleUnit() {
    setUnit(unit === "C" ? "F" : "C");
  }

  function displayTemp(tempCelsius) {
    return unit === "C" 
      ? Math.round(tempCelsius)
      :Math.round((tempCelsius * 9) / 5 + 32);
  }
    
    return (
  <div className="weather-app">
    <div className="search-bar">
      <form onSubmit={handleSubmit} className="search-form">
        <input
        type="search"
        className="search-form-input"
        placeholder="Enter a city"
        value={inputCity}
        onChange={(e) => setInputCity(e.target.value)}/>
    

      <button type="submit" className="search-form-button">
        Submit
      </button>
    </form>
    </div>

   
    {loaded && (
      <div className="weather-results">
        <div className="weather-icon">
          <img src={weather.icon} alt={weather.description} />
        </div>
    
        <h1 className="weather-city">{city}</h1>

      <div className="weather-temp">
      <span style={{ fontSize: "48px", fontWeight: "bold" }}>
        {displayTemp(weather.temperature)}
      </span>
      <span
        style={{ cursor: "pointer", marginLeft: "5px" }}
        onClick={toggleUnit}
      >
        °{unit}
      </span>
    </div>

        <ul className="weather-details">
          <li>Description: {weather.description}</li>
          <li>Humidity: {weather.humidity}%</li>
          <li>Wind: {weather.wind} km/h</li>
        </ul>


       {forecast.length > 0 && (
        <div className="weather-forecast">
          <h2>5 Day Forecast</h2>
        <div className="forecast-cards">
        {forecast.map((day) => (
           <div key={day.dt} className="forecast-card">
                    <p>{new Date(day.dt_txt).toLocaleDateString()}</p>
                    <img
                      src={`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                      alt={day.weather[0].description}
                    />
                    <p>{Math.round(day.main.temp)}°C</p>
                    <p>{day.weather[0].description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
