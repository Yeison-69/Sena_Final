import React, { useState } from "react";
import api from "../api/axios";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const nav = useNavigate();
  const [form, setForm] = useState({ nombre: "", email: "", password: "" });
  const [error, setError] = useState("");

  const reg = async (e) => {
    e.preventDefault(); // 🔥 evita que el form se recargue

    try {
      const res = await api.post("/auth/register", form);

      alert("Usuario registrado correctamente");
      nav("/login");

    } catch (err) {
      console.error(err);

      // 🔥 Mostrar error del servidor
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Error al registrarse");
      }
    }
  };

  return (
    <div className="container" style={{ textAlign: "center", marginTop: "50px" }}>
      <div className="card" style={{
        width: "350px",
        margin: "0 auto",
        padding: "25px",
        borderRadius: "10px",
        boxShadow: "0 0 10px rgba(0,0,0,0.1)"
      }}>
        <h2>Crear cuenta</h2>

        {error && (
          <p style={{ color: "red", fontWeight: "bold" }}>{error}</p>
        )}

        <form onSubmit={reg}>

          <input
            placeholder="Nombre"
            required
            onChange={(e) => setForm({ ...form, nombre: e.target.value })}
            style={{ width: "100%", padding: "10px", margin: "10px 0" }}
          />

          <input
            placeholder="Email"
            type="email"
            required
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            style={{ width: "100%", padding: "10px", margin: "10px 0" }}
          />

          <input
            placeholder="Contraseña"
            type="password"
            required
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            style={{ width: "100%", padding: "10px", margin: "10px 0" }}
          />

          <button 
            type="submit"
            style={{
              width: "100%",
              padding: "12px",
              marginTop: "10px",
              background: "#6200EE",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "16px"
            }}
          >
            Registrarse
          </button>
        </form>

        <p style={{ marginTop: 15 }}>
          <Link to="/login">Iniciar sesión</Link>
        </p>
      </div>
    </div>
  );
}
