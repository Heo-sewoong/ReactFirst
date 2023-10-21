import { useEffect, useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import WeatherBox from './component/WeatherBox';
import WeatherButton from './component/WeatherButton';
import ClipLoader from "react-spinners/ClipLoader";


function App() {
  
  const [weather,setWeather] = useState(null);
  const [city,setCity] = useState('')
  const [loading,setLoading] = useState(false)
  const cities = ['Paris','New York','Tokyo','Seoul']

  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      getWeatherByCurrentLocation(latitude, longitude);
    });
  };

  const getWeatherByCurrentLocation = async(lat,lon) => {
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=00df270d63144c01f31f578975a59254&units=metric`
    setLoading(true)
    let response = await fetch(url)
    let data = await response.json();
    setWeather(data);
    setLoading(false)
  }

  const getWeatherByCity = async()=>{
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=00df270d63144c01f31f578975a59254&units=metric`
    setLoading(true)
    let response = await fetch(url)
    let data = await response.json()
    setWeather(data);
    setLoading(false)
  }

  const handleCityChange = (city) => {
    if (city === "current") {
      setCity(null);
    } else {
      setCity(city);
    }
  };

  useEffect(()=>{
    if(city==""){
      getCurrentLocation()
    } else {
      getWeatherByCity()
    }
    
  
  },[city])

 

  return (
  <div>
    {loading ? 
    <div className="container">
    <ClipLoader
        color="#ff8c6b"
        loading={loading}
        
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      /> 
      </div>
      : <div className="container">
      <WeatherBox weather={weather} />
        <WeatherButton 
        cities={cities}  
        handleCityChange={handleCityChange}
        selectedCity={city} 
        setCity={setCity}/>
        
      </div>}
    
  </div>
   
   
  );
}

export default App;
