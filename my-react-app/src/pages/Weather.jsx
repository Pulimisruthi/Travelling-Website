import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Weather.css';

const API_KEY = '2303c3154cf4eb2bb5e58ed07db1da21'; // Replace with your OpenWeather API key

const Weather = () => {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [city, setCity] = useState('New Delhi');
  const [unit, setUnit] = useState('celsius');
  const [error, setError] = useState(null);

  const convertTemp = (temp) => {
    return unit === 'celsius'
      ? `${Math.round(temp)}°C`
      : `${Math.round((temp * 9) / 5 + 32)}°F`;
  };

  const fetchWeather = async (cityName) => {
    try {
      setError(null);
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName},IN&units=metric&appid=${API_KEY}`
      );
      if (res.data.sys.country !== 'IN') throw new Error('City not in India');
      setWeather(res.data);
    } catch (err) {
      setError('City not found or not in India');
      setWeather(null);
    }
  };

  const fetchForecast = async (cityName) => {
    try {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${cityName},IN&units=metric&appid=${API_KEY}`
      );

      const days = {};
      res.data.list.forEach((entry) => {
        const date = entry.dt_txt.split(' ')[0];
        if (!days[date]) days[date] = [];
        days[date].push(entry);
      });

      const today = new Date().toISOString().split('T')[0];
      const futureDates = Object.keys(days).filter((d) => d >= today).slice(0, 7);

      const result = futureDates.map((d) => {
        const temps = days[d].map((e) => e.main.temp);
        return {
          date: d,
          avg: temps.reduce((a, b) => a + b, 0) / temps.length,
          condition: days[d][0].weather[0].main,
        };
      });

      setForecast(result);
    } catch (err) {
      console.error(err);
      setForecast([]);
    }
  };

  const handleSearch = () => {
    if (city.trim()) {
      fetchWeather(city);
      fetchForecast(city);
    }
  };

  useEffect(() => {
    fetchWeather(city);
    fetchForecast(city);
  }, []);

  const getWeatherIcon = (condition) => {
    const icons = {
      clear: '☀️',
      clouds: '☁️',
      rain: '🌧️',
      thunderstorm: '⛈️',
      snow: '❄️',
      mist: '🌫️',
      haze: '🌫️',
      fog: '🌫️',
    };
    return icons[condition?.toLowerCase()] || '🌈';
  };

  return (
    <div className="app-container">
      <h1>Weather Updates</h1>
      

      <div className="search-section">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Search Indian City..."
        />
        <button onClick={handleSearch}>Search</button>
        <button onClick={() => setUnit(unit === 'celsius' ? 'fahrenheit' : 'celsius')}>
          °C / °F
        </button>
      </div>

      {error && <p className="error">{error}</p>}

      <div className="weather-forecast-wrapper">
        {weather && (
          <div className="weather-card">
            <h2>{weather.name}</h2>
            <div className="weather-icon">
              {getWeatherIcon(weather.weather[0].main)}
            </div>
            <p style={{fontSize: '50px',fontWeight: 'bold'}}>{convertTemp(weather.main.temp)}</p>
            <p>{weather.weather[0].description}</p>
            <p>Humidity: {weather.main.humidity}%</p>
          </div>
        )}

        {forecast.length > 0 && (
          <div className="forecast-container">
            <h3>7-Day Forecast</h3>
            <div className="forecast-grid">
              {forecast.map((day, idx) => (
                <div key={idx} className="forecast-card">
                  <p>{day.date}</p>
                  <div className="weather-icon">
                    {getWeatherIcon(day.condition)}
                  </div>
                  <p>{convertTemp(day.avg)}</p>
                  <p>{day.condition}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Weather;