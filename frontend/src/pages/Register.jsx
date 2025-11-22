import React, { useState } from "react";

const API_URL = "http://localhost:3000/api/auth";

export default function Register() {
  const [form, setForm] = useState({ nombre: "", email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    alert(data.message);

    if (res.ok) {
      window.location.href = "/login";
    }
  };

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold">Crear cuenta</h2>

      <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-3">
        <input
          type="text"
          placeholder="Nombre"
          className="border p-2"
          onChange={(e) => setForm({ ...form, nombre: e.target.value })}
        />

        <input
          type="email"
          placeholder="Correo"
          className="border p-2"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="password"
          placeholder="Contraseña"
          className="border p-2"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button className="bg-blue-600 text-white p-2 rounded">Registrarse</button>
      </form>
    </div>
  );
}
