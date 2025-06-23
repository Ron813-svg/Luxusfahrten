import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const RegisterVehiculo = ({
  id,
  idBrand,
  setIdBrand,
  idModel,
  setIdModel,
  year,
  setYear,
  price,
  setPrice,
  type,
  setType,
  color,
  setColor,
  description,
  setDescription,
  specs,
  setSpecs,
  availability,
  setAvailability,
  image,
  setImage,
  brands,
  models,
  handleSubmit,
  cleanData,
  setActiveTab,
  loading,
  error,
  success
}) => {
  const [imagenPreview, setImagenPreview] = useState(null);

  useEffect(() => {
    if (image && typeof image === 'string') {
      setImagenPreview(image);
    }
  }, [image]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    switch(name) {
      case 'idBrand':
        setIdBrand(value);
        break;
      case 'idModel':
        setIdModel(value);
        break;
      case 'year':
        setYear(value);
        break;
      case 'price':
        setPrice(value);
        break;
      case 'type':
        setType(value);
        break;
      case 'color':
        setColor(value);
        break;
      case 'description':
        setDescription(value);
        break;
      case 'specs':
        setSpecs(value);
        break;
      case 'availability':
        setAvailability(value);
        break;
      default:
        break;
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagenPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await handleSubmit(e);
  };

  const handleCancel = () => {
    cleanData();
    setActiveTab('list');
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100" style={{ backgroundColor: '#9E9E9E' }}>
      <div className="container p-4" style={{ backgroundColor: '#5a5a5a', borderRadius: '10px', maxWidth: '900px' }}>
        <h3 className="text-white text-center mb-4">
          {id ? 'Actualizar Vehículo' : 'Registrar Vehículo'}
        </h3>

        {error && (
          <div className="alert alert-danger text-center py-2 small mb-3">
            {error}
          </div>
        )}

        {success && (
          <div className="alert alert-success text-center py-2 small mb-3">
            {success}
          </div>
        )}

        <form onSubmit={onSubmit} encType="multipart/form-data">
          <div className="row">
            <div className="col-md-6">
              <div className="mb-3">
                <label htmlFor="idBrand" className="form-label text-white">Marca</label>
                <select 
                  className="form-select bg-white text-dark border-0" 
                  id="idBrand"
                  name="idBrand"
                  value={idBrand || ''}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  style={{ height: '40px' }}
                >
                  <option value="" disabled>Seleccione la marca</option>
                  {(brands || []).map((brand) => (
                    <option key={brand._id} value={brand._id}>
                      {brand.brandName}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-3">
                <label htmlFor="year" className="form-label text-white">Año del vehículo</label>
                <input 
                  type="number" 
                  className="form-control bg-white text-dark border-0" 
                  id="year"
                  name="year"
                  value={year || ''}
                  onChange={handleChange}
                  placeholder="2024"
                  min="1900"
                  max="2030"
                  required
                  disabled={loading}
                  style={{ height: '40px' }}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="type" className="form-label text-white">Tipo</label>
                <select 
                  className="form-select bg-white text-dark border-0" 
                  id="type"
                  name="type"
                  value={type || ''}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  style={{ height: '40px' }}
                >
                  <option value="" disabled>Seleccione el tipo</option>
                  <option value="Sedán">Sedán</option>
                  <option value="SUV">SUV</option>
                  <option value="Deportivo">Deportivo</option>
                  <option value="Convertible">Convertible</option>
                  <option value="Coupe">Coupe</option>
                  <option value="Hatchback">Hatchback</option>
                </select>
              </div>

              <div className="mb-3">
                <label htmlFor="description" className="form-label text-white">Descripción</label>
                <textarea 
                  className="form-control bg-white text-dark border-0" 
                  id="description"
                  name="description"
                  value={description || ''}
                  onChange={handleChange}
                  placeholder="Descripción del vehículo"
                  rows="4"
                  required
                  disabled={loading}
                />
              </div>

              <div className="mb-3 mt-4">
                <div className="d-flex">
                  <div 
                    style={{
                      width: '150px',
                      height: '100px',
                      border: '1px solid #ccc',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginRight: '10px',
                      background: '#444'
                    }}
                  >
                    {imagenPreview ? (
                      <img 
                        src={imagenPreview} 
                        alt="Vista previa" 
                        style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} 
                      />
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" className="bi bi-camera text-white" viewBox="0 0 16 16">
                        <path d="M15 12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h1.172a3 3 0 0 0 2.12-.879l.83-.828A1 1 0 0 1 6.827 3h2.344a1 1 0 0 1 .707.293l.828.828A3 3 0 0 0 12.828 5H14a1 1 0 0 1 1 1zM2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4z"/>
                        <path d="M8 11a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5m0 1a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7M3 6.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0"/>
                      </svg>
                    )}
                  </div>
                  <input 
                    type="file" 
                    className="d-none" 
                    id="imagen" 
                    name="imagen"
                    onChange={handleImageChange}
                    accept="image/*"
                    disabled={loading}
                  />
                  <label htmlFor="imagen" className="btn btn-outline-light" style={{ height: '40px', lineHeight: '28px' }}>
                    {id ? 'Cambiar' : 'Añadir'}
                  </label>
                </div>
              </div>
            </div>
            
            <div className="col-md-6">
              <div className="mb-3">
                <label htmlFor="idModel" className="form-label text-white">Modelo</label>
                <select 
                  className="form-select bg-white text-dark border-0" 
                  id="idModel"
                  name="idModel"
                  value={idModel || ''}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  style={{ height: '40px' }}
                >
                  <option value="" disabled>Seleccione el modelo</option>
                  {(models || []).map((model) => (
                    <option key={model._id} value={model._id}>
                      {model.nameModel}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-3">
                <label htmlFor="price" className="form-label text-white">Precio</label>
                <input 
                  type="number" 
                  className="form-control bg-white text-dark border-0" 
                  id="price"
                  name="price"
                  value={price || ''}
                  onChange={handleChange}
                  placeholder="50000"
                  min="0"
                  step="0.01"
                  required
                  disabled={loading}
                  style={{ height: '40px' }}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="color" className="form-label text-white">Color del vehículo</label>
                <input 
                  type="text" 
                  className="form-control bg-white text-dark border-0" 
                  id="color"
                  name="color"
                  value={color || ''}
                  onChange={handleChange}
                  placeholder="Ingrese el color del vehículo"
                  required
                  disabled={loading}
                  style={{ height: '40px' }}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="specs" className="form-label text-white">Especificaciones</label>
                <textarea 
                  className="form-control bg-white text-dark border-0" 
                  id="specs"
                  name="specs"
                  value={specs || ''}
                  onChange={handleChange}
                  placeholder="Especificaciones técnicas del vehículo"
                  rows="4"
                  required
                  disabled={loading}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="availability" className="form-label text-white">Disponibilidad</label>
                <select 
                  className="form-select bg-white text-dark border-0" 
                  id="availability"
                  name="availability"
                  value={availability || ''}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  style={{ height: '40px' }}
                >
                  <option value="" disabled>Seleccione la disponibilidad</option>
                  <option value="disponible">Disponible</option>
                  <option value="vendido">Vendido</option>
                  <option value="reservado">Reservado</option>
                </select>
              </div>
            </div>
          </div>
          
          <div className="d-flex justify-content-between mt-3">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleCancel}
              disabled={loading}
              style={{ width: '150px', height: '40px' }}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="btn btn-light"
              disabled={loading}
              style={{ width: '200px', height: '40px' }}
            >
              {loading ? 'Procesando...' : (id ? 'Actualizar' : 'Agregar')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterVehiculo;