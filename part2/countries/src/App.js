import React, { useEffect, useState } from 'react';
import axios from 'axios'

const FindCountries = ({searchText, onTextChanged}) => <div>find countries <input value={searchText} onChange={onTextChanged} /></div>

const CountrySearchResultRow = ({country, onCountrySelected}) => <div>{country.name}<button onClick={() => onCountrySelected(country)}>show</button></div>

const Weather = ({country}) => {
  const [weather, setWeather] = useState(undefined)
  useEffect(() => {
    const weather_api_key = process.env.REACT_APP_WEATHER_API_KEY
    const source = axios.CancelToken.source()
    axios
      .get(`http://api.weatherstack.com/current?access_key=${weather_api_key}&query=${country.capital}&units=m`, {cancelToken: source.token})
      .then(response => setWeather(response.data.current))
      .catch(() => { })

    return () => {
      source.cancel()
    }
  }, [country])

  if (weather === undefined) {
    return (null)
  } else {
    return (
      <div>
        <h2>Weather in {country.capital}</h2>
        <div>
          <p>temperature: {weather.temperature} Celsius</p>
          <img src={weather.weather_icons[0]} alt={weather.weather_descriptions[0]} width="125" />
          <p>wind: {weather.wind_speed} km/h direction {weather.wind_dir}</p>
        </div>
      </div>
    )
  }
}

const Country = ({country}) => {
  if (country === undefined) {
    return (null)
  } else {
    return (
      <div>
          <h1>{country.name}</h1>
          <div>
            <p>capital {country.capital}</p>
            <p>population {country.population}</p>
          </div>
          <h2>languages</h2>
          <div>
            <ul>
              {country.languages.map((language) => <li key={language.name}>{language.name}</li>)}
            </ul>
          </div>
          <div>
            <img src={country.flag} alt={country.name + "flag"} width="250" />
          </div>
          <Weather country={country} />
      </div>
    )
  }
}

const CountriesSearchResult = ({countries, searchText, onCountrySelected}) => {
  let filteredCountries = []
  useEffect(() => {
    if (filteredCountries && filteredCountries.length === 1)
    {
      console.log("only 1 result!")
      onCountrySelected(filteredCountries[0])
    }
  }, [filteredCountries, onCountrySelected])

  if (searchText) {
    filteredCountries = countries.filter((country) => country.name.toLowerCase().includes(searchText.toLowerCase()))
    if (filteredCountries.length > 10) {
      return (<div>Too many matches, specify another filter</div>)
    } else if (filteredCountries.length > 1) {
      return (
        <div>
          {filteredCountries.map((country) => <CountrySearchResultRow key={country.name} country={country} onCountrySelected={onCountrySelected} />)}
        </div>
      )
    }
  }

  return (null)
}

function App() {
  const [ countries, setCountries ] = useState([])
  const [ searchText, setSearchText ] = useState('')
  const [ selectedCountry, setSelectedCountry ] = useState(undefined)

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => setCountries(response.data))
  }, [])

  const updateSearchText = (newSearchText) => {
    setSelectedCountry(undefined)
    setSearchText(newSearchText)
  }

  return (
    <div>
      <FindCountries searchText={searchText} onTextChanged={(event) => updateSearchText(event.target.value)} />
      <CountriesSearchResult countries={countries} searchText={searchText} onCountrySelected={(country) => setSelectedCountry(country)} />
      <Country country={selectedCountry} />
    </div>
  );
}

export default App;
