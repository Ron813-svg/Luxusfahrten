import "./card2.css";
import { useNavigate } from "react-router-dom";

function RestoredCarCard({ auto }) {
  const navigate = useNavigate();

  if (!auto) return null;

  return (
    <div className="restored-card" key={auto.id}>
      <div className="restored-header">
        <h2>
          {auto.idBrand?.brandName} {auto.idModel?.nameModel}
        </h2>
      </div>

      <img
        src={auto.image}
        alt={`${auto.idBrand?.brandName} ${auto.idModel?.nameModel}`}
        className="restored-image"
      />

      <div className="restored-features">
        <ul>
          <li>⚙️ Motor: {auto.specs?.motor}</li>
          <li>⚡ Potencia: {auto.specs?.potencia}</li>
          <li>🚀 Aceleración: {auto.specs?.aceleracion}</li>
          <li>🛞 Velocidad Máxima: {auto.specs?.velocidadMaxima}</li>
        </ul>
      </div>

      <button
        className="restored-more-info-button"
        onClick={() => navigate(`/InformacionRestaurado/${auto._id}`)}
      >
        Más Información
      </button>

      <div className="restored-legal-notice">{auto.legal}</div>
    </div>
  );
}

export default RestoredCarCard;
