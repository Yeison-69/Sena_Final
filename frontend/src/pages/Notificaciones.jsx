import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../config/api";

export default function Notificaciones() {
  const token = localStorage.getItem("token");
  const [noti, setNoti] = useState([]);

  const load = async () => {
    const res = await axios.get(`${API_URL}/notificaciones`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setNoti(res.data);
  };

  const marcarLeida = async (id) => {
    await axios.put(
      `${API_URL}/notificaciones/${id}/read`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );
    load();
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Notificaciones</h2>

      {noti.map((n) => (
        <div
          key={n.id}
          className={`p-3 rounded shadow mb-2 ${
            n.leida ? "bg-gray-200" : "bg-white"
          }`}
        >
          <div className="flex justify-between">
            <div>
              <strong>{n.tipo.toUpperCase()}</strong>
              <p>{n.mensaje}</p>
              <small className="text-gray-500">{n.created_at}</small>
            </div>

            {!n.leida && (
              <button
                onClick={() => marcarLeida(n.id)}
                className="bg-purple-600 text-white px-3 py-1 rounded"
              >
                Marcar
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
