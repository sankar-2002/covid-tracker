import { FormControl, MenuItem, Select } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import './App.css';

function App() {

  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('worldwide');

  useEffect(() => {

    const getCountries = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
      .then((response) => response.json())
      .then((data) => {
        const countries = data.map((country) => ({

          name:country.country, //India , United states, United Kingdom
          value:country.countryInfo.iso2 //Ind, USA, UK
        }));

        setCountries(countries);
      });
    };

    getCountries();

  }, []);



  const onCountryChange = async (event) => {
    const countryCode = event.target.value;
    setCountry(countryCode);
  }


  return (
    <div className="app">

      <div className="app_header">

        <h1>COVID-19 TRACKER</h1>

        <FormControl className="app_dropdown">

          <Select variant="outlined" value={country} onChange= {onCountryChange}>

          {/* manually adding One Option */}
            <MenuItem value="worldwide"> WorldWide</MenuItem>


            {/* Rendering All The Countries Using JS Map Function */}
            {
              countries.map(country => (
                <MenuItem value= {country.value}>{country.name}</MenuItem>
              ))
            }




            {/* <MenuItem value="worldwide"> Worldwide</MenuItem>
            <MenuItem value="worldwide"> Option two</MenuItem>
            <MenuItem value="worldwide"> Option Three</MenuItem>
            <MenuItem value="worldwide"> nsjkwowm </MenuItem> */}


          </Select>

        </FormControl>

      </div>







    </div>
  );
}

export default App;
