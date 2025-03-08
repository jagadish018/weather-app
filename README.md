# Weather App

A simple weather application built with **React**, **Hono**, and **PostgreSQL** that fetches real-time weather data using the **OpenWeatherMap API**.

## 🌍 Live Demo
> Coming soon...

## 🛠️ Technologies Used
- **Frontend**: React, Tailwind CSS
- **Backend**: Node.js, Hono
- **Database**: PostgreSQL
- **Environment Variables**: dotenv
- **API**: OpenWeatherMap API

## 🚀 Getting Started
Follow these steps to set up and run the project locally.

### 📋 Prerequisites
Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v22.x recommended)
- [PostgreSQL](https://www.postgresql.org/) with **pgAdmin 4**

### 📂 Project Setup
1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/weather-app.git
   cd weather-app
   ```

2. **Install dependencies for both frontend and backend:**
   ```bash
   cd frontend
   npm install
   cd ../server
   npm install
   ```

3. **Create a `.env` file in the `server` folder:**
   ```env
   API_KEY=your_openweathermap_api_key
   DB_USER=your_db_username
   DB_PASSWORD=your_db_password
   DB_HOST=localhost
   DB_PORT=5432
   DB_DATABASE=weatherapp_db
   ```

4. **Database Setup:**
   Create a table in PostgreSQL:
   ```sql
   CREATE TABLE weather (
       id SERIAL PRIMARY KEY,
       city VARCHAR(50) NOT NULL,
       temperature FLOAT NOT NULL,
       humidity INT NOT NULL,
       temp_min FLOAT NOT NULL,
       temp_max FLOAT NOT NULL,
       timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );
   ```

5. **Start the Backend Server:**
   ```bash
   cd server
   npm run dev
   ```

6. **Start the Frontend App:**
   ```bash
   cd frontend
   npm start
   ```

7. **Access the App:**
   - Frontend: `http://localhost:5173`
   - Backend API Endpoint: `http://localhost:3000/weather/{city}`

## 🌤️ API Usage
This app uses the **OpenWeatherMap API** to fetch real-time weather data.

- Example API Call:
  ```bash
  GET http://localhost:3000/weather/London
  ```

- Example Response:
  ```json
  {
      "city": "London",
      "temperature": 8.44,
      "humidity": 80,
      "temp_min": 8.44,
      "temp_max": 8.44
  }
  ```

## 🔧 Features
✅ Real-time weather data fetching  
✅ User-friendly interface with Tailwind CSS styling  
✅ Error handling for invalid city entries  
✅ PostgreSQL integration to store weather data  
✅ CORS enabled for secure frontend-backend communication  



