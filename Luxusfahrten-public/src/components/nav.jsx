
import React, { useState } from "react";

// Importación del archivo CSS para aplicar estilos personalizados al componente Navbar.
import "./nav.css";

// Definición del componente funcional 'Navbar'.
const Navbar = () => {
  // Estado 'menuOpen' para controlar si el menú está abierto o cerrado.
  const [menuOpen, setMenuOpen] = useState(false);


  const toggleMenu = () => {
    setMenuOpen(!menuOpen); // Cambia entre true (abierto) y false (cerrado).
  };

  return (
    <nav className="navbar"> {/* Contenedor principal de la barra de navegación */}
      
     
      <div className="logo-container">
       
      </div>

      {/* Botón del menú estilo hamburguesa */}
      <div className={`menu-toggle ${menuOpen ? "open" : ""}`} onClick={toggleMenu}>
        {/* Tres líneas que representan el ícono del menú */}
        <span></span>
        <span></span>
        <span></span>
      </div>

      
      <div className={`nav-links ${menuOpen ? "active" : ""}`}>
        {/* Enlaces de navegación a diferentes secciones */}
        <a href="#">Tienda de Lujo</a>
        <a href="#">Contáctanos</a>
        <a href="#">Tienda Restaurados</a>
        <a href="#">Sobre Nosotros</a>
      </div>
    </nav>
  );
};

export default Navbar;
