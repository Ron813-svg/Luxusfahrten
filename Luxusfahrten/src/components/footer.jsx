import React from "react";
import { FaInstagram, FaFacebook, FaWhatsapp } from "react-icons/fa";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-links">
        <h3>Links</h3>
        <div>
          <a href="#">Inicio</a> -{" "}
          <a href="#">Tienda de Lujo</a> -{" "}
          <a href="#">Tienda de Restaurados</a> -{" "}
          <a href="#">Términos y condiciones</a>
        </div>
      </div>

      <div className="footer-location">
        <h3>Ubicación</h3>
        <p>Calle 20, Colonia D, Edificio 30, Piso 38, San Salvador, El Salvador</p>
      </div>

      <div className="footer-social">
        <h3>Redes Sociales</h3>
        <div className="social-icons">
          <a href="#" aria-label="Instagram"><FaInstagram size={24} color="#fff" /></a>
          <a href="#" aria-label="Facebook"><FaFacebook size={24} color="#fff" /></a>
          <a href="#" aria-label="WhatsApp"><FaWhatsapp size={24} color="#fff" /></a>
        </div>
        <p>Contactanos<br />+503 1839 8346</p>
      </div>
    </footer>
  );
};

export default Footer;
