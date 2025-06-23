import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Toaster } from 'react-hot-toast';
import useDataPedido from '../components/Pedidos/hooks/useDataPedido';
import ListPedido from '../components/Pedidos/ListPedido';
import RegisterPedido from '../components/Pedidos/RegisterPedido';

const Pedidos = () => {
  useEffect(() => {
    document.title = "Gestión de Pedidos - Luxusfahrten";
  }, []);

  const {
    // Estados de la UI
    activeTab,
    setActiveTab,
    loading,
    error,
    success,
    
    // Estados del formulario simplificado
    id,
    idVehiculo,
    setIdVehiculo,
    idCliente,
    setIdCliente,
    metodoPago,
    setMetodoPago,
    terminosYSeguro,
    setTerminosYSeguro,
    precioTotal,
    setPrecioTotal,
    status,
    setStatus,
    
    // Datos
    orders,
    vehicles,
    clients,
    
    // Funciones
    cleanData,
    handleSubmit,
    deleteOrder,
    handleUpdate,
    handleUpdateOrder,
  } = useDataPedido();

  return (
    <div style={{ backgroundColor: '#9E9E9E', minHeight: '100vh' }}>
      <div className="container py-5">
        {/* Vista de lista de pedidos */}
        {activeTab === "list" && (
          <div
            className="card"
            style={{
              backgroundColor: '#5a5a5a',
              border: 'none',
              borderRadius: '10px',
              padding: '20px',
              marginBottom: '20px',
            }}
          >
            <ListPedido
              pedidos={orders}
              onUpdatePedido={handleUpdateOrder}
              onDeletePedido={deleteOrder}
              loading={loading}
              setActiveTab={setActiveTab}
              cleanData={cleanData}
            />
          </div>
        )}
        
        {/* Vista de formulario de pedidos */}
        {activeTab === "form" && (
          <RegisterPedido
            id={id}
            idVehiculo={idVehiculo}
            setIdVehiculo={setIdVehiculo}
            idCliente={idCliente}
            setIdCliente={setIdCliente}
            metodoPago={metodoPago}
            setMetodoPago={setMetodoPago}
            terminosYSeguro={terminosYSeguro}
            setTerminosYSeguro={setTerminosYSeguro}
            precioTotal={precioTotal}
            setPrecioTotal={setPrecioTotal}
            status={status}
            setStatus={setStatus}
            vehicles={vehicles}
            clients={clients}
            handleSubmit={id ? handleUpdate : handleSubmit}
            cleanData={cleanData}
            setActiveTab={setActiveTab}
            loading={loading}
            error={error}
            success={success}
          />
        )}
      </div>
      
      {/* Notificaciones toast */}
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            iconTheme: {
              primary: '#4ade80',
              secondary: '#fff',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />
    </div>
  );
};

export default Pedidos;