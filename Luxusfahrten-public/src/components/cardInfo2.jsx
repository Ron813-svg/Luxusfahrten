import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';

function useAuthCheck() {
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  useEffect(() => {
    fetch('http://localhost:4000/api/login/isLoggedIn', {
      credentials: 'include'
    })
      .then(res => res.ok ? setIsLoggedIn(true) : setIsLoggedIn(false))
      .catch(() => setIsLoggedIn(false));
  }, []);

  return isLoggedIn;
}

function RightCard({ specs, price, id }) {
  const navigate = useNavigate();
  const isLoggedIn = useAuthCheck();

  if (isLoggedIn === null) return <div>Cargando...</div>;

  if (!specs) return <div className="right-card">Cargando información...</div>;

  const goToCompra = () => {
    if (isLoggedIn) {
      toast.success('Estás logueado, puedes continuar con la compra');
      navigate(`/Compra/${id}`);
    } else {
      toast.error('Debes iniciar sesión para continuar con la compra');
      navigate('/Login', { state: { redirectTo: `/Compra/${id}` } });
    }
  };

  return (
    <div className="right-card">
      <Toaster position="top-center" />
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
      <br />
      <div className="legal-info">{specs.legal}</div>
    </div>
  );
}

export default RightCard;
