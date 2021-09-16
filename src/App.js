import { Card, CardContent, FormControl, MenuItem, Select } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
// import Map from './Map';
import InfoBox from './InfoBox';
import Table from './Table';
import './App.css';
import { prettyPrintStat, sortData } from './utils';
import LineGraph from './LineGraph';
import "leaflet/dist/leaflet.css";

function App() {

  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('worldwide');
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [casesType, setCasesType] = useState("cases");


  //manually doing for worldwide....
  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then(response => response.json())
      .then(data => {
        setCountryInfo(data);
      });
  }, [])



  useEffect(() => {

    const getCountries = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({

            name: country.country, //India , United states, United Kingdom
            value: country.countryInfo.iso2 //Ind, USA, UK
          }));

          const sortedData = sortData(data);


          setTableData(sortedData);

          setCountries(countries);
        });
    };

    getCountries();

  }, []);



  const onCountryChange = async (event) => {
    const countryCode = event.target.value;
    setCountry(countryCode);



    const url = (countryCode === 'worldwide')
      ? 'https://disease.sh/v3/covid-19/all'
      : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    await fetch(url).then(response => response.json())
      .then(data => {
        setCountry(countryCode);
        //storing the country's Whole data
        setCountryInfo(data);
      });

  };



  return (
    <div className="app">

      <div className="app_left">


        <div className="app_header">

          <h1>COVID-19 TRACKER</h1>

          <FormControl className="app_dropdown">

            <Select variant="outlined" value={country} onChange={onCountryChange}>

              {/* manually adding One Option */}
              <MenuItem value="worldwide"> WorldWide</MenuItem>


              {/* Rendering All The Countries Using JS Map Function */}
              {
                countries.map(country => (
                  <MenuItem value={country.value}>{country.name}</MenuItem>
                ))
              }




              {/* <MenuItem value="worldwide"> Worldwide</MenuItem>
                <MenuItem value="worldwide"> Option two</MenuItem>
                <MenuItem value="worldwide"> Option Three</MenuItem>
                <MenuItem value="worldwide"> nsjkwowm </MenuItem> */}


            </Select>

          </FormControl>

        </div>

        <div className="app_stats">

          <InfoBox title="CoronoVirus Cases" cases={prettyPrintStat(countryInfo.todayCases)} total={prettyPrintStat(countryInfo.cases)} onclick={(e) => setCasesType('cases')} />

          <InfoBox title="Recovered" cases={prettyPrintStat(countryInfo.todayRecovered)} total={prettyPrintStat(countryInfo.recovered)} onclick={(e) => setCasesType('recovered')} />

          <InfoBox title="Deaths" cases={prettyPrintStat(countryInfo.todayDeaths)} total={prettyPrintStat(countryInfo.deaths)} onclick={(e) => setCasesType('deaths')} />

          <InfoBox title="ActiveCases" cases={prettyPrintStat(countryInfo.active)} total={null} onclick={(e) => setCasesType('active')} />


        </div>




      </div>


      <Card className="app_right">

        <CardContent>
          <h3>Live Cases by Country</h3>

          <Table countries={tableData} />

          <h3>WorldWide New {casesType}</h3>

          <LineGraph casesType={casesType} />
        </CardContent>


      </Card>















    </div>
  );
}

export default App;
