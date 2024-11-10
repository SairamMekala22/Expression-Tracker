// src/WeatherComponent.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const WeatherComponent = () => {
  const [weather, setWeather] = useState(null);
  const [locationError, setLocationError] = useState(null);
  const API_KEY = '7e77e3f941f26b77f144fb87d5792121';
  const [lat, setLat] = useState(null);
  const [lon, setLon] = useState(null);

  useEffect(() => {
    // Get user's current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLat(position.coords.latitude);
          setLon(position.coords.longitude);
        },
        (error) => {
          setLocationError("Error getting location. Please enable location services.");
          console.error("Error getting location", error);
        }
      );
    } else {
      setLocationError("Geolocation is not supported by this browser.");
    }
  }, []);

  useEffect(() => {
    const fetchWeather = async () => {
      if (lat && lon) {
        try {
          const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
          );
          setWeather(response.data);
        } catch (error) {
          console.error("Error fetching weather data", error);
        }
      }
    };

    fetchWeather();
  }, [lat, lon, API_KEY]);

  if (locationError) {
    return <div>{locationError}</div>;
  }

  if (!weather) {
    return <div>Loading weather data...</div>;
  }

  return (
    <div className="weather-container">
      <p><strong>Temperature:</strong> {weather.main.temp}°C</p>
      <p><strong>Weather:</strong> {weather.weather[0].description}</p>
      <p><strong>Humidity:</strong> {weather.main.humidity}%</p>
    </div>
  );
};

export default WeatherComponent;
