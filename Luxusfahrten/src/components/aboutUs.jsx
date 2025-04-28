
import React from "react";


import "./aboutUs.css"; 


import Founder from '../assets/Screenshot 2025-04-28 032912.png'

// Definición del componente funcional 'Cards'.
const Cards = () => {
  return (
    // Contenedor principal que agrupa todas las tarjetas.
    <div className="cards-container">
      
     
      <div className="card"> 
        <h2 className="card-title">Historia</h2>
        <p className="card-text">
        
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
          exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat..."
        </p>
      </div>

     
      <div className="card">
        <img
          src={Founder} 
          alt="Fundador"
          className="card-image" 
        />
        <h2 className="card-title">Fundador</h2> 
        <p className="card-text">
          
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
          exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat..."
        </p>
      </div>
    </div>
  );
};


export default Cards;
