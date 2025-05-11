import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import VehiculoCard from '../components/Vehiculos/VehiculoCard';

const RegisterVehiculo = () => {
  const navigate = useNavigate();

  const [vehiculos, setVehiculos] = useState([
    {
      id: 1,
      marca: 'Porsche',
      modelo: 'Porsche 911',
      anio: '2011',
      precio: '50000',
      transmision: 'Manual',
      tipo: 'Sedán',
      color: 'Negro',
      descripcion: 'The GTS has a 3.8-liter six-cylinder engine that produces 408 horsepower and 310 pound-feet of torque.',
      especificaciones: 'Motor 2.0L, 4 cilindros, 250 HP.',
      disponibilidad: 'Disponible',
      imagen: 'https://via.placeholder.com/200x150?text=Mercedes+A'
    },
    // Puedes agregar más vehículos aquí si lo deseas
  ]);

  const handleUpdateVehiculo = (id) => {
    console.log(`Actualizar vehículo con ID: ${id}`);
    // Aquí puedes implementar la lógica para actualizar un vehículo
  };

  const handleDeleteVehiculo = (id) => {
    if (window.confirm('¿Está seguro que desea eliminar este vehículo?')) {
      setVehiculos(vehiculos.filter((vehiculo) => vehiculo.id !== id));
    }
  };

  const handleAgregarClick = () => {
    navigate('/RegisterVehiculo/');
  };

  return (
    <div style={{ backgroundColor: '#9E9E9E', minHeight: '100vh' }}>
      <div className="container py-5">
        <div
          className="card"
          style={{
            backgroundColor: '#5a5a5a',
            border: 'none',
            borderRadius: '10px',
            padding: '20px',
            marginBottom: '20px',
          }}
        >
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="text-white mb-0">Vehículos</h2>
          </div>

          <div className="row">
            {vehiculos.map((vehiculo) => (
              <div key={vehiculo.id} className="col-md-4">
                <VehiculoCard
                  vehiculo={vehiculo}
                  onUpdate={() => handleUpdateVehiculo(vehiculo.id)}
                  onDelete={() => handleDeleteVehiculo(vehiculo.id)}
                />
              </div>
            ))}

            {vehiculos.length === 0 && (
              <div className="col-12 text-center py-5 text-white">
                <p>No hay vehículos registrados.</p>
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

export default RegisterVehiculo;