import axios from 'axios';
import pool from '../config/db.js';

export const getWeather = async (c) => {
    const city = c.req.query('city');

    if (!city) {
        return c.json({ error: 'City is required' }, 400);
    }

    try {
        const { data } = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.API_KEY}&units=metric`
        );

        const { temp, humidity, temp_max, temp_min } = data.main;

        await pool.query(
            'INSERT INTO weather (city, temperature, humidity, temp_max, temp_min) VALUES ($1, $2, $3, $4, $5)',
            [city, temp, humidity, temp_max, temp_min]
        );

        return c.json({
            city: data.name,
            temperature: temp,
            humidity,
            temp_max,
            temp_min
        });
    } catch (error) {
        console.error(error);
        return c.json({ error: 'City not found or server error' }, 404);
    }
};
