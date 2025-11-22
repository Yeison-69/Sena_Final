import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../config/api";

export default function Match() {
  const token = localStorage.getItem("token");
  const me = JSON.parse(localStorage.getItem("user"));

  const [users, setUsers] = useState([]);
  const [idx, setIdx] = useState(0);
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    loadCandidates();
  }, []);

  const loadCandidates = async () => {
    const res = await axios.get(`${API_URL}/users/all`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    // quitarme a mi mismo
    setUsers(res.data.filter((u) => u.id !== me.id));
  };

  const like = async () => {
    if (!users[idx]) return;
    const res = await axios.post(
      `${API_URL}/match/like`,
      { likedUserId: users[idx].id },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    if (res.data.match) {
      setMensaje("🔥 ¡Match encontrado!");
    } else {
      setMensaje("👍 Like enviado");
    }
    next();
  };

  const skip = () => {
    setMensaje("👋 Omitido");
    next();
  };

  const next = () => {
    setIdx((i) => i + 1);
  };

  const person = users[idx];

  return (
    <div className="p-4 flex flex-col items-center">

      <h2 className="text-2xl font-bold mb-4">Match</h2>

      {mensaje && <div className="mb-4">{mensaje}</div>}

      {!person ? (
        <div>No hay más personas</div>
      ) : (
        <div className="w-80 bg-white shadow-lg p-4 rounded-xl text-center">

          <img
            src={person.foto || "https://via.placeholder.com/200"}
            className="w-full h-64 object-cover rounded-lg"
          />

          <h3 className="text-xl mt-3">{person.nombre}</h3>
          <p className="text-gray-600">{person.descripcion}</p>

          <div className="flex justify-around mt-4">
            <button
              className="bg-red-500 text-white px-4 py-2 rounded-xl"
              onClick={skip}
            >
              X
            </button>

            <button
              className="bg-green-600 text-white px-4 py-2 rounded-xl"
              onClick={like}
            >
              ♥
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
