import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import "bootstrap/dist/css/bootstrap.min.css";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { Login: loginWithContext, authCokie, loading, user } = useAuth();

  // Obtener la ruta de redirección si viene de una compra
  const redirectTo = location.state?.redirectTo || 
                    localStorage.getItem('redirectAfterLogin') || 
                    '/pantallaprincipal';

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error("Por favor, completa todos los campos.");
      return;
    }

    setIsLoading(true);
    
    try {
      const result = await loginWithContext(email, password);

      if (result.success) {
        const userName = result.user?.name || email;
        toast.success(`¡Bienvenido, ${userName}!`);
        
        // Limpiar la redirección guardada
        localStorage.removeItem('redirectAfterLogin');
        
        console.log('Login exitoso, redirigiendo a:', redirectTo);
        
        // Dar tiempo para que el toast se muestre y luego redirigir
        setTimeout(() => {
          navigate(redirectTo, { replace: true });
        }, 1500);
      } else {
        toast.error(result.message || "Error al iniciar sesión");
      }
    } catch (error) {
      console.error("Error inesperado en login:", error);
      toast.error("Error inesperado: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const goToRegister = () => {
    // Preservar la redirección si existe
    if (redirectTo !== '/pantallaprincipal') {
      localStorage.setItem('redirectAfterLogin', redirectTo);
    }
    navigate("/register");
  };

  const goToRecuperacion = () => {
    // Preservar la redirección si existe
    if (redirectTo !== '/pantallaprincipal') {
      localStorage.setItem('redirectAfterLogin', redirectTo);
    }
    navigate("/recuperacion");
  };

  // Redirigir si ya está autenticado
  useEffect(() => {
    if (!loading && authCokie && user) {
      console.log('Usuario ya autenticado, redirigiendo a:', redirectTo);
      toast.success(`¡Bienvenido de vuelta, ${user.name}!`);
      
      // Limpiar redirección
      localStorage.removeItem('redirectAfterLogin');
      
      navigate(redirectTo, { replace: true });
    }
  }, [authCokie, user, loading, navigate, redirectTo]);

  // Mostrar loading mientras se verifica la autenticación inicial
  if (loading) {
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
      <div
        className="card shadow-sm"
        style={{
          maxWidth: "500px",
          width: "100%",
          backgroundColor: "#5a5a5a",
          color: "white",
        }}
      >
        <div className="card-body p-5">
          <div className="text-center mb-4">
            <h1
              className="display-6"
              style={{
                fontFamily: '"Playfair Display", serif',
                letterSpacing: "2px",
              }}
            >
              LUXUSFAHRTEN
            </h1>
          </div>

          <h4 className="text-center mb-4 fw-normal">Log in</h4>

          {/* Mostrar mensaje de redirección si viene de una compra */}
          {redirectTo !== '/pantallaprincipal' && (
            <div className="alert alert-info mb-4" role="alert">
              <small>
                <i className="bi bi-info-circle me-1"></i>
                Inicia sesión para continuar con tu proceso
              </small>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label small">
                Ingrese su correo
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
                disabled={isLoading}
                autoComplete="email"
              />
            </div>

            <div className="mb-2">
              <label htmlFor="password" className="form-label small">
                Ingrese su contraseña
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
                disabled={isLoading}
                autoComplete="current-password"
              />
            </div>

            <div className="d-flex justify-content-end mb-3">
              <span
                className="text-white text-decoration-none small"
                style={{ 
                  cursor: isLoading ? "not-allowed" : "pointer",
                  opacity: isLoading ? 0.6 : 1 
                }}
                onClick={isLoading ? undefined : goToRecuperacion}
              >
                Olvidaste contraseña?
              </span>
            </div>

            <button 
              type="submit" 
              className="btn btn-light w-100 mb-3"
              disabled={isLoading || !email || !password}
            >
              {isLoading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Iniciando sesión...
                </>
              ) : (
                "Iniciar sesión"
              )}
            </button>
          </form>

          <div className="text-center mt-3 small">
            <span>No tienes cuenta? </span>
            <span
              className="text-white text-decoration-none"
              style={{ 
                cursor: isLoading ? "not-allowed" : "pointer",
                opacity: isLoading ? 0.6 : 1 
              }}
              onClick={isLoading ? undefined : goToRegister}
            >
              Registrate
            </span>
          </div>

          {/* Botón de salir/cancelar */}
          <button
            className="btn btn-outline-light w-100 mt-3"
            onClick={() => {
              // Limpiar redirección si cancela el login
              localStorage.removeItem('redirectAfterLogin');
              // Si viene de una compra, volver al inicio, si no, quedarse en login
              navigate(redirectTo !== '/pantallaprincipal' ? '/' : '/login');
            }}
            disabled={isLoading}
          >
            {redirectTo !== '/pantallaprincipal' ? 'Cancelar' : 'Salir'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;