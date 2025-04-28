import { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Login from './screens/Login'
import Register from './screens/Register'
import Recuperacion from './screens/Recuperacion'
import VerifyCode from './screens/RecuperacionCodigo'
import CambiarPassword from './screens/CambiarPassword'
import ProductDetail from './screens/Compra';
import FormularioCompra from './screens/CompraForm';
import ResumenCompra from './screens/CompraFinal';
import TermsAndConditions from './screens/TerminosCondiciones';
import ContactSection from './screens/Contactanos';
import Footer from './components/footer';




//Paginas Principales
import Home from './screens/Home';
import TiendaLujo from './screens/TiendaLujo';
import TiendaRestaurados from './screens/TiendaRestaurados'
import Nosotros from './screens/Nosotros'


<Route path="/" element={<Home />} />;
<Route path="/" element={<TiendaLujo />} />;


const Contacto = () => <div className="container mt-4"><h2>Contáctanos</h2></div>



function AppContent() {
  const location = useLocation();
  const [showNavbar, setShowNavbar] = useState(true);
  
  // Lista de rutas donde el navbar debe estar oculto
  const authRoutes = ['/login', '/register', '/recuperacion', '/recuperacioncodigo', '/cambiarpassword'];
  
  useEffect(() => {
    // Obtener la ruta actual sin barras finales y en minúsculas
    const currentPath = location.pathname.toLowerCase().replace(/\/$/, '');
    
    // Verificar si la ruta actual está en la lista de rutas de autenticación
    const shouldHideNavbar = authRoutes.some(route => 
      currentPath === route || currentPath.startsWith(route + '/')
    );
    
    setShowNavbar(!shouldHideNavbar);
  }, [location.pathname]);

  return (
    <>
      {showNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tienda" element={<TiendaLujo />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/restaurados" element={<TiendaRestaurados />} />
        <Route path="/nosotros" element={<Nosotros />} />
        
        {/* Rutas de autenticación */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/recuperacion" element={<Recuperacion />} />
        <Route path="/recuperacioncodigo" element={<VerifyCode />} />
        <Route path="/cambiarpassword" element={<CambiarPassword />} />
        <Route path="/Compra" element={<ProductDetail />} />
        <Route path="/CompraForm" element={<FormularioCompra />} />
        <Route path="/CompraFinal" element={<ResumenCompra />} />
        <Route path="/TerminosCondiciones" element={<TermsAndConditions />} />
        <Route path="/Contactanos" element={<ContactSection />} />
      </Routes>
      <Footer />
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