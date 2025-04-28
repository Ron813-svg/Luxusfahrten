import React, { useState } from "react";

import "./nav.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="navbar">
      
      <div className="logo-container">

      </div>

     
      <div className={`menu-toggle ${menuOpen ? "open" : ""}`} onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      
      <div className={`nav-links ${menuOpen ? "active" : ""}`}>
        <a href="#">Tienda de Lujo</a>
        <a href="#">Contáctanos</a>
        <a href="#">Tienda Restaurados</a>
        <a href="#">Sobre Nosotros</a>
      </div>
    </nav>
  );
};

export default Navbar;
