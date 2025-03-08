import { Hono } from 'hono';
import { getWeather } from '../controllers/weatherController.js';

const weatherRoutes = new Hono();

weatherRoutes.get('/weather', getWeather);

export default weatherRoutes;
