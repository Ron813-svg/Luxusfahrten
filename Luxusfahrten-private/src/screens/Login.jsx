import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import "bootstrap/dist/css/bootstrap.min.css";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { Login: loginWithContext, authCokie } = useAuth();

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
        toast.success("Inicio de sesión exitoso");
        // No necesitamos navigate aquí, el useEffect se encargará
      } else {
        toast.error("Error al iniciar sesión: " + result.message);
      }
    } catch (error) {
      toast.error("Error inesperado: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const goToRegister = () => {
    navigate("/register");
  };

  const goToRecuperacion = () => {
    navigate("/recuperacion");
  };

  // Redirigir si ya está autenticado
  useEffect(() => {
    if (authCokie) {
      navigate("/pantallaprincipal");
    }
  }, [authCokie, navigate]);

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
              />
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
              disabled={isLoading}
            >
              {isLoading ? "Iniciando sesión..." : "Iniciar sesión"}
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
        </div>
      </div>
    </div>
  );
};

export default Login;