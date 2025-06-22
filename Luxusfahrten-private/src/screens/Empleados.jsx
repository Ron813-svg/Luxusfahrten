import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Toaster } from 'react-hot-toast';
import useDataModerator from '../components/Empleados/hooks/useDataEmpleado';
import ListEmpleados from '../components/Empleados/ListEmpleados';
import RegisterEmpleado from '../components/Empleados/RegisterEmpleado';

const Empleados = () => {
  useEffect(() => {
    document.title = "Empleados";
  }, []);

  const {
    activeTab,
    setActiveTab,
    id,
    setId,
    name,
    setName,
    actualDate,
    setActualDate,
    birthday,
    setBirthday,
    address,
    setAddress,
    email,
    setEmail,
    password,
    setPassword,
    telephone,
    setTelephone,
    employeeType,
    setEmployeeType,
    image,
    setImage,
    errorModerator,
    setError,
    success,
    setSuccess,
    loading,
    setLoading,
    moderators,
    setModerators,
    cleanData,
    handleSubmit,
    fetchData,
    deleteModerator,
    updateModerator,
    handleUpdate,
    handleUpdateEmpleado,
  } = useDataModerator();

  return (
    <div
      className="min-vh-100 d-flex align-items-center justify-content-center"
      style={{
        background: "#9E9E9E",
        padding: "40px 0",
      }}
    >
      <div
        className="w-100"
        style={{
          maxWidth: "900px",
        }}
      >
        {activeTab === "list" && (
          <div
            className="shadow-lg"
            style={{
              background: "#5a5a5a",
              border: "none",
              borderRadius: "1.5rem",
              boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
              color: "#fff",
              padding: "2rem",
            }}
          >
            <h1
              className="fw-bold mb-4 text-center"
              style={{
                color: "#fff",
                letterSpacing: "2px",
              }}
            >
              Empleados
            </h1>
            <div className="d-flex border-bottom mb-4" style={{ borderColor: "#00fff7" }}>
            </div>
            <ListEmpleados
              empleados={moderators}
              onUpdateEmpleado={handleUpdateEmpleado}
              onDeleteEmpleado={deleteModerator}
              loading={loading}
              setActiveTab={setActiveTab}
              cleanData={cleanData}
            />
          </div>
        )}
        
        {activeTab === "form" && (
          <RegisterEmpleado
            id={id}
            name={name}
            setName={setName}
            actualDate={actualDate}
            setActualDate={setActualDate}
            birthday={birthday}
            setBirthday={setBirthday}
            address={address}
            setAddress={setAddress}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            telephone={telephone}
            setTelephone={setTelephone}
            employeeType={employeeType}
            setEmployeeType={setEmployeeType}
            image={image}
            setImage={setImage}
            handleSubmit={id ? handleUpdate : handleSubmit}
            handleUpdate={handleUpdate}
            cleanData={cleanData}
            setActiveTab={setActiveTab}
          />
        )}
      </div>
      <Toaster
        toastOptions={{
          duration: 1000,
        }}
      />
    </div>
  );
};

export default Empleados;