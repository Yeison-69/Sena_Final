import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../config/api";
import toast from "react-hot-toast";

export default function Events() {
  const token = localStorage.getItem("token");
  const me = JSON.parse(localStorage.getItem("user") || "{}");

  const [events, setEvents] = useState([]);
  const [form, setForm] = useState({
    titulo: "",
    descripcion: "",
    fecha: "",
    imagen: "",
    map_url: ""
  });
  const [editingId, setEditingId] = useState(null);

  const load = async () => {
    const res = await axios.get(`${API_URL}/events`);
    setEvents(res.data);
  };

  useEffect(() => {
    load();
  }, []);

  const save = async (e) => {
    e.preventDefault();

    if (!token) return toast.error("Inicia sesión primero");

    try {
      if (editingId) {
        await axios.put(
          `${API_URL}/events/update`,
          { id: editingId, ...form },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        toast.success("Evento actualizado");
      } else {
        await axios.post(
          `${API_URL}/events/create`,
          form,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        toast.success("Evento creado");
      }

      setForm({ titulo: "", descripcion: "", fecha: "", imagen: "", map_url: "" });
      setEditingId(null);
      load();
    } catch (e) {
      toast.error("Error guardando evento");
    }
  };

  const handleEdit = (ev) => {
    setEditingId(ev.id);
    setForm({
      titulo: ev.titulo,
      descripcion: ev.descripcion,
      fecha: ev.fecha,
      imagen: ev.imagen,
      map_url: ev.map_url
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("¿Eliminar evento?")) return;

    try {
      await axios.delete(`${API_URL}/events/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      toast.success("Evento eliminado");
      load();
    } catch {
      toast.error("Error eliminando evento");
    }
  };

  const join = async (id) => {
    if (!token) return toast.error("Inicia sesión");

    await axios.post(
      `${API_URL}/events/${id}/join`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );

    toast.success("Te uniste al evento");
  };

  return (
    <div className="p-4">

      {/* FORM */}
      <form
        onSubmit={save}
        className="bg-white p-4 rounded-xl shadow-md mb-4 max-w-xl mx-auto"
      >
        <h2 className="text-2xl font-bold mb-3">
          {editingId ? "Editar evento" : "Crear evento"}
        </h2>

        <input
          className="p-2 border rounded w-full mb-2"
          placeholder="Título"
          value={form.titulo}
          onChange={(e) => setForm({ ...form, titulo: e.target.value })}
        />

        <textarea
          className="p-2 border rounded w-full mb-2"
          placeholder="Descripción"
          value={form.descripcion}
          onChange={(e) => setForm({ ...form, descripcion: e.target.value })}
        />

        <input
          className="p-2 border rounded w-full mb-2"
          type="date"
          value={form.fecha}
          onChange={(e) => setForm({ ...form, fecha: e.target.value })}
        />

        <input
          className="p-2 border rounded w-full mb-2"
          placeholder="URL de imagen"
          value={form.imagen}
          onChange={(e) => setForm({ ...form, imagen: e.target.value })}
        />

        <input
          className="p-2 border rounded w-full mb-2"
          placeholder="Link de Google Maps (opcional)"
          value={form.map_url}
          onChange={(e) => setForm({ ...form, map_url: e.target.value })}
        />

        <button className="bg-blue-600 w-full text-white p-2 rounded mt-2">
          {editingId ? "Guardar" : "Crear evento"}
        </button>
      </form>

      {/* LIST */}
      <div className="mt-6 space-y-3">
        {events.map((ev) => (
          <div
            key={ev.id}
            className="bg-white p-4 rounded-xl shadow-md max-w-xl mx-auto"
          >
            {ev.imagen && (
              <img
                src={ev.imagen}
                className="w-full h-48 object-cover rounded mb-3"
              />
            )}

            <h3 className="text-xl font-bold">{ev.titulo}</h3>
            <p className="text-gray-600">{ev.descripcion}</p>
            <p className="text-sm text-gray-400">
              📅 {ev.fecha} — Creador: {ev.creador_nombre}
            </p>

            {ev.map_url && (
              <a
                href={ev.map_url}
                target="_blank"
                className="block mt-2 text-blue-600 underline"
              >
                📍 Ver ubicación en Google Maps
              </a>
            )}

            <div className="flex gap-2 mt-3">
              <button
                onClick={() => join(ev.id)}
                className="px-3 py-1 bg-green-600 text-white rounded"
              >
                Unirme
              </button>

              {me.id === ev.creator_id && (
                <>
                  <button
                    onClick={() => handleEdit(ev)}
                    className="px-3 py-1 bg-yellow-400 rounded"
                  >
                    Editar
                  </button>

                  <button
                    onClick={() => handleDelete(ev.id)}
                    className="px-3 py-1 bg-red-600 text-white rounded"
                  >
                    Eliminar
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
