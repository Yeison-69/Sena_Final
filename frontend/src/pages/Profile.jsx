import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../config/api";
import { Link } from "react-router-dom";

export default function Profile() {
  const token = localStorage.getItem("token");
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!token) return;
    axios.get(`${API_URL}/user/me`, { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setUser(res.data))
      .catch(()=> {});
  }, []);

  if (!token) return <div style={{ padding: 20 }}>Debes <Link to="/login">iniciar sesión</Link></div>;
  if (!user) return <div style={{ padding: 20 }}>Cargando perfil...</div>;

  return (
    <div style={{ padding: 20, maxWidth: 720, margin: "30px auto", color: "#111" }}>
      <div style={{ textAlign: "center", background: "#111", color: "white", padding: 20, borderRadius: 8 }}>
        <h2>Tu perfil</h2>
      </div>

      <div style={{ display: "flex", gap: 20, marginTop: 20, alignItems: "center" }}>
        <img src={user.foto || "/images/user-default.png"} alt="foto" style={{ width: 160, height: 160, objectFit: "cover", borderRadius: 12 }} />
        <div>
          <h3 style={{ margin: 0 }}>{user.nombre}</h3>
          <p style={{ color: "#555" }}>{user.descripcion || "Sin descripción"}</p>
          <div style={{ marginTop: 10 }}>
            <Link to="/profile/edit"><button className="px-4 py-2 mr-2 bg-yellow-400 rounded">Editar perfil</button></Link>
            <button className="px-4 py-2 bg-red-500 text-white rounded" onClick={()=>{
              localStorage.removeItem("token");
              localStorage.removeItem("user");
              window.location.href = "/login";
            }}>Cerrar sesión</button>
          </div>
        </div>
      </div>
    </div>
  );
}
