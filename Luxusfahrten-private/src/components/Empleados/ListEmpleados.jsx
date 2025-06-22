import React from 'react';
import EmpleadoCard from './EmpleadoCard';

const ListEmpleados = ({
  empleados,
  onUpdateEmpleado,
  onDeleteEmpleado,
  loading,
  setActiveTab,
  cleanData
}) => {

 const handleAddNew = () => {
    cleanData(); // Limpiar datos antes de mostrar el formulario
    setActiveTab('form'); // Cambiar a la pestaña del formulario
  };

  return (
    <>
      <h2 className="text-center fw-bold mb-4" style={{ color: "#fff" }}>
        Listado de empleados
      </h2>
      <div style={{
        backgroundColor: '#5a5a5a',
        borderRadius: '10px',
        padding: '20px',
        color: 'white'
      }}>
        <div className="row g-4 justify-content-center">
          {loading && (
            <div className="col-12 text-center py-5">
              <p>Cargando...</p>
            </div>
          )}

          {empleados && empleados.map((empleado) => (
            <div key={empleado._id} className="col-md-4">
              <EmpleadoCard
                empleado={empleado}
                onUpdate={() => onUpdateEmpleado(empleado)}
                onDelete={() => onDeleteEmpleado(empleado._id)}
              />
            </div>
          ))}

          {(!empleados || empleados.length === 0) && !loading && (
            <div className="col-12 text-center py-5">
              <p>No hay empleados registrados.</p>
            </div>
          )}
        </div>

        <div className="d-flex justify-content-end mt-4">
          <button
            className="btn btn-light"
            onClick={handleAddNew}
            style={{ borderRadius: '4px' }}
          >
            Agregar
          </button>
        </div>
      </div>
    </>
  );
};

export default ListEmpleados;