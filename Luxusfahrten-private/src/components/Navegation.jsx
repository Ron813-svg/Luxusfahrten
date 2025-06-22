import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";
import Login from "../screens/Login";
import RegisterForm from "../screens/PrimerUso";
import Recuperacion from "../screens/Recuperacion";
import VerifyCode from "../screens/RecuperacionCodigo";
import CambiarPassword from "../screens/CambiarPassword";
import Dashboard from "../screens/PantallaPrincipal";
import VehiculoRestaurado from "../screens/VehiculosRestaurados";
import RegisterRestaurado from "../components/VehiculosRestaurados/RegisterRestaurado";
import Vehiculos from "../screens/Vehiculos";
import RegisterVehiculo from "../components/Vehiculos/RegisterVehiculo";
import Empleados from "../screens/Empleados";
import RegisterEmpleado from "../components/Empleados/RegisterEmpleado";
import Marcas from "../screens/Marcas";
import Modelos from "../screens/Modelos";
import Pedidos from "../screens/Pedidos";
import PrivateRoute from "./PrivateRoute";
import { useAuth } from "../context/AuthContext";

function Navegation() {
  const location = useLocation();
  const [showNavbar, setShowNavbar] = useState(true);
  const authRoutes = [
    "/",
    "/login",
    "/register",
    "/recuperacion",
    "/recuperacioncodigo", 
    "/cambiarpassword",
  ];

  const { authCokie, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const currentPath = location.pathname.toLowerCase().replace(/\/$/, "");
    const shouldHideNavbar = authRoutes.some(
      (route) => currentPath === route || currentPath.startsWith(route + "/")
    );
    setShowNavbar(!shouldHideNavbar);
  }, [location.pathname]);

  useEffect(() => {
    if (loading) return; // Esperar a que termine de cargar

    const publicRoutes = [
      "/",
      "/login", 
      "/register",
      "/recuperacion",
      "/recuperacioncodigo",
      "/cambiarpassword",
    ];
    const currentPath = location.pathname.toLowerCase().replace(/\/$/, "");
    
    if (authCokie && publicRoutes.includes(currentPath)) {
      navigate("/pantallaprincipal");
    }
  }, [authCokie, navigate, location.pathname, loading]);

  // Mostrar loading mientras se verifica la autenticación
  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <>
      {showNavbar && authCokie && <Navbar />}
      <Routes>
        <Route 
          path="/" 
          element={authCokie ? <Navigate to="/pantallaprincipal" /> : <Login />} 
        />
        <Route 
          path="/login" 
          element={authCokie ? <Navigate to="/pantallaprincipal" /> : <Login />} 
        />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/recuperacion" element={<Recuperacion />} />
        <Route path="/recuperacioncodigo" element={<VerifyCode />} />
        <Route path="/cambiarpassword" element={<CambiarPassword />} />
        
        {/* Rutas privadas */}
        <Route element={<PrivateRoute />}>
          <Route path="/pantallaprincipal" element={<Dashboard />} />
          <Route path="/restaurados" element={<VehiculoRestaurado />} />
          <Route path="/registerrestaurado" element={<RegisterRestaurado />} />
          <Route path="/vehiculos" element={<Vehiculos />} />
          <Route path="/registervehiculo" element={<RegisterVehiculo />} />
          <Route path="/empleados" element={<Empleados />} />
          <Route path="/registerempleado" element={<RegisterEmpleado />} />
          <Route path="/marcas" element={<Marcas />} />
          <Route path="/modelos" element={<Modelos />} />
          <Route path="/pedidos" element={<Pedidos />} />
        </Route>
      </Routes>
    </>
  );
}

export default Navegation;