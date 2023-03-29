import React, { useState, useEffect, Component } from "react";
import InputField from "./components/shared/InputField";
import axios from "axios";

const Cities = [
  {
    id: 1,
    locationKey: 349727,
    name: "New York",
    postalCode: "10021",
    country: {
      id: "US",
      name: "United States"},
    adminArea:{
      id: "NY",
      name: "New York",
      type: "State"}
  },
  {
    id: 2,
    locationKey: 328328,
    name: "London",
    postalCode: "EC4A 2",
    country: {
      id: "GB",
      name: "United Kingdom"},
    adminArea:{
      id: "LND",
      name: "London",
      type: "City"}
  },
  {
    id: 3,
    name: "Berlin",
    locationKey:178087,
    postalCode: "10178",
    country: {
      id: "DE",
      name: "Germany"},
    adminArea:{
      id: "BR",
      name: "Berlin",
      type: "City"}
  },
  {
    id: 4,
    name: "Istanbul",
    locationKey: 318251,
    postalCode: "34496",
    country: {
      id: "TR",
      name: "Turkiye"},
    adminArea:{
    id: "34",
    name: "Istanbul",
    type: "City"}
  },
];

function PlanToVisit(){

  const [plantoVisit, setPlantoVisit] = useState("Next journey will be ...");

  const handlePlanChange = (event) => {
    setPlantoVisit(event.target.value);
    console.log(event.target.value)
  }
  return(<div>
    <InputField
    id="plan-input"
    label="Next Cities:"
    value={plantoVisit}
    onChange={handlePlanChange}
  />

    {<p> My next vacation destination will be: {plantoVisit}</p>}
    <hr />
  </div>
)}

function App(){
  const [inputValue, setInputValue] = useState("Welcome To Cities List!");

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    console.log(event.target.value)
  }

  const [selectedCity, setSelectedCity] = useState([]);
  const [locationKey, setLocationKey] = useState(318251);
  const [weatherData, setWeatherData] = useState([]);



  const handleSelectCity = (item) => {
    setSelectedCity(item.name);
    setLocationKey(item.locationKey);
  }



  const cityList = Cities.map((item) => (
      <div key={item.id}>
        <ul>
        <li>City: {item.name}</li>
        <li>Postal Code: {item.postalCode}</li>
        <li>Country: {item.country.name}</li>
        <li>Admin Area Type: {item.adminArea.type}</li>
        <li>
          <button onClick={() => handleSelectCity(item)}>
            Select the City!
          </button>
        </li>
        </ul>
      </div>
  ));



// beginning of API code

  const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
  const LOCATION_KEY = locationKey;
  const accuweatherUrl = `https://dataservice.accuweather.com/currentconditions/v1/${LOCATION_KEY}?apikey=${API_KEY}`;

  async function getWeatherData() {
    try {
      const response = await axios.get(accuweatherUrl);
      const data = response.data[0];
      setWeatherData([data]);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getWeatherData();
  }, [LOCATION_KEY]);





// end of API code

return (
  <div>
    <h1> Weather FC Project </h1>

  <hr />
  
  <p> Please choose city to see weather forecast </p>
  <p> Selected city is {selectedCity} </p>


    <h2>Current Weather Data for {selectedCity} </h2>

      {weatherData.map((data) => (
        <div key={data.EpochTime}>
          <p>Temperature: {data.Temperature.Metric.Value} &#8457;</p>
          <p>Weather: {data.WeatherText}</p>
          <p>Date & Time: {data.LocalObservationDateTime} </p>
          </div>
      ))}
  <hr />

    <h1> City List </h1>
    {cityList}
  
  <hr />

    <PlanToVisit />

    <InputField
      id="my-input"
      label="Search Cities:"
      value={inputValue}
      onChange={handleInputChange}
    />
    <p>You typed: {inputValue}</p>
    <hr />
    

  <hr />
  </div>
)}

export default App;