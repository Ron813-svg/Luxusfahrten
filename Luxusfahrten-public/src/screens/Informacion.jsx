//Esta es de informacion del auto
import React, { useState, useEffect } from 'react';
import '../components/Home.css'; 

//Mando a llamar el componente donde se encuentra la informacion del auto
import Info from '../components/info'

const InfoCard = () => {


  return (
    <div >
   <Info/>
    </div>
  );
};

export default InfoCard;