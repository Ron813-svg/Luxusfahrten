import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Toaster, toast } from 'react-hot-toast';
import ListEmpleados from '../components/Empleados/ListEmpleados';
import RegisterEmpleado from '../components/Empleados/RegisterEmpleado';

const Empleados = () => {
  useEffect(() => {
    document.title = "Empleados";
  }, []);

  // Estados principales
  const [activeTab, setActiveTab] = useState("list");
  const [loading, setLoading] = useState(false);
  const [empleados, setEmpleados] = useState([
    {
      id: 1,
      name: "Juan Pérez",
      actualDate: "2024-01-15",
      birthday: "1990-05-15",
      address: "Calle Principal 123, San Salvador",
      email: "juan.perez@empresa.com",
      telephone: "7890-1234",
      employeeType: "Vendedor",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face"
    },
    {
      id: 2,
      name: "María García",
      actualDate: "2023-08-20",
      birthday: "1985-11-22",
      address: "Colonia Escalón, San Salvador",
      email: "maria.garcia@empresa.com",
      telephone: "7890-5678",
      employeeType: "Gerente",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face"
    },
    {
      id: 3,
      name: "Carlos López",
      actualDate: "2024-03-10",
      birthday: "1992-07-08",
      address: "Santa Tecla, La Libertad",
      email: "carlos.lopez@empresa.com",
      telephone: "7890-9012",
      employeeType: "Mecánico",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face"
    }
  ]);

  // Estados del formulario
  const [formData, setFormData] = useState({
    id: null,
    name: "",
    actualDate: "",
    birthday: "",
    address: "",
    email: "",
    password: "",
    telephone: "",
    employeeType: "Vendedor",
    image: ""
  });

  // Función para limpiar datos del formulario
  const cleanData = () => {
    setFormData({
      id: null,
      name: "",
      actualDate: "",
      birthday: "",
      address: "",
      email: "",
      password: "",
      telephone: "",
      employeeType: "Vendedor",
      image: ""
    });
  };

  // Función para agregar nuevo empleado
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Validación básica
    if (!formData.name || !formData.email || !formData.telephone) {
      toast.error("Por favor, completa los campos obligatorios");
      setLoading(false);
      return;
    }

    // Crear nuevo empleado
    const nuevoEmpleado = {
      ...formData,
      id: Math.max(...empleados.map(emp => emp.id)) + 1,
      actualDate: formData.actualDate || new Date().toISOString().split('T')[0],
      // Si no hay imagen, usar placeholder por defecto
      image: formData.image || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face"
    };

    // Simular delay de API
    setTimeout(() => {
      setEmpleados([...empleados, nuevoEmpleado]);
      toast.success("Empleado agregado exitosamente");
      cleanData();
      setActiveTab("list");
      setLoading(false);
    }, 1000);
  };

  // Función para actualizar empleado
  const handleUpdate = (e) => {
    e.preventDefault();
    setLoading(true);

    // Validación básica
    if (!formData.name || !formData.email || !formData.telephone) {
      toast.error("Por favor, completa los campos obligatorios");
      setLoading(false);
      return;
    }

    // Simular delay de API
    setTimeout(() => {
      setEmpleados(empleados.map(emp => 
        emp.id === formData.id ? { ...formData } : emp
      ));
      toast.success("Empleado actualizado exitosamente");
      cleanData();
      setActiveTab("list");
      setLoading(false);
    }, 1000);
  };

  // Función para cargar datos del empleado en el formulario
  const handleUpdateEmpleado = (empleado) => {
    setFormData(empleado);
    setActiveTab("form");
  };

  // Función para eliminar empleado
  const deleteEmpleado = (id) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar este empleado?")) {
      setEmpleados(empleados.filter(emp => emp.id !== id));
      toast.success("Empleado eliminado exitosamente");
    }
  };

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
              empleados={empleados}
              onUpdateEmpleado={handleUpdateEmpleado}
              onDeleteEmpleado={deleteEmpleado}
              loading={loading}
              setActiveTab={setActiveTab}
              cleanData={cleanData}
            />
          </div>
        )}
        
        {activeTab === "form" && (
          <RegisterEmpleado
            formData={formData}
            setFormData={setFormData}
            handleSubmit={formData.id ? handleUpdate : handleSubmit}
            cleanData={cleanData}
            setActiveTab={setActiveTab}
            loading={loading}
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

export default Empleados;