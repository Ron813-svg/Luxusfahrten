import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";

const Navbar = () => {
    const [isNavCollapsed, setIsNavCollapsed] = useState(true);

    const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

    return (
        <nav className="text-white" style={{ backgroundColor: 'rgb(90, 90, 90)' }}>
            <div className="container-fluid px-4 py-2">
                <div className="d-flex justify-content-between align-items-center w-100">
                    {/* Botón hamburguesa visible solo en dispositivos pequeños */}
                    <div className="d-flex align-items-center">
                        <button 
                            className="navbar-toggler d-lg-none border-0 me-2" 
                            type="button" 
                            onClick={handleNavCollapse}
                            aria-expanded={!isNavCollapsed ? true : false}
                            aria-label="Toggle navigation"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="white" className="bi bi-list" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
                            </svg>
                        </button>
                        
                        {/* Links izquierdos - ocultos en móvil */}
                        <div className="d-none d-lg-flex">
                            <Link to="/vehiculos" className="nav-link px-3">
                                Vehiculos
                            </Link>
                            <Link to="/pedidos" className="nav-link px-3">
                                Pedidos
                            </Link>
                            <Link to="/empleados" className="nav-link px-3">
                                Empleados
                            </Link>
                        </div>
                    </div>
                    
                    {/* Logo siempre visible */}
                    <div className="text-center">
                        <Link to="/PantallaPrincipal/" className="navbar-brand">
                            <h1 style={{ fontFamily: '"Playfair Display", serif', letterSpacing: '1px', fontSize: '1.75rem', margin: 0 }}>
                                LUXUSFAHRTEN
                            </h1>
                        </Link>
                    </div>
                    
                    <div className="d-flex align-items-center">
                        {/* Links derechos - ocultos en móvil */}
                        <div className="d-none d-lg-flex align-items-center">
                            <Link to="/restaurados" className="nav-link px-3">
                                Vehiculos Restaurados
                            </Link>
                            <Link to="/marcas" className="nav-link px-3">
                                Marcas
                            </Link>
                            <Link to="/modelos" className="nav-link px-3">
                                Modelos
                            </Link>
                        </div>
                        
                        {/* Botón de login siempre visible */}
                        <Link to="/login" className="ms-lg-3">
                            <button className="btn btn-outline-light rounded-circle p-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-person" viewBox="0 0 16 16">
                                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
                                </svg>
                            </button>
                        </Link>
                    </div>
                </div>
                
                {/* Menú colapsable para móvil */}
                <div className={`${isNavCollapsed ? 'd-none' : 'd-block'} d-lg-none mt-2`}>
                    <div className="py-2">
                        <Link to="/tienda" className="nav-link px-3 py-2 d-block">
                            Tienda de Lujo
                        </Link>
                        <Link to="/contacto" className="nav-link px-3 py-2 d-block">
                            Contáctanos
                        </Link>
                        <Link to="/restaurados" className="nav-link px-3 py-2 d-block">
                            Tienda Restaurados
                        </Link>
                        <Link to="/nosotros" className="nav-link px-3 py-2 d-block">
                            Sobre nosotros
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;