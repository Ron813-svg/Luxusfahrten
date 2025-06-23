import { useNavigate } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';
import useLoginUser from '../hooks/useLoginUser';

function RightCard({ specs, price, id }) {
  const navigate = useNavigate();
  const { isLoggedIn, loading, userInfo } = useLoginUser();

  if (loading) {
    return (
      <div className="right-card">
        <div className="text-center">
          <div className="spinner-border spinner-border-sm" role="status">
            <span className="visually-hidden">Verificando sesión...</span>
          </div>
          <p className="mt-2">Verificando sesión...</p>
        </div>
      </div>
    );
  }

  if (!specs) {
    return (
      <div className="right-card">
        <div className="text-center">
          <div className="spinner-border spinner-border-sm" role="status">
            <span className="visually-hidden">Cargando información...</span>
          </div>
          <p className="mt-2">Cargando información...</p>
        </div>
      </div>
    );
  }

  const goToCompra = () => {
    if (isLoggedIn && userInfo) {
      toast.success(`¡Hola ${userInfo.name}! Continuando con la compra...`);
      
      // Guardar información adicional para el proceso de compra
      localStorage.setItem('clienteId', userInfo._id);
      localStorage.setItem('userInfo', JSON.stringify(userInfo));
      
      navigate(`/Compra/${id}`);
    } else {
      toast.error('Debes iniciar sesión para continuar con la compra');
      // Guardar la ruta a la que quiere ir después del login
      localStorage.setItem('redirectAfterLogin', `/Compra/${id}`);
      navigate('/login');
    }
  };

  return (
    <div className="right-card">
      <Toaster position="top-center" />
      
      {/* Mostrar información del usuario si está logueado */}
      {isLoggedIn && userInfo && (
        <div className="alert alert-success mb-3" style={{ fontSize: '0.85rem', padding: '0.5rem' }}>
          <strong>✓ Sesión activa:</strong> {userInfo.name} {userInfo.lastName}
          <br />
          <small className="text-muted">{userInfo.email}</small>
        </div>
      )}
      
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
      <button 
        className="price-button" 
        onClick={goToCompra}
        disabled={loading}
        style={{
          opacity: loading ? 0.7 : 1,
          cursor: loading ? 'not-allowed' : 'pointer'
        }}
      >
        {price ? `$${price}` : 'Consultar'}
      </button>
      
      {!isLoggedIn && (
        <div className="mt-2">
          <small className="text-warning">
            <i className="bi bi-info-circle me-1"></i>
            Inicia sesión para continuar con la compra
          </small>
        </div>
      )}
      
      <br />
      <div className="legal-info">{specs.legal}</div>
    </div>
  );
}

export default RightCard;