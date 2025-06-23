// Importamos React y los hooks necesarios.
import React, { useState, useEffect } from 'react';
import '../components/Home.css'; // Archivo de estilos.
import Card1 from '../components/card.jsx'; // Subcomponente reutilizable.
import { useLuxuryVehicles } from '../hooks/useLuxuryVehicles'; // Hook personalizado para vehículos de lujo.

const TiendaLujo = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth); // Guarda el ancho de la ventana.
  const { luxuryCars, loading } = useLuxuryVehicles(); // Desestructura luxuryCars y loading del hook.

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
    flexWrap: 'wrap',
    gap: '20px'
  };

  return (
    <div className="container" style={containerStyle}> 
      {loading ? (
        <div>Cargando autos de lujo...</div>
      ) : (
        luxuryCars.map(auto => <Card1 key={auto.id} auto={auto} />)
      )}
    </div>
  );
};

export default TiendaLujo;
