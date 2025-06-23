//Esta es de informacion del auto
import React from 'react';
import '../components/Home.css';
import Info from '../components/info';

const InfoCard = () => (
  <div>
    <Info />
  </div>
);

// Ejemplo en Informacion.jsx
const handleSeleccionarVehiculo = (vehiculo) => {
  localStorage.setItem('datosVehiculo', JSON.stringify({
    precioVehiculo: vehiculo.precio,
    gestionEnvio: vehiculo.gestionEnvio,
    // ...otros datos que necesites
  }));
  // ...tu lógica para avanzar
};

export default InfoCard;