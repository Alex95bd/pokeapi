import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandsHolding, faSearch } from '@fortawesome/free-solid-svg-icons';

import "./App.css";

const App = () => {
  const [pokemon, setPokemon] = useState("Pikachu");
  const [pokemonData, setPokemonData] = useState([]);
  const [pokemonType, setPokemonType] = useState("");

  const getPokemon = async () => {
    const toArray = [];
    try {
     const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;
     const res = await axios.get(url);
     toArray.push(res.data);
     setPokemonType(res.data.types[0].type.name);
     setPokemonData(toArray);
     console.log(res);
    } catch (e) {
      console.log(e);
    }
  }
  
  const handleChange = (e) => {
    setPokemon(e.target.value.toLowerCase());
  }
   
   const handleSumit = (e) => {
    e.preventDefault();
    getPokemon();
   }


  return (
    <div className="App">
      <form onSubmit={handleSumit}>
      <label>
        <input 
        type="text" 
        onChange={handleChange} 
        placeholder="Buscar pokemon"
      />
      
      </label>
     </form>
     {pokemonData.map((data) => {
      return(
        <div className="container">
          <div className="divTable">
            <div className="divTableBody">
            <div className="divTableRow">
              <div className="divTableCell">
                <h5>Weight:</h5>  
              </div>
              <div className="divTableCell">{" "} {Math.round(data.weight)}</div>
            </div>
            <div className="divTableRow">
              <div className="divTableCell">
              <h5>Type:</h5> 
              </div>
              <div className="divTableCell">{pokemonType}</div>
            </div>
            </div>
            <div className="divTableRow">
              <div className="divTableCell">
              <h5>Moves:</h5> 
              </div>
              <div className="divTableCell">
                {" "}
                {data.moves.length}
                </div>
                <h5>sprites:</h5> 
               </div>  
             </div>
             <img src={data.sprites["front_default"]}/>
             <img src={data.sprites["front_shiny"]}/>
        </div>
      )
     })}
    </div>
  );
};

export default App;
