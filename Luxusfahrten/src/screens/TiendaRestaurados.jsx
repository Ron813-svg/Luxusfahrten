// Importamos React y los hooks necesarios.
import React, { useState, useEffect } from 'react';
import '../components/Home.css'; 
import Card2 from '../components/card2.jsx'; /

const Home = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth); // Guarda el ancho de la ventana.

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth); 
    window.addEventListener('resize', handleResize); 
    return () => window.removeEventListener('resize', handleResize); // Limpia el evento.
  }, []);

  const containerStyle = {
    display: 'flex',
    flexDirection: windowWidth < 600 ? 'column' : 'row', 
    alignItems: 'center',
    padding: windowWidth < 600 ? '5px' : '10px',
  };

  return (
    <div className="container" style={containerStyle}>
      <Card2 /> {/* Reutilización del componente */}
      <Card2 />
      <Card2 />
    </div>
  );
};

export default Home;
