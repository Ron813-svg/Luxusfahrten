import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí iría la lógica para manejar el inicio de sesión
    console.log('Iniciando sesión con:', email, password);
    
    // Navegar a la página principal después de iniciar sesión
    navigate('/PantallaPrincipal/');
  };

  // Función para navegar a la página de registro
  const goToRegister = () => {
    navigate('/Register/');
  };

  const goToRecuperacion = () => {
    navigate('/Recuperacion/');
  };

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow-sm" style={{ maxWidth: '500px', width: '100%', backgroundColor: '#5a5a5a', color: 'white' }}>
        <div className="card-body p-5">
          <div className="text-center mb-4">
            <h1 className="display-6" style={{ fontFamily: '"Playfair Display", serif', letterSpacing: '2px' }}>LUXUSFAHRTEN</h1>
          </div>
          
          <h4 className="text-center mb-4 fw-normal">Log in</h4>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label small">Ingrese su correo</label>
              <input 
                type="email" 
                className="form-control" 
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
              />
            </div>
            
            <div className="mb-2">
              <label htmlFor="password" className="form-label small">Ingrese su contraseña</label>
              <input 
                type="password" 
                className="form-control" 
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
              />
            </div>
            
            <div className="d-flex justify-content-end mb-3">
              <a className="text-white text-decoration-none small" onClick={goToRecuperacion}>Olvidaste contraseña?</a>
            </div>
            
            <button type="submit" className="btn btn-light w-100 mb-3">Iniciar sesión</button>
          </form>
          
          <div className="text-center mt-3 small">
            <span>No tienes cuenta? </span>
            <a className="text-white text-decoration-none" onClick={goToRegister}>Registrate</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;