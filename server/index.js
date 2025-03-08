import { Hono } from 'hono';
import { serve } from '@hono/node-server';
import pool from './config/db.js';
import dotenv from 'dotenv';
import { cors } from 'hono/cors';

dotenv.config();

const app = new Hono();

// Enable CORS for frontend-backend communication
app.use('*', cors());

// Database connection test
pool.query('SELECT NOW()', (err, res) => {
    if (err) {
        console.error('❌ Database connection error:', err);
    } else {
        console.log('✅ Database connected successfully:', res.rows[0].now);
    }
});

// Test Route
app.get('/', (c) => c.text('🌤️ Weather App Backend is Live!'));

// Route to fetch weather data
app.get('/weather/:city', async (c) => {
    const city = c.req.param('city');

    try {
        // Fetch weather data from OpenWeatherMap API
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.API_KEY}&units=metric`
        );

        const data = await response.json();

        if (data.cod !== 200) {
            return c.json({ error: data.message }, 404);
        }

        // Save weather data to PostgreSQL
        const weatherInfo = {
            city: data.name,
            temperature: data.main.temp,
            humidity: data.main.humidity,
            temp_min: data.main.temp_min,
            temp_max: data.main.temp_max
        };

        await pool.query(
            `INSERT INTO weather (city, temperature, humidity, temp_min, temp_max) 
             VALUES ($1, $2, $3, $4, $5)`,
            [
                weatherInfo.city,
                weatherInfo.temperature,
                weatherInfo.humidity,
                weatherInfo.temp_min,
                weatherInfo.temp_max
            ]
        );

        return c.json(weatherInfo);
    } catch (error) {
        console.error('❌ Error fetching weather data:', error);
        return c.json({ error: 'Failed to fetch weather data' }, 500);
    }
});

// Start the Hono server
serve({
    fetch: app.fetch, // Correct method for Hono
    port: 3000
});

console.log('✅ Server running on port 3000');
