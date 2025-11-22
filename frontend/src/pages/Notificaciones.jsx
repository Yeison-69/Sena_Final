import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../config/api";

export default function Notificaciones() {
  const token = localStorage.getItem("token");
  const [items, setItems] = useState([]);

  useEffect(()=> {
    if (!token) return;
    axios.get(`${API_URL}/notifications`, { headers: { Authorization: `Bearer ${token}` }})
      .then(r=>setItems(r.data))
      .catch(()=>{});
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h3>Notificaciones</h3>
      {items.length===0 && <p>No hay notificaciones</p>}
      {items.map(n => (
        <div key={n.id} style={{ background: "white", padding: 8, borderRadius: 8, marginBottom: 8 }}>
          <div>{n.mensaje}</div>
          <div style={{ fontSize: 12, color: "#666" }}>{new Date(n.creado_en).toLocaleString()}</div>
        </div>
      ))}
    </div>
  );
}
