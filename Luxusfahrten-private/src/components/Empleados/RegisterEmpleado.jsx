import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

const RegisterEmpleado = ({
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
  handleUpdate,
  cleanData,
  setActiveTab
}) => {

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [imagenPreview, setImagenPreview] = useState(null);

  useEffect(() => {
    if (image && typeof image === 'string') {
      setImagenPreview(image);
    }
  }, [image]);

  const handleChange = (e) => {
    const { name: fieldName, value } = e.target;
    
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
      await handleUpdate(e);
    } else {
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
    <div style={{ minHeight: '100vh', backgroundColor: '#2d2d2d', padding: '20px' }}>
      {/* Header */}
      <div className="d-flex align-items-center mb-4">
        <button
          onClick={handleCancel}
          className="btn btn-link text-white p-0 me-3"
          style={{ textDecoration: 'none' }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
          </svg>
        </button>
        <h2 className="text-white fw-bold mb-0">
          {id ? 'Actualizar Empleado' : 'Agregar Empleado'}
        </h2>
      </div>

      {/* Formulario principal */}
      <div style={{
        backgroundColor: '#3a3a3a',
        borderRadius: '12px',
        padding: '32px',
        maxWidth: '1000px',
        margin: '0 auto'
      }}>
        <form onSubmit={onSubmit} encType="multipart/form-data">
          <div className="row g-4">
            {/* Columna izquierda */}
            <div className="col-md-6">
              {/* Imagen de perfil */}
              <div className="text-center mb-4">
                <div className="position-relative d-inline-block">
                  <div 
                    style={{
                      width: '120px',
                      height: '120px',
                      borderRadius: '50%',
                      backgroundColor: '#4a4a4a',
                      border: '3px solid #5a5a5a',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      overflow: 'hidden'
                    }}
                  >
                    {imagenPreview ? (
                      <img 
                        src={imagenPreview} 
                        alt="Vista previa" 
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                      />
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" className="bi bi-person text-white" viewBox="0 0 16 16">
                        <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z"/>
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
                  <label 
                    htmlFor="image" 
                    className="btn btn-sm btn-light position-absolute"
                    style={{
                      bottom: '0',
                      right: '0',
                      borderRadius: '50%',
                      width: '32px',
                      height: '32px',
                      padding: '0',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-camera" viewBox="0 0 16 16">
                      <path d="M15 12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h1.172a3 3 0 0 0 2.12-.879l.83-.828A1 1 0 0 1 6.827 3h2.344a1 1 0 0 1 .707.293l.828.828A3 3 0 0 0 12.828 5H14a1 1 0 0 1 1 1zM2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4z"/>
                      <path d="M8 11a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5m0 1a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7M3 6.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0"/>
                    </svg>
                  </label>
                </div>
              </div>

              {/* Campos del formulario - Columna izquierda */}
              <div className="mb-3">
                <label className="form-label text-white mb-2">Nombre completo</label>
                <input 
                  type="text" 
                  className="form-control" 
                  name="name"
                  value={name || ''}
                  onChange={handleChange}
                  placeholder="Ingrese el nombre completo"
                  required
                  style={{ 
                    backgroundColor: '#4a4a4a',
                    border: '1px solid #5a5a5a',
                    borderRadius: '8px',
                    color: 'white',
                    height: '48px'
                  }}
                />
              </div>

              <div className="mb-3">
                <label className="form-label text-white mb-2">Correo electrónico</label>
                <input 
                  type="email" 
                  className="form-control" 
                  name="email"
                  value={email || ''}
                  onChange={handleChange}
                  placeholder="correo@ejemplo.com"
                  required
                  style={{ 
                    backgroundColor: '#4a4a4a',
                    border: '1px solid #5a5a5a',
                    borderRadius: '8px',
                    color: 'white',
                    height: '48px'
                  }}
                />
              </div>

              <div className="mb-3">
                <label className="form-label text-white mb-2">Teléfono</label>
                <input 
                  type="tel" 
                  className="form-control" 
                  name="telephone"
                  value={telephone || ''}
                  onChange={handleChange}
                  placeholder="Número de teléfono"
                  required
                  style={{ 
                    backgroundColor: '#4a4a4a',
                    border: '1px solid #5a5a5a',
                    borderRadius: '8px',
                    color: 'white',
                    height: '48px'
                  }}
                />
              </div>

              <div className="mb-3">
                <label className="form-label text-white mb-2">Dirección</label>
                <input 
                  type="text" 
                  className="form-control" 
                  name="address"
                  value={address || ''}
                  onChange={handleChange}
                  placeholder="Dirección completa"
                  required
                  style={{ 
                    backgroundColor: '#4a4a4a',
                    border: '1px solid #5a5a5a',
                    borderRadius: '8px',
                    color: 'white',
                    height: '48px'
                  }}
                />
              </div>
            </div>

            {/* Columna derecha */}
            <div className="col-md-6">
              <div className="mb-3">
                <label className="form-label text-white mb-2">Fecha de nacimiento</label>
                <input 
                  type="date" 
                  className="form-control" 
                  name="birthday"
                  value={birthday || ''}
                  onChange={handleChange}
                  required
                  style={{ 
                    backgroundColor: '#4a4a4a',
                    border: '1px solid #5a5a5a',
                    borderRadius: '8px',
                    color: 'white',
                    height: '48px'
                  }}
                />
              </div>

              <div className="mb-3">
                <label className="form-label text-white mb-2">Fecha de ingreso</label>
                <input 
                  type="date" 
                  className="form-control" 
                  name="actualDate"
                  value={actualDate || ''}
                  onChange={handleChange}
                  required
                  style={{ 
                    backgroundColor: '#4a4a4a',
                    border: '1px solid #5a5a5a',
                    borderRadius: '8px',
                    color: 'white',
                    height: '48px'
                  }}
                />
              </div>

              <div className="mb-3">
                <label className="form-label text-white mb-2">
                  Contraseña {id && <small className="text-muted">(dejar vacío para mantener actual)</small>}
                </label>
                <div className="position-relative">
                  <input 
                    type={showPassword ? "text" : "password"} 
                    className="form-control" 
                    name="password"
                    value={password || ''}
                    onChange={handleChange}
                    placeholder="Contraseña"
                    required={!id}
                    style={{ 
                      backgroundColor: '#4a4a4a',
                      border: '1px solid #5a5a5a',
                      borderRadius: '8px',
                      color: 'white',
                      height: '48px',
                      paddingRight: '48px'
                    }}
                  />
                  <button 
                    type="button"
                    className="btn position-absolute"
                    onClick={togglePasswordVisibility}
                    style={{
                      right: '8px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      border: 'none',
                      background: 'none',
                      color: '#adb5bd'
                    }}
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
                        <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              <div className="mb-4">
                <label className="form-label text-white mb-2">Tipo de empleado</label>
                <select 
                  className="form-select" 
                  name="employeeType"
                  value={employeeType || ''}
                  onChange={handleChange}
                  required
                  style={{ 
                    backgroundColor: '#4a4a4a',
                    border: '1px solid #5a5a5a',
                    borderRadius: '8px',
                    color: 'white',
                    height: '48px'
                  }}
                >
                  <option value="" disabled>Seleccionar tipo de empleado</option>
                  <option value="Administrador">Administrador</option>
                  <option value="Ventas">Ventas</option>
                  <option value="Mecánico">Mecánico</option>
                  <option value="Atención al cliente">Atención al cliente</option>
                </select>
              </div>
            </div>
          </div>
          
          {/* Botones de acción */}
          <div className="d-flex justify-content-end gap-3 mt-4 pt-4" style={{ borderTop: '1px solid #5a5a5a' }}>
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={handleCancel}
              style={{ 
                minWidth: '120px',
                height: '48px',
                borderRadius: '8px',
                borderColor: '#6c757d',
                color: '#6c757d'
              }}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="btn btn-light"
              style={{ 
                minWidth: '120px',
                height: '48px',
                borderRadius: '8px',
                fontWeight: '500'
              }}
            >
              {id ? 'Actualizar' : 'Agregar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterEmpleado;