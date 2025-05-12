
import React from "react"; 
import { Link } from 'react-router-dom'; 
import { FaInstagram, FaFacebook, FaWhatsapp } from "react-icons/fa";
import "./Footer.css"; 

const Footer = () => {
  return (
    <footer className="footer"> {/* Contenedor principal del pie de página */}
      
      {/* Sección de enlaces a otras partes de la aplicación */}
      <div className="footer-links"> 
        <h3>Links</h3> 
        <div>
          {/* Cada enlace dirige a una página específica usando React Router */}
          <Link to="/">Inicio</Link> -{" "}
          <Link to="/tienda">Tienda de Lujo</Link> -{" "}
          <Link to="/restaurados">Tienda de Restaurados</Link> -{" "}
          <Link to="/TerminosCondiciones">Términos y condiciones</Link>
        </div>
      </div>

      {/* Sección que proporciona información de la ubicación física */}
      <div className="footer-location">
        <h3>Ubicación</h3>
        <p>Calle 20, Colonia D, Edificio 30, Piso 38, San Salvador, El Salvador</p> 
      </div>

      {/* Sección para redes sociales y contacto */}
      <div className="footer-social">
        <h3>Redes Sociales</h3>
        <div className="social-icons">
          
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <FaInstagram size={24} color="#fff" /> 
          </a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
            <FaFacebook size={24} color="#fff" /> 
          </a>
          <a href="https://wa.me/50318398346" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
            <FaWhatsapp size={24} color="#fff" /> 
          </a>
        </div>
        <p>Contáctanos<br />+503 1839 8346</p> 
      </div>
    </footer>
  );
};

export default Footer; 