import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="text-white" style={{ backgroundColor: 'rgb(90, 90, 90)' }}>
            <div className="container-fluid px-4 py-2 d-flex justify-content-between align-items-center">
                <div className="d-flex">
                    <Link to="/tienda" className="nav-link px-3">
                        Tienda de Lujo
                    </Link>
                    <Link to="/contacto" className="nav-link px-3">
                        Contáctanos
                    </Link>
                </div>
                
                <div className="text-center">
                    <Link to="/" className="navbar-brand">
                        <h1 style={{ fontFamily: '"Playfair Display", serif', letterSpacing: '1px', fontSize: '1.75rem', margin: 0 }}>
                            LUXUSFAHRTEN
                        </h1>
                    </Link>
                </div>
                
                <div className="d-flex align-items-center">
                    <Link to="/restaurados" className="nav-link px-3">
                        Tienda Restaurados
                    </Link>
                    <Link to="/nosotros" className="nav-link px-3">
                        Sobre nosotros
                    </Link>
                    <Link to="/login" className="ms-3">
                        <button className="btn btn-outline-light rounded-circle p-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-person" viewBox="0 0 16 16">
                                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
                            </svg>
                        </button>
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;