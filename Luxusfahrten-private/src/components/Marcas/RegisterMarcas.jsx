import React from 'react';

const RegisterMarcas = ({
  id,
  brandName,
  setBrandName,
  handleSubmit,
  handleUpdate,
  cleanData,
  setActiveTab
}) => {
  const onSubmit = (e) => {
    e.preventDefault();
    if (id) {
      handleUpdate(e); // Actualizar marca
    } else {
      handleSubmit(e); // Registrar nueva marca
    }
  };

  const handleCancel = () => {
    cleanData();
    if (setActiveTab) {
      setActiveTab('list');
    }
  };

  return (
    <div
      className="container py-4"
      style={{
        maxWidth: '600px',
        backgroundColor: '#343a40',
        borderRadius: '12px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        color: 'white',
      }}
    >
      <h2 className="text-center mb-4">
        {id ? 'Actualizar Marca' : 'Registrar Marca'}
      </h2>
      <form onSubmit={onSubmit}>
        <div className="mb-3">
          <label htmlFor="brandName" className="form-label">
            Nombre de la Marca
          </label>
          <input
            type="text"
            id="brandName"
            className="form-control"
            placeholder="Ingrese el nombre de la marca"
            value={brandName || ''}
            onChange={(e) => setBrandName(e.target.value)}
            required
          />
        </div>
        <div className="d-flex justify-content-between">
          <button type="submit" className="btn btn-success">
            {id ? 'Actualizar' : 'Registrar'}
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleCancel}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterMarcas;