import React from 'react'
import WeatherCard from './components/WeatherCard'

function App() {
  return (
    <div className="flex  import 
flex-col items-center justify-center h-full  bg-gradient-to-r from-blue-400 to-purple-100 p-4">
      <div className='flex flex-col justify-center items-center text-3xl  h-200 w-max   '>
        <div className='flex flex-row justify-center items-center w-100 border-b-2 '>
        <img src="./public/Weather-Background-PNG.png" alt="Weather background" className='flex-none  w-60  '/><h1 className='mt-27 text-6xl font-bold'> App</h1>
        </div>
        <WeatherCard />
      </div>
    </div>
  )
}

export default App