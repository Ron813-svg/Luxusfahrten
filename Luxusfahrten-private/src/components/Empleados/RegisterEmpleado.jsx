import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

const RegisterEmpleado = ({
  // Props del hook principal
  id,
  name,
  setName,
  actualDate,
  setActualDate,
  birthday,
  setBirthday,
  address,
  setAddress,
  email,
  setEmail,
  password,
  setPassword,
  telephone,
  setTelephone,
  employeeType,
  setEmployeeType,
  image,
  setImage,
  handleSubmit,
  handleUpdateEmpleado,
  cleanData,
  setActiveTab
}) => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [imagenPreview, setImagenPreview] = useState(null);

  // Efecto para manejar la preview de la imagen
  useEffect(() => {
    if (image && typeof image === 'string') {
      setImagenPreview(image);
    }
  }, [image]);

  const handleChange = (e) => {
    const { name: fieldName, value } = e.target;
    
    // Usar los setters del hook principal en lugar del estado local
    switch(fieldName) {
      case 'name':
        setName(value);
        break;
      case 'actualDate':
        setActualDate(value);
        break;
      case 'birthday':
        setBirthday(value);
        break;
      case 'address':
        setAddress(value);
        break;
      case 'email':
        setEmail(value);
        break;
      case 'password':
        setPassword(value);
        break;
      case 'telephone':
        setTelephone(value);
        break;
      case 'employeeType':
        setEmployeeType(value);
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

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    
    if (id) {
      // Modo edición - usar handleUpdate
      await handleUpdateEmpleado(e);
    } else {
      // Modo creación - usar handleSubmit
      await handleSubmit(e);
    }
  };

  const handleCancel = () => {
    cleanData();
    if (setActiveTab) {
      setActiveTab('list');
    } else {
      navigate('/empleados');
    }
  };

  return (
    <div className="container p-4" style={{ backgroundColor: '#5a5a5a', borderRadius: '10px', maxWidth: '900px' }}>
      <h3 className="text-white text-center mb-4">
        {id ? 'Actualizar Empleado' : 'Registrar Empleado'}
      </h3>
      <form onSubmit={onSubmit} encType="multipart/form-data">
        <div className="row">
          <div className="col-md-6">
            <div className="mb-3">
              <label htmlFor="name" className="form-label text-white">Ingrese su nombre completo</label>
              <input 
                type="text" 
                className="form-control bg-white text-xl text-dark border-0" 
                id="name"
                name="name"
                value={name || ''}
                onChange={handleChange}
                placeholder="Nombre"
                required
                style={{ height: '40px' }}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="birthday" className="form-label text-white">Fecha de nacimiento</label>
              <div className="input-group">
                <input 
                  type="date" 
                  className="form-control bg-dark text-white border-0" 
                  id="birthday"
                  name="birthday"
                  value={birthday || ''}
                  onChange={handleChange}
                  required
                  style={{ height: '40px' }}
                />
                <span className="input-group-text bg-dark text-white border-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-calendar" viewBox="0 0 16 16">
                    <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z"/>
                  </svg>
                </span>
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label text-white">Correo</label>
              <input 
                type="email" 
                className="form-control bg-dark text-white border-0" 
                id="email"
                name="email"
                value={email || ''}
                onChange={handleChange}
                placeholder="Correo electrónico"
                required
                style={{ height: '40px' }}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="telephone" className="form-label text-white">Teléfono</label>
              <input 
                type="tel" 
                className="form-control bg-dark text-white border-0" 
                id="telephone"
                name="telephone"
                value={telephone || ''}
                onChange={handleChange}
                placeholder="Teléfono celular"
                required
                style={{ height: '40px' }}
              />
            </div>

            <div className="mb-3 mt-4">
              <div className="d-flex">
                <div 
                  style={{
                    width: '150px',
                    height: '150px',
                    border: '1px solid #ccc',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginRight: '10px',
                    background: '#444',
                    borderRadius: '50%'
                  }}
                >
                  {imagenPreview ? (
                    <img 
                      src={imagenPreview} 
                      alt="Vista previa" 
                      style={{ maxWidth: '100%', maxHeight: '100%', borderRadius: '50%' }} 
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
                  id="image" 
                  name="image"
                  onChange={handleImageChange}
                  accept="image/*"
                />
                <label htmlFor="image" className="btn btn-outline-light" style={{ height: '40px', lineHeight: '28px' }}>
                  {id ? 'Cambiar' : 'Añadir'}
                </label>
              </div>
            </div>
          </div>
          
          <div className="col-md-6">
            <div className="mb-3">
              <label htmlFor="actualDate" className="form-label text-white">Fecha actual</label>
              <div className="input-group">
                <input 
                  type="date" 
                  className="form-control bg-dark text-white border-0" 
                  id="actualDate"
                  name="actualDate"
                  value={actualDate || ''}
                  onChange={handleChange}
                  required
                  style={{ height: '40px' }}
                />
                <span className="input-group-text bg-dark text-white border-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-calendar" viewBox="0 0 16 16">
                    <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z"/>
                  </svg>
                </span>
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="address" className="form-label text-white">Dirección</label>
              <input 
                type="text" 
                className="form-control bg-dark text-white border-0" 
                id="address"
                name="address"
                value={address || ''}
                onChange={handleChange}
                placeholder="Dirección"
                required
                style={{ height: '40px' }}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label text-white">
                Contraseña {id && <small></small>}
              </label>
              <div className="input-group">
                <input 
                  type={showPassword ? "text" : "password"} 
                  className="form-control bg-dark text-white border-0" 
                  id="password"
                  name="password"
                  value={password || ''}
                  onChange={handleChange}
                  placeholder="Contraseña"
                  required={!id} // Solo requerido en modo creación
                  style={{ height: '40px' }}
                />
                <button 
                  className="btn btn-outline-secondary bg-dark text-white border-0" 
                  type="button"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye-slash" viewBox="0 0 16 16">
                      <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z"/>
                      <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z"/>
                      <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z"/>
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye" viewBox="0 0 16 16">
                      <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
                      <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0 5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="employeeType" className="form-label text-white">Tipo de empleado</label>
              <select 
                className="form-select bg-dark text-white border-0" 
                id="employeeType"
                name="employeeType"
                value={employeeType || ''}
                onChange={handleChange}
                required
                style={{ height: '40px' }}
              >
                <option value="" disabled>Tipo de empleado</option>
                <option value="Administrador">Administrador</option>
                <option value="Ventas">Ventas</option>
                <option value="Mecánico">Mecánico</option>
                <option value="Atención al cliente">Atención al cliente</option>
              </select>
            </div>
          </div>
        </div>
        
        <div className="d-flex justify-content-between mt-3">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleCancel}
            style={{ width: '150px', height: '40px' }}
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="btn btn-light"
            style={{ width: '200px', height: '40px' }}
          >
            {id ? 'Actualizar' : 'Agregar'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterEmpleado;