// Importamos React y los hooks necesarios.
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Estilos de Bootstrap para diseño.
import { Link, useNavigate } from 'react-router-dom'; // Herramientas para navegación.

const Register = () => {
  const navigate = useNavigate(); // Controla la navegación programática entre rutas.

  // Estados para manejar los datos del formulario y visibilidad de contraseñas.
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [address, setAddress] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Función para manejar el envío del formulario.
  const handleSubmit = (e) => {
    e.preventDefault(); // Previene el comportamiento por defecto del formulario.
    console.log('Registrando usuario:', { email, password, confirmPassword, fullName, phone, birthdate, address });
  };

  // Funciones para alternar la visibilidad de contraseñas.
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  // Redirige al usuario a la página de inicio de sesión.
  const goToLogin = () => {
    navigate('/Login/');
  };

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center vh-100" style={{ backgroundColor: '#333' }}> {/* Fondo oscuro y diseño centrado */}
      <div className="card shadow-sm" style={{ maxWidth: '500px', width: '85%', backgroundColor: '#5a5a5a', color: 'white' }}>
        <div className="card-body p-4">
          <div className="text-center mb-3">
            <h1 className="h3" style={{ fontFamily: '"Playfair Display", serif', letterSpacing: '1px' }}>LUXUSFAHRTEN</h1> {/* Título estilizado */}
          </div>
          
          <h4 className="text-center mb-3 fw-normal">Registrarse</h4>
          
          {/* Formulario de registro */}
          <form onSubmit={handleSubmit}>
            {/* Campo de email */}
            <div className="mb-2">
              <label htmlFor="email" className="form-label small">Ingrese su correo</label>
              <input 
                type="email" 
                className="form-control" 
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)} // Actualiza el estado.
                placeholder="Email"
                required
              />
            </div>
            
            {/* Campo de contraseña con botón para alternar visibilidad */}
            <div className="mb-2">
              <label htmlFor="password" className="form-label small">Ingrese su contraseña</label>
              <div className="input-group">
                <input 
                  type={showPassword ? "text" : "password"} 
                  className="form-control" 
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)} 
                  placeholder="Password"
                  required
                />
                <button 
                  className="btn btn-outline-secondary" 
                  type="button"
                  onClick={togglePasswordVisibility}
                >
                  {/* Íconos SVG para mostrar u ocultar contraseña */}
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
            
            {/* Campo de confirmación de contraseña */}
            {/* ... */}
            
            {/* Otros campos del formulario */}
            {/* Nombre completo, teléfono, fecha de nacimiento, dirección */}
            
            <button type="submit" className="btn btn-light w-100 py-2 mb-2">Registrarse</button>
          </form>
          
          {/* Enlace para iniciar sesión */}
          <div className="text-center mt-2 small">
            <span>Ya tienes una cuenta? </span>
            <a className="text-white text-decoration-none" onClick={goToLogin}>Iniciar sesión</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
