import React, {useState, useEffect} from 'react'
import axios from 'axios'

const Weather = ({country}) => {
    const [weatherData, setWeatherData] = useState([])
  
    useEffect(() => {
        console.log('useEffect weather called')
        const getWeather = async () => {
            try{
                const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&units=metric&appid=${process.env.REACT_APP_WEATHER_API_KEY}`)
                setWeatherData(response.data)
            } catch(e){
                console.log(e)
            }
        }
        getWeather()
    }, [])

  return (
    <div>
        <h1>Weather in {country.capital}</h1>
        {console.log('weather data inside return', weatherData)}
        {!!weatherData && 
            <>
                <p>temperature {weatherData?.main?.temp} Celsius</p>
                <img src={`http://openweathermap.org/img/wn/${weatherData?.weather[0]?.icon}@2x.png`} alt="weather icon"/>
                <p>wind {weatherData?.wind?.speed} m/s</p>
            </>
        }
        
    </div>
  )
}

export default Weather