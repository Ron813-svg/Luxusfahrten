// Importamos React y los hooks necesarios.
import React, { useState, useEffect } from 'react';
import '../components/Home.css'; // Archivo de estilos.
import Card1 from '../components/card.jsx'; // Subcomponente reutilizable.

const Home = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth); // Guarda el ancho de la ventana.

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth); // Actualiza el ancho en tiempo real.
    window.addEventListener('resize', handleResize); // Escucha el evento de cambio de tamaño.
    return () => window.removeEventListener('resize', handleResize); // Limpia el listener al desmontar.
  }, []);

  const containerStyle = {
    display: 'flex',
    flexDirection: windowWidth < 600 ? 'column' : 'row', // Diseño adaptativo.
    alignItems: 'center',
    padding: windowWidth < 600 ? '5px' : '10px', 
  };

  return (
    <div className="container" style={containerStyle}> 
      <Card1 /> {/* Renderiza tres tarjetas reutilizables */}
      <Card1 />
      <Card1 />
    </div>
  );
};

export default Home; 
