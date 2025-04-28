// Importamos los estilos y el subcomponente necesario.
import React from 'react';
import '../components/Home.css'; 
import Info from '../components/aboutUs'; 

const Home = () => {
  return (
    <div>
      <Info/> {/* Renderiza el componente 'Info', modular y reutilizable. */}
    </div>
  );
};

export default Home; // Exporta el componente para usarlo en otras partes del proyecto.
