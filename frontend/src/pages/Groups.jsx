import React, { useState } from "react";
import toast from "react-hot-toast";

export default function Groups() {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [imagen, setImagen] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nombre || !descripcion) {
      toast.error("Por favor completa todos los campos");
      return;
    }
    const nuevosEventos = JSON.parse(localStorage.getItem("eventos")) || [];
    const nuevoEvento = {
      id: Date.now(),
      nombre,
      descripcion,
      imagen,
      lat: parseFloat(lat) || 6.2442,
      lng: parseFloat(lng) || -75.5812,
    };
    nuevosEventos.push(nuevoEvento);
    localStorage.setItem("eventos", JSON.stringify(nuevosEventos));
    toast.success("Evento creado 🎉");

    setNombre("");
    setDescripcion("");
    setImagen("");
    setLat("");
    setLng("");
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-purple-800 to-pink-500 text-white">
      <div className="bg-white text-gray-800 p-6 mt-6 rounded-2xl shadow-lg w-80">
        <h2 className="text-xl font-bold text-center mb-4">Crear un nuevo evento</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Nombre del evento"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="border p-2 rounded w-full mb-2"
          />
          <textarea
            placeholder="Descripción del evento"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            className="border p-2 rounded w-full mb-2"
          ></textarea>
          <input
            type="text"
            placeholder="URL de imagen"
            value={imagen}
            onChange={(e) => setImagen(e.target.value)}
            className="border p-2 rounded w-full mb-2"
          />
          <input
            type="text"
            placeholder="Latitud (opcional)"
            value={lat}
            onChange={(e) => setLat(e.target.value)}
            className="border p-2 rounded w-full mb-2"
          />
          <input
            type="text"
            placeholder="Longitud (opcional)"
            value={lng}
            onChange={(e) => setLng(e.target.value)}
            className="border p-2 rounded w-full mb-3"
          />
          <button
            type="submit"
            className="bg-gradient-to-r from-pink-500 to-purple-600 text-white py-2 rounded-lg w-full"
          >
            Crear evento
          </button>
        </form>
      </div>
    </div>
  );
}
