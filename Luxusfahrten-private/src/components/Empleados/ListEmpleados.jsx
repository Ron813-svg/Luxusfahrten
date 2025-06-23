import React, { useState } from 'react';
import EmpleadoCard from './EmpleadoCard';

const ListEmpleados = ({
  empleados,
  onUpdateEmpleado,
  onDeleteEmpleado,
  loading,
  setActiveTab,
  cleanData
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleAddNew = () => {
    cleanData();
    setActiveTab('form');
  };

  const filteredEmpleados = empleados?.filter(empleado =>
    empleado.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    empleado.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    empleado.employeeType?.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#2d2d2d', padding: '20px' }}>
      {/* Header con título y barra de búsqueda */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div className="d-flex align-items-center">
          <h2 className="text-white fw-bold mb-0 me-4">Empleados</h2>
          <div className="position-relative">
            <input
              type="text"
              className="form-control"
              placeholder="Buscar empleado..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                backgroundColor: '#4a4a4a',
                border: '1px solid #5a5a5a',
                borderRadius: '20px',
                color: 'white',
                paddingLeft: '40px',
                width: '300px',
                height: '40px'
              }}
            />
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="16" 
              height="16" 
              fill="currentColor" 
              className="bi bi-search position-absolute text-muted"
              style={{ left: '12px', top: '50%', transform: 'translateY(-50%)' }}
              viewBox="0 0 16 16"
            >
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
            </svg>
          </div>
        </div>
        
        <button
          className="btn btn-light d-flex align-items-center"
          onClick={handleAddNew}
          style={{ 
            borderRadius: '6px',
            padding: '10px 20px',
            fontWeight: '500'
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus me-2" viewBox="0 0 16 16">
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
          </svg>
          Agregar
        </button>
      </div>

      {/* Contenedor principal */}
      <div style={{
        backgroundColor: '#3a3a3a',
        borderRadius: '12px',
        padding: '24px',
        minHeight: '600px'
      }}>
        {loading && (
          <div className="text-center py-5">
            <div className="spinner-border text-light" role="status">
              <span className="visually-hidden">Cargando...</span>
            </div>
            <p className="text-white mt-3">Cargando empleados...</p>
          </div>
        )}

        {!loading && filteredEmpleados.length === 0 && searchTerm && (
          <div className="text-center py-5">
            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="currentColor" className="bi bi-search text-muted mb-3" viewBox="0 0 16 16">
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
            </svg>
            <p className="text-muted">No se encontraron empleados que coincidan con "{searchTerm}"</p>
          </div>
        )}

        {!loading && (!empleados || empleados.length === 0) && !searchTerm && (
          <div className="text-center py-5">
            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="currentColor" className="bi bi-people text-muted mb-3" viewBox="0 0 16 16">
              <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8Zm-7.978-1A.261.261 0 0 1 7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002A.274.274 0 0 1 15 13H7ZM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816ZM4.92 10A5.493 5.493 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275ZM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0Zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z"/>
            </svg>
            <p className="text-muted">No hay empleados registrados.</p>
            <button
              className="btn btn-outline-light mt-3"
              onClick={handleAddNew}
            >
              Agregar primer empleado
            </button>
          </div>
        )}

        {!loading && filteredEmpleados.length > 0 && (
          <div>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <span className="text-muted">
                Mostrando {filteredEmpleados.length} de {empleados?.length || 0} empleados
              </span>
            </div>
            
            {filteredEmpleados.map((empleado) => (
              <EmpleadoCard
                key={empleado._id}
                empleado={empleado}
                onUpdate={() => onUpdateEmpleado(empleado)}
                onDelete={() => onDeleteEmpleado(empleado._id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ListEmpleados;