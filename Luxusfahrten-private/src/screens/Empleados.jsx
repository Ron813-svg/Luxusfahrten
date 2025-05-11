import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import EmpleadoCard from '../components/Empleados/EmpleadoCard';

const Empleados = () => {
  const navigate = useNavigate();
  const [empleados, setEmpleados] = useState([
    {
      id: 1,
      nombre: 'Tony Javier Sánchez Alvarado',
      correo: 'tony@gmail.com',
      telefono: '7456-9523',
      tipoEmpleado: 'Administrador',
      direccion: 'Colonia Escalón, San Salvador',
      fechaNacimiento: '1990-05-15',
      fechaActual: '2023-06-01',
      imageUrl: 'https://thumbs.dreamstime.com/b/avatar-de-imagen-perfil-predeterminado-icono-usuario-persona-an%C3%B3nimo-iconos-masculino-y-marcador-posici%C3%B3n-fotograf%C3%ADa-hombre-272206807.jpg'
    },
    // Puedes agregar más empleados aquí si lo deseas
  ]);

  const handleUpdateEmpleado = (id) => {
    console.log(`Actualizar empleado con ID: ${id}`);
    // Aquí puedes implementar la lógica para actualizar un empleado
  };

  const handleDeleteEmpleado = (id) => {
    if (window.confirm('¿Está seguro que desea eliminar este empleado?')) {
      setEmpleados(empleados.filter((empleado) => empleado.id !== id));
    }
  };

  const handleAgregarClick = () => {
    navigate('/RegisterEmpleado');
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
            <h2 className="text-white mb-0">Empleados</h2>
          </div>

          <div className="row">
            {empleados.map((empleado) => (
              <div key={empleado.id} className="col-md-4">
                <EmpleadoCard
                  empleado={empleado}
                  onUpdate={() => handleUpdateEmpleado(empleado.id)}
                  onDelete={() => handleDeleteEmpleado(empleado.id)}
                />
              </div>
            ))}

            {empleados.length === 0 && (
              <div className="col-12 text-center py-5 text-white">
                <p>No hay empleados registrados.</p>
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

export default Empleados;