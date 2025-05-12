import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RestauradosCard from '../components/VehiculosRestaurados/RestauradosCard';

const Vehiculos = () => {
  const navigate = useNavigate();
  const [vehiculos, setVehiculos] = useState([
    {
      id: 1,
      modelo: 'Mercedes Clase A',
      anio: '2025',
      transmision: 'Manual',
      descripcion: 'It has a petrol engine with a fuel economy range from 6.5L/700km to 8.9L/100km, depending on the model badge.',
      imageUrl: 'https://image-proxy.kws.kaavan.es/i/1200-630/noticias/f7ef0696-7422-4823-9dc8-bf7f3d4d3a80/medias/35918.jpg?format=webp'
    },
    // Puedes agregar más vehículos aquí si lo deseas
  ]);

  const handleUpdateVehiculo = (id) => {
    console.log(`Actualizar vehículo con ID: ${id}`);
    // Aquí puedes redirigir a una página de actualización o implementar la lógica que necesites
  };

  const handleDeleteVehiculo = (id) => {
    if (window.confirm("¿Está seguro que desea eliminar este vehículo restaurado?")) {
      setVehiculos(vehiculos.filter(vehiculo => vehiculo.id !== id));
    }
  };

  const handleAgregarClick = () => {
    navigate('/RegisterRestaurado');
  };

  return (
    <div style={{ backgroundColor: '#9E9E9E', minHeight: '100vh' }}>
      <div className="container py-5">
        <div className="card" style={{ 
          backgroundColor: '#5a5a5a', 
          border: 'none', 
          borderRadius: '10px', 
          padding: '20px', 
          marginBottom: '20px' 
        }}>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="text-white mb-0">Vehículos Restaurados</h2>
          </div>
          
          <div className="row">
            {vehiculos.map((vehiculo) => (
              <div key={vehiculo.id} className="col-md-4">
                <RestauradosCard 
                  vehiculo={vehiculo} 
                  onUpdate={handleUpdateVehiculo} 
                  onDelete={handleDeleteVehiculo} 
                />
              </div>
            ))}
            
            {vehiculos.length === 0 && (
              <div className="col-12 text-center py-5 text-white">
                <p>No hay vehículos restaurados registrados.</p>
              </div>
            )}
          </div>
          
          <div className="d-flex justify-content-end mt-3">
            <button 
              className="btn btn-light" 
              onClick={handleAgregarClick}
            >
              Agregar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Vehiculos;