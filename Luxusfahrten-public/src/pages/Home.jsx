import React from 'react';
import '../components/Home.css'; 
import Card1 from '../components/card.jsx';
import Card2 from '../components/card2.jsx';
import Img2 from '../assets/16655773891850.jpg';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Carousel } from 'react-bootstrap';
import { useLuxuryVehicles } from '../hooks/useLuxuryVehicles';
import { useRestoredVehicles } from '../hooks/useRestoredVehicles';

const Home = () => {
  const { luxuryCars, loading: loadingLuxury } = useLuxuryVehicles();
  const { restoredCars, loading: loadingRestored } = useRestoredVehicles();

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
        {/* Autos de lujo */}
        {loadingLuxury ? (
          <div>Cargando autos...</div>
        ) : (
          luxuryCars.map(auto => <Card1 key={auto.id} auto={auto} />)
        )}

        {/* Autos restaurados */}
        {loadingRestored ? (
          <div>Cargando autos restaurados...</div>
        ) : (
          restoredCars.map(auto => <Card2 key={auto.id} auto={auto} />)
        )}
      </div>

    </div>
  );
};

export default Home;
