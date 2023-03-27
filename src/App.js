import React, { useState } from "react";
import InputField from "./components/shared/InputField";

const Cities = [
  {
    id: 1,
    name: "Boston",
    postalCode: "02115",
    country: {
      id: "US",
      name: "United States"},
    adminArea:{
      id: "BS",
      name: "Boston",
      type: "City"}
  },
  {
    id: 2,
    name: "Oxford",
    postalCode: "OX1 4BH",
    country: {
      id: "UK",
      name: "United Kingdom"},
    adminArea:{
      id: "OXF",
      name: "Oxford",
      type: "City"}
  },
  {
    id: 3,
    name: "Berlin",
    postalCode: "10967",
    country: {
      id: "GE",
      name: "Germany"},
    adminArea:{
      id: "BR",
      name: "Berlin",
      type: "City"}
  },
  {
    id: 4,
    name: "Istanbul",
    postalCode: "34496",
    country: {
      id: "TR",
      name: "Turkiye"},
    adminArea:{
    id: "TR",
    name: "Istanbul",
    type: "City"}
  },
];

function PlanToVisit(){

  const [plantoVisit, setplantoVisit] = useState("Next journey will be ...");

  const handlePlanChange = (event) => {
    setplantoVisit(event.target.value);
    console.log(event.target.value)
  }
  return(<div>
    <InputField
    id="plan-input"
    label="Next Cities:"
    value={plantoVisit}
    onChange={handlePlanChange}
  />

{/*     <label htmlFor="plan-input">Next Cities:</label>
    <input
      type="text"
      value={plantoVisit}
      onChange={handlePlanChange}/> */}
    {<p> My next vacation city will be: {plantoVisit}</p>}
    <hr />
  </div>
)}

function App(){
  const [inputValue, setInputValue] = useState("Welcome To Cities List!");

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    console.log(event.target.value)
  }

  const [selectedCity, setSelectedCity] = useState("You didn't choose the city")
  const handleSelectCity = (item) => {
    setSelectedCity(`You chose ${item.name}`);
    console.log(`You chose ${item.name} city`)
  }

  const cityList = Cities.map((item) => ( 
    <ul> 
        City {item.id}
    <div key={item.id}>
      <li>City: {item.name}</li>
      <li>Postal Code: {item.postalCode}</li>
      <li>Country: {item.country.name}</li>
      <li>Admin Area Type: {item.adminArea.type}</li>
      <li><button
      onClick={() => handleSelectCity(item)}> Select the City! </button></li>
      <hr />
    </div>
  </ul>
  ))
  return( <div>
    <h1> City List </h1>
    <InputField
        id="my-input"
        label="Search Cities:"
        value={inputValue}
        onChange={handleInputChange}
      />
{/*     
    <label htmlFor="my-input">Search Cities:</label>
    <input
        type="text"
        id="my-input"
        value={inputValue}
        onChange={handleInputChange}/> */}
      {<p>You typed: {inputValue}</p>}
      <hr />
      <p> {selectedCity} </p>

    {cityList}
    <PlanToVisit/>
  </div>
  )}




export default App;
