import React, { useState, useEffect } from 'react';
import '../components/Home.css'; 
import Card1 from '../components/card.jsx';

const Home = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

 
  const containerStyle = {
    display: 'flex',
    flexDirection: windowWidth < 600 ? 'column' : 'row', 
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: windowWidth < 600 ? '5px' : '10px', 
  };

  return (
    <div className="container" style={containerStyle}>
      <Card1 />
      <Card1 />
      <Card1 />
    </div>
  );
};

export default Home;
