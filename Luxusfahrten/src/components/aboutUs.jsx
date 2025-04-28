import React from "react";
import "./aboutUs.css"; 
import Founder from '../assets/Screenshot 2025-04-28 032912.png'

const Cards = () => {
  return (
    <div className="cards-container">
      
      <div className="card">
        <h2 className="card-title">Historia</h2>
        <p className="card-text">
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
          exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
          dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur..."
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
