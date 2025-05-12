import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import CardMarcas from '../components/Administracion/Marcas.jsx';

const Marcas = () => {

    const navigate = useNavigate();



    return (
        <CardMarcas />
)
}

export default Marcas;

