import React, { useState } from 'react';
import axios from 'axios';

const WeatherCard = () => {
    const [city, setCity] = useState('');
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const search = async () => {
        if (!city.trim()) {
            setError('Please enter a city name.');
            return;
        }

        setLoading(true); // Start loading
        try {
            const response = await axios.get(`http://localhost:3000/weather/${city}`);
            setWeather(response.data);
            setError('');
        } catch (err) {
            if (err.response && err.response.status === 404) {
                setError('City not found. Please try again.');
            } else {
                setError('Failed to fetch weather data. Please try again later.');
            }
            setWeather(null);
        } finally {
            setLoading(false); // Stop loading
        }
    };

    return (
        <div className='p-5 bg-gradient-to-r from-blue-400 to-purple-100 h-max w-max flex flex-col mt-3 rounded-3xl' style={{ opacity: 0.9 }}>
            <div className='flex flex-col items-center'>
                <div className='flex flex-row items-center w-full'>
                    <input
                        type='text'
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder='Enter city name'
                        className='w-80 pl-10 pr-5 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300'
                    />
                </div>
                <button
                    onClick={search}
                    className='bg-blue-500 text-white px-10 py-2 rounded-md mt-4'
                >
                    {loading ? 'Searching...' : 'Search'}
                </button>
                
                {error && <p className='text-red-500 mt-2'>{error}</p>}

                {weather && (
                    <div className='mt-4  p-5 rounded-3xl w-full text-center'>
                        <h2 className='text-2xl font-bold'>{weather.city}</h2>
                        <p>🌡️ Temperature: {weather.temperature} °C</p>
                        <p>💧 Humidity: {weather.humidity}%</p>
                        <p>⬆️ Max Temp: {weather.temp_max} °C</p>
                        <p>⬇️ Min Temp: {weather.temp_min} °C</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default WeatherCard;
