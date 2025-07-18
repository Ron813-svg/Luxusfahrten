import './info.css';
import LeftCard from './cardInfo1';
import RightCard from './cardInfo2';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

function Info() {
  const { id } = useParams();
  const [auto, setAuto] = useState(null);

  useEffect(() => {
    // Guardar el id en una cookie
    document.cookie = `vehicleId=${id}; path=/;`;

    fetch(`http://localhost:4000/api/vehicles/${id}`)
      .then(res => res.json())
      .then(data => setAuto(data))
      .catch(() => setAuto(null));
  }, [id]);

  if (!auto) return <div className="porsche-detail">Cargando información...</div>;

  return (
    <div className="porsche-detail">
      <h1>{auto.specs?.marca} {auto.specs?.modelo}</h1>
      <div className="card-container">
        <LeftCard specs={auto.specs} image={auto.image} />
        <RightCard specs={auto.specs} price={auto.price} id={auto._id} />
      </div>
    </div>
  );
}

export default Info;
