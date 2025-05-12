import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

const RegisterVehiculo = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    marca: '',
    modelo: '',
    anio: '',
    precio: '',
    tipo: '',
    color: '',
    descripcion: '',
    especificaciones: '',
    disponibilidad: '',
    imagen: null
  });

  const [imagenPreview, setImagenPreview] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, imagen: file });
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagenPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Datos del vehículo:', formData);
    // Aquí iría el código para enviar los datos al servidor
    navigate('/vehiculos');
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100" style={{ backgroundColor: '#9E9E9E' }}>
      <div className="container p-4" style={{ backgroundColor: '#5a5a5a', borderRadius: '10px', maxWidth: '900px' }}>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6">
              <div className="mb-3">
                <label htmlFor="marca" className="form-label text-white">Marca</label>
                <select 
                  className="form-select bg-white text-dark border-0" 
                  id="marca"
                  name="marca"
                  value={formData.marca}
                  onChange={handleChange}
                  required
                  style={{ height: '40px' }}
                >
                  <option value="" disabled>Seleccione la marca</option>
                  <option value="mercedes">Mercedes-Benz</option>
                  <option value="bmw">BMW</option>
                  <option value="audi">Audi</option>
                  <option value="porsche">Porsche</option>
                  <option value="ferrari">Ferrari</option>
                  <option value="lamborghini">Lamborghini</option>
                </select>
              </div>

              <div className="mb-3">
                <label htmlFor="anio" className="form-label text-white">Año del vehículo</label>
                <div className="input-group">
                  <input 
                    type="date" 
                    className="form-control bg-white text-dark border-0" 
                    id="anio"
                    name="anio"
                    value={formData.anio}
                    onChange={handleChange}
                    placeholder="dd/mm/yyyy"
                    required
                    style={{ height: '40px' }}
                  />
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="tipo" className="form-label text-white">Tipo</label>
                <input 
                  type="text" 
                  className="form-control bg-white text-dark border-0" 
                  id="tipo"
                  name="tipo"
                  value={formData.tipo}
                  onChange={handleChange}
                  placeholder="Tipo de vehículo"
                  required
                  style={{ height: '40px' }}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="descripcion" className="form-label text-white">Descripción</label>
                <textarea 
                  className="form-control bg-white text-dark border-0" 
                  id="descripcion"
                  name="descripcion"
                  value={formData.descripcion}
                  onChange={handleChange}
                  placeholder="Descripción del vehículo"
                  rows="4"
                  required
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
                        style={{ maxWidth: '100%', maxHeight: '100%' }} 
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
                  />
                  <label htmlFor="imagen" className="btn btn-outline-light" style={{ height: '40px', lineHeight: '28px' }}>
                    Añadir
                  </label>
                </div>
              </div>
            </div>
            
            <div className="col-md-6">
              <div className="mb-3">
                <label htmlFor="modelo" className="form-label text-white">Modelo</label>
                <select 
                  className="form-select bg-white text-dark border-0" 
                  id="modelo"
                  name="modelo"
                  value={formData.modelo}
                  onChange={handleChange}
                  required
                  style={{ height: '40px' }}
                >
                  <option value="" disabled>Seleccione el modelo</option>
                  <option value="clase_s">Clase S</option>
                  <option value="serie_7">Serie 7</option>
                  <option value="a8">A8</option>
                  <option value="911">911</option>
                  <option value="488">488</option>
                  <option value="huracan">Huracán</option>
                </select>
              </div>

              <div className="mb-3">
                <label htmlFor="precio" className="form-label text-white">Precio</label>
                <input 
                  type="text" 
                  className="form-control bg-white text-dark border-0" 
                  id="precio"
                  name="precio"
                  value={formData.precio}
                  onChange={handleChange}
                  placeholder="Precio"
                  required
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
                  value={formData.color}
                  onChange={handleChange}
                  placeholder="Ingrese el color del vehículo"
                  required
                  style={{ height: '40px' }}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="especificaciones" className="form-label text-white">Especificaciones</label>
                <textarea 
                  className="form-control bg-white text-dark border-0" 
                  id="especificaciones"
                  name="especificaciones"
                  value={formData.especificaciones}
                  onChange={handleChange}
                  placeholder="Especificaciones del vehículo"
                  rows="4"
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="disponibilidad" className="form-label text-white">Disponibilidad</label>
                <select 
                  className="form-select bg-white text-dark border-0" 
                  id="disponibilidad"
                  name="disponibilidad"
                  value={formData.disponibilidad}
                  onChange={handleChange}
                  required
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
          
          <div className="d-flex justify-content-end mt-3">
            <button 
              type="submit" 
              className="btn btn-light"
              style={{ width: '200px', height: '40px' }}
            >
              Agregar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterVehiculo;