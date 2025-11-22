import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../config/api";

export default function Chat() {
  const token = localStorage.getItem("token");
  const me = JSON.parse(localStorage.getItem("user") || "null");

  const [chats, setChats] = useState([]);
  const [active, setActive] = useState(null);
  const [messages, setMessages] = useState([]);
  const [txt, setTxt] = useState("");

  // cargar chats
  const loadChats = async () => {
    const res = await axios.get(`${API_URL}/chats`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setChats(res.data);
  };

  // cargar mensajes del chat activo
  const loadMessages = async () => {
    if (!active) return;
    const res = await axios.get(`${API_URL}/chats/${active.id}/messages`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setMessages(res.data);
  };

  const send = async () => {
    if (!txt) return;
    await axios.post(
      `${API_URL}/chats/${active.id}/message`,
      { contenido: txt },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setTxt("");
    loadMessages();
  };

  useEffect(() => {
    loadChats();
  }, []);

  useEffect(() => {
    loadMessages();
    const interval = setInterval(loadMessages, 2000);
    return () => clearInterval(interval);
  }, [active]);

  return (
    <div className="flex h-screen">

      {/* LISTA DE CHATS */}
      <div className="w-1/3 bg-white shadow-md p-4 overflow-auto">
        <h2 className="text-xl font-bold mb-3">Chats</h2>
        {chats.map((c) => (
          <div
            key={c.id}
            onClick={() => setActive(c)}
            className={`p-3 rounded mb-2 cursor-pointer ${
              active?.id === c.id ? "bg-purple-200" : "bg-gray-100"
            }`}
          >
            {c.nombre || "Chat privado"}
          </div>
        ))}
      </div>

      {/* ZONA DE MENSAJES */}
      <div className="flex-1 bg-gray-50 flex flex-col">
        {!active ? (
          <div className="flex items-center justify-center h-full text-gray-500">
            Selecciona un chat
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-auto p-4">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`mb-3 flex ${
                    m.remitente_id === me.id
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >
                  <div
                    className={`px-3 py-2 rounded-lg ${
                      m.remitente_id === me.id
                        ? "bg-purple-600 text-white"
                        : "bg-white shadow"
                    }`}
                  >
                    {m.contenido}
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 bg-white shadow flex gap-2">
              <input
                className="flex-1 border rounded p-2"
                value={txt}
                onChange={(e) => setTxt(e.target.value)}
                placeholder="Escribe un mensaje..."
              />
              <button
                onClick={send}
                className="bg-purple-600 text-white px-4 rounded"
              >
                Enviar
              </button>
            </div>
          </>
        )}
      </div>

    </div>
  );
}
