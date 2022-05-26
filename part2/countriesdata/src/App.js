import React, {useState, useEffect} from "react";
import axios from 'axios'
import Weather from "./components/Weather";

const App = () => {
  const [countries, setCountries] = useState([])
  const [allCountries, setAllCountries] = useState([])
  const [filter, setFilter] = useState ('')

  useEffect(() => {
    console.log('effect')
    axios.get('https://restcountries.com/v2/all').then(response => {
      console.log('promise fulfilled')
      setAllCountries(response.data)
    })
  }, [])

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setFilter(event.target.value)
    if(filter) {
      const regex = new RegExp( filter, 'i' );
      const filteredCountries = () => allCountries.filter(country => String(country.name).match(regex))
      setCountries(filteredCountries)
    }
  }

  const matches = () => {
    if(countries.length>10){
      return <p>Too nany matches, specify another filter</p>
    }
    else if(countries.length===1){
      return(
        <div>
          {handleShow(countries[0])}
        </div>
      )
    }
    else{
      return countries.map(country => {
        return(
        <div>
          <p key={country.name}>{country.name} <button onClick={() => {
              return(
                <div>
                  {handleShow(country)}
                </div>
              )
          }}>show</button></p>
        </div>
        )
      })}
  }

  const handleShow = (country) => {
    console.log('country passed to handleShow: ',country)
   
    return (
      <div>
        <h1>{country.name}</h1>
        <p>capital {country.capital}</p>
        <p>population {country.population}</p>
        <h2>languages</h2>
        <ul>
          {country.languages.map(language => <li key={language.name}>{language.name}</li>)}
        </ul>
        <img src={country.flags.png} alt='country code' />
        <Weather country={country} />
      </div>
    )
  }


  return(

    <div>
      find countries: <input value={filter} onChange={handleFilterChange}></input>
      {matches()}
    </div>
  )
}



export default App;
