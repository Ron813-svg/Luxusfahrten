import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Toaster } from 'react-hot-toast';
import useDataPedido from '../components/Pedidos/hooks/useDataPedido';
import ListPedido from '../components/Pedidos/ListPedido';
import RegisterPedido from '../components/Pedidos/RegisterPedido';

const Pedidos = () => {
  useEffect(() => {
    document.title = "Pedidos";
  }, []);

  const {
    activeTab,
    setActiveTab,
    id,
    idVehiculo,
    setIdVehiculo,
    idCliente,
    setIdCliente,
    paymentMethod,
    setPaymentMethod,
    orderStatus,
    setOrderStatus,
    orderDate,
    setOrderDate,
    totalPrice,
    setTotalPrice,
    error,
    success,
    loading,
    orders,
    vehicles,
    clients,
    cleanData,
    handleSubmit,
    deleteOrder,
    handleUpdate,
    handleUpdateOrder,
  } = useDataPedido();

  return (
    <div style={{ backgroundColor: '#9E9E9E', minHeight: '100vh' }}>
      <div className="container py-5">
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
        
        {activeTab === "form" && (
          <RegisterPedido
            id={id}
            idVehiculo={idVehiculo}
            setIdVehiculo={setIdVehiculo}
            idCliente={idCliente}
            setIdCliente={setIdCliente}
            paymentMethod={paymentMethod}
            setPaymentMethod={setPaymentMethod}
            orderStatus={orderStatus}
            setOrderStatus={setOrderStatus}
            orderDate={orderDate}
            setOrderDate={setOrderDate}
            totalPrice={totalPrice}
            setTotalPrice={setTotalPrice}
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
      <Toaster
        toastOptions={{
          duration: 3000,
        }}
      />
    </div>
  );
};

export default Pedidos;