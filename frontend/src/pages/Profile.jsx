// frontend/src/pages/Profile.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Función para cargar el perfil del usuario
  const loadProfile = async () => {
    try {
      const res = await api.get("/users/me");
      setUser(res.data);
    } catch (err) {
      console.error("Error cargando perfil:", err);
      setError("No se pudo cargar el perfil");
    }
  };

  // Llamada al cargar el componente
  useEffect(() => {
    loadProfile();
  }, []);

  // Función para cerrar sesión
  const handleLogout = () => {
    // Limpiar almacenamiento local (token y usuario)
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // Redirigir al login
    navigate("/login");
  };

  if (error) return <h2 style={{ color: "red" }}>{error}</h2>;
  if (!user) return <h2>Cargando perfil...</h2>;

  return (
    <div style={{ textAlign: "center", marginTop: "30px" }}>
      <div
        style={{
          width: "350px",
          margin: "0 auto",
          padding: "25px",
          borderRadius: "10px",
          boxShadow: "0 0 10px rgba(0,0,0,0.1)",
        }}
      >
        <img
          src={user.foto || "https://i.imgur.com/EsK14ZB.png"}
          alt="Foto perfil"
          style={{
            width: "110px",
            height: "110px",
            borderRadius: "50%",
            objectFit: "cover",
            marginBottom: "15px",
          }}
        />

        <h2>{user.nombre}</h2>
        <p style={{ opacity: 0.7 }}>{user.email}</p>
        <p style={{ marginTop: 10 }}>{user.descripcion || "Sin descripción"}</p>

        {/* Botón para editar el perfil */}
        <button
          onClick={() => (window.location.href = "/edit-profile")}
          style={{
            marginTop: "20px",
            padding: "12px",
            background: "#6200EE",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            width: "100%",
          }}
        >
          Editar perfil
        </button>

        {/* Botón de cierre de sesión */}
        <button
          onClick={handleLogout}
          style={{
            marginTop: "20px",
            padding: "12px",
            background: "#FF6347",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            width: "100%",
          }}
        >
          Cerrar sesión
        </button>
      </div>
    </div>
  );
}
