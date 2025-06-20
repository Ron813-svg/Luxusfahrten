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
    cleanData();
    setActiveTab("form");
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-light" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
        <p className="mt-3">Cargando empleados...</p>
      </div>
    );
  }

  return (
    <div>
      {/* Botón para agregar nuevo empleado */}
      <div className="d-flex justify-content-end mb-4">
        <button
          className="btn fw-bold"
          onClick={handleAddNew}
          style={{
            backgroundColor: '#00fff7',
            color: '#000',
            borderRadius: '25px',
            padding: '10px 25px',
            border: 'none',
            letterSpacing: '1px'
          }}
        >
          + Agregar Empleado
        </button>
      </div>

      {/* Grid de empleados */}
      {empleados.length === 0 ? (
        <div className="text-center py-5">
          <h4 style={{ color: '#00fff7' }}>No hay empleados registrados</h4>
          <p className="text-muted">Agrega el primer empleado haciendo clic en el botón de arriba</p>
        </div>
      ) : (
        <div className="row">
          {empleados.map((empleado) => (
            <div key={empleado.id} className="col-lg-4 col-md-6 col-12 d-flex justify-content-center">
              <EmpleadoCard
                empleado={empleado}
                onUpdate={onUpdateEmpleado}
                onDelete={onDeleteEmpleado}
              />
            </div>
          ))}
        </div>
      )}

      {/* Estadísticas */}
      {empleados.length > 0 && (
        <div className="mt-4 p-3 rounded" style={{ backgroundColor: 'rgba(0, 255, 247, 0.1)' }}>
          <div className="row text-center">
            <div className="col-md-4">
              <h5 style={{ color: '#00fff7' }}>{empleados.length}</h5>
              <small className="text-muted">Total Empleados</small>
            </div>
            <div className="col-md-4">
              <h5 style={{ color: '#00fff7' }}>
                {empleados.filter(emp => emp.employeeType === 'Gerente').length}
              </h5>
              <small className="text-muted">Gerentes</small>
            </div>
            <div className="col-md-4">
              <h5 style={{ color: '#00fff7' }}>
                {empleados.filter(emp => emp.employeeType === 'Vendedor').length}
              </h5>
              <small className="text-muted">Vendedores</small>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListEmpleados;