import React, { useState, useEffect } from 'react';
import '../components/Home.css'; 

//importo las cards de los autos , las respectivas imagenes y el carrusel 
import Card1 from '../components/card.jsx';
import Card2 from '../components/card2.jsx';
import Img2 from '../assets/16655773891850.jpg';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Carousel } from 'react-bootstrap';

const Home = () => {
  return (

    //Este es el contenedor, guarda el carrusel y las cards de los autos
    <div className="home-container">
      
      {/* Aqui esta el codigo del carousel utilizando bootstrap*/ }
      <div className="carousel-wrapper">
        <Carousel>
          <Carousel.Item>
            <img className="d-block w-100" src={Img2} alt="First slide" />
          </Carousel.Item>
          <Carousel.Item>
            <img className="d-block w-100" src={Img2} alt="Second slide" />
          </Carousel.Item>
          <Carousel.Item>
            <img className="d-block w-100" src={Img2} alt="Third slide" />
          </Carousel.Item>
        </Carousel>
      </div>

     {/* Este es el codigo donde se guarda las cards */ }
      <div className="car-cards-container">
        <Card1 />
        <Card1 />
        <Card1 />
        <Card2 />
        <Card2 />
        <Card2 />
      </div>

    </div>
  );
};

export default Home;
