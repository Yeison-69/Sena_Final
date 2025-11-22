import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../config/api";

export default function Matches() {
  const token = localStorage.getItem("token");
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const res = await axios.get(`${API_URL}/match/mine`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setMatches(res.data);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Mis Matches</h2>

      <div className="grid grid-cols-2 gap-4">
        {matches.map((m) => (
          <div key={m.id} className="bg-white shadow p-3 rounded-lg">
            <img
              src={m.foto || "https://via.placeholder.com/200"}
              className="w-full h-40 object-cover rounded-lg"
            />
            <h3 className="mt-2 text-lg">{m.nombre}</h3>
            <p className="text-gray-600">{m.descripcion}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
