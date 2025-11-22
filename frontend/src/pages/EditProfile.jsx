import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../config/api";
import toast from "react-hot-toast";

export default function EditProfile() {
  const token = localStorage.getItem("token");
  const [form, setForm] = useState({ nombre: "", descripcion: "", foto: "" });

  useEffect(() => {
    if (!token) return;
    axios.get(`${API_URL}/user/me`, { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setForm({ nombre: res.data.nombre || "", descripcion: res.data.descripcion || "", foto: res.data.foto || "" }))
      .catch(()=>{});
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${API_URL}/user/update`, form, { headers: { Authorization: `Bearer ${token}` }});
      toast.success("Perfil actualizado");
      window.location.href = "/profile";
    } catch (err) {
      toast.error("Error");
    }
  };

  return (
    <div style={{ padding: 20, maxWidth: 600, margin: "30px auto", background: "white", borderRadius: 8 }}>
      <h3>Editar perfil</h3>
      <form onSubmit={handleSave} className="space-y-2">
        <input placeholder="Nombre" value={form.nombre} onChange={e=>setForm({...form,nombre:e.target.value})} className="p-2 w-full" />
        <textarea placeholder="Descripción" value={form.descripcion} onChange={e=>setForm({...form,descripcion:e.target.value})} className="p-2 w-full" />
        <input placeholder="URL foto" value={form.foto} onChange={e=>setForm({...form,foto:e.target.value})} className="p-2 w-full" />
        <button type="submit" className="bg-purple-600 text-white p-2 rounded">Guardar</button>
      </form>
    </div>
  );
}
