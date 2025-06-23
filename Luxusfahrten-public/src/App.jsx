import { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Login from './pages/Login'
import Register from './pages/Register'
import Recuperacion from './pages/Recuperacion'
import VerifyCode from './pages/RecuperacionCodigo'
import CambiarPassword from './pages/CambiarPassword'
import ProductDetail from './pages/Compra';
import FormularioCompra from './pages/CompraForm';
import ResumenCompra from './pages/CompraFinal';
import TermsAndConditions from './pages/TerminosCondiciones';
import ContactSection from './pages/Contactanos';
import Footer from './components/footer';
import InfoCard from './pages/Informacion';
import InfoCardRestaurado from './pages/Informacion2';
import VerifyCodePage from './pages/VerifyCode';



//Paginas Principales
import Home from './pages/Home';
import TiendaLujo from './pages/TiendaLujo';
import TiendaRestaurados from './pages/TiendaRestaurados'
import Nosotros from './pages/Nosotros'


<Route path="/" element={<Home />} />;
<Route path="/" element={<TiendaLujo />} />;





function AppContent() {
  const location = useLocation();
  const [showNavbar, setShowNavbar] = useState(true);
  const [showFooter, setShowFooter] = useState(true);
  // Lista de rutas donde el navbar debe estar oculto
  const authRoutes = ['/login', '/register', '/recuperacion', '/recuperacioncodigo', '/cambiarpassword', '/verificar-codigo'];

  useEffect(() => {
    // Obtener la ruta actual sin barras finales y en minúsculas
    const currentPath = location.pathname.toLowerCase().replace(/\/$/, '');
    
    // Verificar si la ruta actual está en la lista de rutas de autenticación
    const shouldHideNavbar = authRoutes.some(route => 
      currentPath === route || currentPath.startsWith(route + '/')
    );

    const shouldHideFooter = authRoutes.some(route => 
      currentPath === route || currentPath.startsWith(route + '/')
    );
    
    setShowNavbar(!shouldHideNavbar);
    setShowFooter(!shouldHideFooter);
  }, [location.pathname]);

  return (
    <>
      {showNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tienda" element={<TiendaLujo />} />
        <Route path="/contacto" element={<ContactSection />} />
        <Route path="/restaurados" element={<TiendaRestaurados />} />
        <Route path="/nosotros" element={<Nosotros />} />
        
        {/* Rutas de autenticación */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/recuperacion" element={<Recuperacion />} />
        <Route path="/recuperacioncodigo" element={<VerifyCode />} />
        <Route path="/cambiarpassword" element={<CambiarPassword />} />
        <Route path="/Compra/:id" element={<ProductDetail />} />
        <Route path="/CompraForm" element={<FormularioCompra />} />
        <Route path="/CompraFinal" element={<ResumenCompra />} />
        <Route path="/TerminosCondiciones" element={<TermsAndConditions />} />
        <Route path="/Contactanos" element={<ContactSection />} />
        <Route path="/Informacion/:id" element={<InfoCard />} />
        <Route path="/InformacionRestaurado/:id" element={<InfoCardRestaurado />} />
        <Route path="/verificar-codigo" element={<VerifyCodePage />} />
      </Routes>
      {showFooter && <Footer />}
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