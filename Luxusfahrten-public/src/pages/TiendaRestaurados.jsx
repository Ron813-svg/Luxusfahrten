// Importamos React y los hooks necesarios.
import React, { useState, useEffect } from 'react';
import '../components/Home.css';
import Card2 from '../components/card2.jsx';
import { useRestoredVehicles } from '../hooks/useRestoredVehicles';

const TiendaRestaurados = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const { restoredCars, loading } = useRestoredVehicles();

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const containerStyle = {
    display: 'flex',
    flexDirection: windowWidth < 600 ? 'column' : 'row',
    alignItems: 'center',
    padding: windowWidth < 600 ? '5px' : '10px',
    flexWrap: 'wrap',
    gap: '20px'
  };

  return (
    <div className="container" style={containerStyle}>
      {loading ? (
        <div>Cargando autos restaurados...</div>
      ) : (
        restoredCars.map(auto => <Card2 key={auto.id} auto={auto} />)
      )}
    </div>
  );
};

export default TiendaRestaurados;
