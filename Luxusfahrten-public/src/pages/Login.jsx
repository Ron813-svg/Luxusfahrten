import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import useLoginUser from '../hooks/useLoginUser';
import { Toaster, toast } from 'react-hot-toast';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { login, isLoggedIn, userInfo, loading: authLoading } = useLoginUser();
  const [loading, setLoading] = useState(false);

  // Obtener la ruta de redirección
  const redirectTo = location.state?.redirectTo || localStorage.getItem('redirectAfterLogin') || '/';

  // Si ya está logueado, redirigir automáticamente
  useEffect(() => {
    if (isLoggedIn && userInfo && !authLoading) {
      toast.success(`¡Bienvenido de vuelta, ${userInfo.name}!`);
      localStorage.removeItem('redirectAfterLogin');
      navigate(redirectTo);
    }
  }, [isLoggedIn, userInfo, authLoading, navigate, redirectTo]);

  const onSubmit = async (data) => {
    setLoading(true);
    
    try {
      const result = await login(data);
      
      if (result.success) {
        toast.success(`¡Bienvenido, ${result.user.name}!`);
        
        // Limpiar la redirección guardada
        localStorage.removeItem('redirectAfterLogin');
        
        // Redirigir a la página deseada
        setTimeout(() => {
          navigate(redirectTo);
        }, 1200);
      } else {
        toast.error(result.error || "Correo o contraseña incorrectos");
      }
    } catch (error) {
      toast.error('Error inesperado al iniciar sesión');
      console.error('Error en login:', error);
    } finally {
      setLoading(false);
    }
  };

  const goToRegister = () => {
    navigate('/Register/');
  };

  const goToRecuperacion = () => {
    navigate('/Recuperacion/');
  };

  // Mostrar loading mientras se verifica la autenticación
  if (authLoading) {
    return (
      <div className="container-fluid d-flex justify-content-center align-items-center vh-100 bg-light">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Verificando sesión...</span>
          </div>
          <p className="mt-3">Verificando sesión...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center vh-100 bg-light">
      <Toaster position="top-center" />
      <div className="card shadow-sm" style={{ maxWidth: '500px', width: '100%', backgroundColor: '#5a5a5a', color: 'white' }}>
        <div className="card-body p-5">
          <div className="text-center mb-4">
            <h1 className="display-6" style={{ fontFamily: '"Playfair Display", serif', letterSpacing: '2px' }}>LUXUSFAHRTEN</h1>
          </div>
          
          <h4 className="text-center mb-4 fw-normal">Log in</h4>
          
          {/* Mostrar mensaje de redirección si existe */}
          {redirectTo !== '/' && (
            <div className="alert alert-info mb-4" role="alert">
              <small>
                <i className="bi bi-info-circle me-1"></i>
                Inicia sesión para continuar con tu compra
              </small>
            </div>
          )}
          
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label small">Ingrese su correo</label>
              <input
                type="email"
                className="form-control"
                id="email"
                {...register("email", { required: "El correo es obligatorio" })}
                placeholder="Email"
                disabled={loading}
              />
              {errors.email && <span className="text-danger small">{errors.email.message}</span>}
            </div>
            
            <div className="mb-2">
              <label htmlFor="password" className="form-label small">Ingrese su contraseña</label>
              <input
                type="password"
                className="form-control"
                id="password"
                {...register("password", { required: "La contraseña es obligatoria" })}
                placeholder="Password"
                disabled={loading}
              />
              {errors.password && <span className="text-danger small">{errors.password.message}</span>}
            </div>
            
            <div className="d-flex justify-content-end mb-3">
              <span 
                className="text-white text-decoration-none small" 
                style={{ cursor: "pointer" }} 
                onClick={goToRecuperacion}
              >
                Olvidaste contraseña?
              </span>
            </div>
            
            <button 
              type="submit" 
              className="btn btn-light w-100 mb-3"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Iniciando sesión...
                </>
              ) : (
                'Iniciar sesión'
              )}
            </button>
          </form>
          
          <div className="text-center mt-3 small">
            <span>No tienes cuenta? </span>
            <span 
              className="text-white text-decoration-none" 
              style={{ cursor: "pointer" }} 
              onClick={goToRegister}
            >
              Registrate
            </span>
          </div>
          
          <button
            className="btn btn-outline-light w-100 mt-3"
            onClick={() => {
              // Limpiar redirección si cancela el login
              localStorage.removeItem('redirectAfterLogin');
              navigate('/');
            }}
            disabled={loading}
          >
            Salir
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;