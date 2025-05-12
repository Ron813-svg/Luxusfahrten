import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    fechaNacimiento: '',
    correo: '',
    telefono: '',
    fechaActual: '',
    direccion: '',
    contrasena: '',
    tipoEmpleado: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Datos del formulario:', formData);
    // Aquí iría la lógica para procesar el registro
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const goToLogin = () => {
    navigate('/Login/');
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100" style={{ backgroundColor: '#333' }}>
      <div className="card shadow-sm" style={{ maxWidth: '800px', width: '90%', backgroundColor: '#5a5a5a', color: 'white', borderRadius: '10px' }}>
        <div className="card-body p-5">
          <div className="text-center mb-4">
            <h1 className="display-6" style={{ fontFamily: '"Playfair Display", serif', letterSpacing: '2px' }}>LUXUSFAHRTEN</h1>
            <p className="text-white-50">Pasión por la excelencia, compromiso con el lujo</p>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="nombre" className="form-label small">Ingrese su nombre completo</label>
                <input 
                  type="text" 
                  className="form-control bg-white text-dark" 
                  id="nombre"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  placeholder="Nombre"
                  required
                />
              </div>
              
              <div className="col-md-6 mb-3">
                <label htmlFor="fechaActual" className="form-label small">Fecha actual</label>
                <div className="input-group">
                  <input 
                    type="date" 
                    className="form-control bg-white text-dark" 
                    id="fechaActual"
                    name="fechaActual"
                    value={formData.fechaActual}
                    onChange={handleChange}
                    placeholder="dd/mm/yyyy"
                    required
                  />
                  <span className="input-group-text bg-white text-dark border">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-calendar" viewBox="0 0 16 16">
                      <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z"/>
                    </svg>
                  </span>
                </div>
              </div>
            </div>
            
            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="fechaNacimiento" className="form-label small">Fecha de nacimiento</label>
                <div className="input-group">
                  <input 
                    type="date" 
                    className="form-control bg-white text-dark" 
                    id="fechaNacimiento"
                    name="fechaNacimiento"
                    value={formData.fechaNacimiento}
                    onChange={handleChange}
                    placeholder="dd/mm/yyyy"
                    required
                  />
                  <span className="input-group-text bg-white text-dark border">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-calendar" viewBox="0 0 16 16">
                      <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z"/>
                    </svg>
                  </span>
                </div>
              </div>
              
              <div className="col-md-6 mb-3">
                <label htmlFor="direccion" className="form-label small">Dirección</label>
                <input 
                  type="text" 
                  className="form-control bg-white text-dark" 
                  id="direccion"
                  name="direccion"
                  value={formData.direccion}
                  onChange={handleChange}
                  placeholder="Dirección"
                  required
                />
              </div>
            </div>
            
            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="correo" className="form-label small">Correo</label>
                <input 
                  type="email" 
                  className="form-control bg-white text-dark" 
                  id="correo"
                  name="correo"
                  value={formData.correo}
                  onChange={handleChange}
                  placeholder="Correo electrónico"
                  required
                />
              </div>
              
              <div className="col-md-6 mb-3">
                <label htmlFor="contrasena" className="form-label small">Contraseña</label>
                <div className="input-group">
                  <input 
                    type={showPassword ? "text" : "password"} 
                    className="form-control bg-white text-dark" 
                    id="contrasena"
                    name="contrasena"
                    value={formData.contrasena}
                    onChange={handleChange}
                    placeholder="Contraseña"
                    required
                  />
                  <button 
                    className="btn btn-outline-secondary bg-white" 
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
                        <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            </div>
            
            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="telefono" className="form-label small">Teléfono</label>
                <input 
                  type="tel" 
                  className="form-control bg-white text-dark" 
                  id="telefono"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleChange}
                  placeholder="Teléfono celular"
                  required
                />
              </div>
              
              <div className="col-md-6 mb-4">
                <label htmlFor="tipoEmpleado" className="form-label small">Tipo de empleado</label>
                <select 
                  className="form-select bg-white text-dark" 
                  id="tipoEmpleado"
                  name="tipoEmpleado"
                  value={formData.tipoEmpleado}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>Tipo de empleado</option>
                  <option value="admin">Administrador</option>
                  <option value="ventas">Ventas</option>
                  <option value="soporte">Soporte</option>
                </select>
              </div>
            </div>
            
            <div className="d-grid gap-2 col-8 mx-auto mt-4">
              <button type="submit" className="btn btn-light py-2" onClick={goToLogin}>
                Ingresar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;