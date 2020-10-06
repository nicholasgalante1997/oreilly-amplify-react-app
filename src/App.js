import React from 'react';
import logo from './logo.svg';
import './App.css';
// React Hooks 
import {useState, useEffect} from 'react'
// Import the Api category from AWS Amplify
import { API } from 'aws-amplify'

function App() {

  // create coins variable and set to an empty array
  const [coins, updateCoins] = useState([])

  // create additional state to hold user input for limit and start properties
  const [input, updateInput] = useState({ limit:5, start:0})

  // function to allow for users to update the input values
  function updateInputValues(type, value){
    updateInput({...input, [type]: value})
  }

  // Define function call to the API, update to use limit and start properties
  async function fetchCoins(){
    const {limit, start} = input
    const data = await API.get('cryptoapi', `/coins?limit=${limit}&start=${start}`)
    updateCoins(data.coins)
  }

  // call fetchCoins function for when component loads 
  useEffect(() => {
    fetchCoins()
  }, [])

  // add input fields to the UI for user input
  return (
    <div className="App">
      <header className="App-header">
        <input
          onChange={e => updateInputValues('limit', e.target.value)}
          placeholder='limit'
          />
        <input 
          onChange={e => updateInputValues('start', e.target.value)}
          placeholder='start'
          />
        <button onClick={fetchCoins}>Fetch Coins</button>
       {
         coins.map((coin, index) => (
           <div key={index}>
             <h3>{coin.name} - {coin.symbol}</h3>
              <h1><em>{coin.price_usd}</em></h1>
           </div>
         ))
       }
      </header>
    </div>
  );
}

export default App;
