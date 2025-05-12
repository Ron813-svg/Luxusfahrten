import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import CardMarcas from '../components/Administracion/Marcas.jsx';

const Marcas = () => {

    //Esta seria la parte de la navegacion, aqui aparecera el contenido de las cards la parte para la administracion de las marcas
    //En este caso es para la parte de marcas
    const navigate = useNavigate();



    return (
        <CardMarcas />
)
}

export default Marcas;

