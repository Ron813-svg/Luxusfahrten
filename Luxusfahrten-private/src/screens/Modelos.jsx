import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import CardModelos from '../components/Administracion/Modelos.jsx';

const Modelos = () => {
     //Esta seria la parte de la navegacion, aqui aparecera el contenido de las cards la parte para la administracion de las marcas
    //En este caso es para la parte de modelos
    return (
        <CardModelos />
    )
}

export default Modelos;