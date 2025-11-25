import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Notificaciones() {
  const [items, setItems] = useState([]);

  const load = async () => {
    try {
      const res = await api.get("/notifications"); // 🔥 ESTA ES LA RUTA CORRECTA
      setItems(res.data);
    } catch (e) {
      console.log("Error cargando notificaciones:", e);
    }
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>Notificaciones</h2>

      {items.length === 0 && <p>No hay notificaciones</p>}

      {items.map(n => (
        <div key={n.id} style={{
          padding: 10,
          background: "#eee",
          marginBottom: 10,
          borderRadius: 5
        }}>
          <p>{n.mensaje}</p>
          <small>{new Date(n.created_at).toLocaleString()}</small>
        </div>
      ))}
    </div>
  );
}
