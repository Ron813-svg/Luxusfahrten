import { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar';
import Login from './screens/Login'
import RegisterForm from './screens/PrimerUso';
import Recuperacion from './screens/Recuperacion'
import VerifyCode from './screens/RecuperacionCodigo'
import CambiarPassword from './screens/CambiarPassword'
import Dashboard from './screens/PantallaPrincipal';
import VehiculoRestaurado from './screens/VehiculosRestaurados';
import RegisterRestaurado from './components/VehiculosRestaurados/RegisterRestaurado';
import Vehiculos from './screens/Vehiculos';
import RegisterVehiculo from './components/Vehiculos/RegisterVehiculo'
import Empleados from './screens/Empleados';
import RegisterEmpleado from './components/Empleados/RegisterEmpleado';
import Marcas from './screens/Marcas';
import Modelos from './screens/Modelos';
import Pedidos from './screens/Pedidos';

function AppContent() {
  const location = useLocation();
  const [showNavbar, setShowNavbar] = useState(false);
  const [showFooter, setShowFooter] = useState(false);
  
  // Lista de rutas donde el navbar debe estar oculto
  const authRoutes = [
    '/', 
    '/login', 
    '/register', 
    '/recuperacion', 
    '/recuperacioncodigo', 
    '/cambiarpassword',
  ];
  
  useEffect(() => {
    // Manejo especial para la ruta raíz '/'
    if (location.pathname === '/') {
      setShowNavbar(false);
      setShowFooter(false);
      console.log("Ruta principal: '/', Navbar oculto");
      return;
    }
    
    // Para otras rutas, obtener la ruta sin barras finales y en minúsculas
    const currentPath = location.pathname.toLowerCase().replace(/\/$/, '');
    
    // Verificar si la ruta actual está en la lista de rutas de autenticación
    const shouldHideNavbar = authRoutes.some(route => 
      currentPath === route || currentPath.startsWith(route + '/')
    );
    
    // Mostrar navbar solo si NO estamos en una ruta de autenticación
    setShowNavbar(!shouldHideNavbar);
    setShowFooter(!shouldHideNavbar);
    
    // Para depuración
    console.log("Ruta actual:", currentPath);
    console.log("Ocultar navbar:", shouldHideNavbar);
    console.log("Navbar visible:", !shouldHideNavbar);
  }, [location.pathname]);

  return (
    <>
      {showNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Login />} />
        
        {/* Rutas de autenticación */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/recuperacion" element={<Recuperacion />} />
        <Route path="/recuperacioncodigo" element={<VerifyCode />} />
        <Route path="/cambiarpassword" element={<CambiarPassword />} />
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
      </Routes>
    </>
  )
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  )
}

export default App