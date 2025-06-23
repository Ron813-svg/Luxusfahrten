import { useNavigate } from 'react-router-dom';

function RightCard({ specs, price, id }) {
  const navigate = useNavigate();

  if (!specs) return <div className="right-card">Cargando información...</div>;

  const goToCompra = () => {
    navigate(`/Compra/${id}`);
  };

  return (
    <div className="right-card">
      <div className="info-columns">
        <div>
          <h3>Historia</h3>
          <p>{specs.historia}</p>
        </div>
        <div>
          <h3>Rendimiento</h3>
          <p>{specs.rendimiento}</p>
        </div>
      </div>

      <hr />

      <h2 className="price-label">Precio desde:</h2>
      <button className="price-button" onClick={goToCompra}>
        {price ? `$${price}` : 'Consultar'}
      </button>
      < br />
      <div className="legal-info">{specs.legal}</div>
    </div>
  );
}

export default RightCard;
