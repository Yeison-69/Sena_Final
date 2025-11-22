import React, { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function EditProfile() {
  const nav = useNavigate();
  const [form, setForm] = useState({
    nombre: "",
    descripcion: "",
    foto: ""
  });
  const [error, setError] = useState("");

  // cargar perfil actual
  const load = async () => {
    try {
      const res = await api.get("/users/me");
      setForm({
        nombre: res.data.nombre,
        descripcion: res.data.descripcion || "",
        foto: res.data.foto || ""
      });
    } catch (err) {
      console.error(err);
      setError("Error cargando datos.");
    }
  };

  const save = async (e) => {
    e.preventDefault();
    try {
      await api.put("/users/update", form);
      alert("Perfil actualizado correctamente");
      nav("/profile");
    } catch (err) {
      console.error(err);
      setError("No se pudo actualizar el perfil");
    }
  };

  useEffect(() => { load(); }, []);

  if (error) return <h2 style={{ color: "red" }}>{error}</h2>;

  return (
    <div style={{ textAlign: "center", marginTop: "30px" }}>
      <div style={{
        width: "350px",
        margin: "0 auto",
        padding: "25px",
        borderRadius: "10px",
        boxShadow: "0 0 10px rgba(0,0,0,0.1)"
      }}>
        <h2>Editar perfil</h2>

        <form onSubmit={save}>

          <label>Nombre</label>
          <input
            value={form.nombre}
            required
            onChange={(e) => setForm({ ...form, nombre: e.target.value })}
            style={{ width: "100%", padding: "10px", marginTop: "5px" }}
          />

          <label style={{ marginTop: "15px", display: "block" }}>Descripción</label>
          <textarea
            value={form.descripcion}
            onChange={(e) => setForm({ ...form, descripcion: e.target.value })}
            style={{ width: "100%", height: "80px", padding: "10px" }}
          />

          <label style={{ marginTop: "15px", display: "block" }}>Foto (URL)</label>
          <input
            value={form.foto}
            onChange={(e) => setForm({ ...form, foto: e.target.value })}
            style={{ width: "100%", padding: "10px" }}
          />

          <button
            type="submit"
            style={{
              marginTop: "20px",
              padding: "12px",
              width: "100%",
              background: "#6200EE",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer"
            }}
          >
            Guardar cambios
          </button>
        </form>
      </div>
    </div>
  );
}
