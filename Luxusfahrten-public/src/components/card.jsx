import "./card.css";
import { useNavigate } from "react-router-dom";

function CarCardGeneral({ auto }) {
  const navigate = useNavigate();

  if (!auto) return null;

  return (
    <div className="luxury-card" key={auto.id}>
      <div className="luxury-header">
        <h2>
          {auto.idBrand?.brandName} {auto.idModel?.nameModel}
        </h2>
      </div>

      <img
        src={auto.image}
        alt={`${auto.idBrand?.brandName} ${auto.idModel?.nameModel}`}
        className="luxury-image"
      />

      <div className="luxury-features">
        <ul>
          <li>⚙️ Motor: {auto.specs?.motor}</li>
          <li>⚡ Potencia: {auto.specs?.potencia}</li>
          <li>🚀 Aceleración: {auto.specs?.aceleracion}</li>
          <li>🛞 Velocidad Máxima: {auto.specs?.velocidadMaxima}</li>
        </ul>
      </div>

      <button
        className="luxury-info-button"
        onClick={() => navigate(`/Informacion/${auto._id}`)}
      >
        Más Información
      </button>

      <div className="luxury-legal-info">{auto.legal}</div>
    </div>
  );
}

export default CarCardGeneral;
