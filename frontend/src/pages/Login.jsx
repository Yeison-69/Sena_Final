import React, { useState } from "react";
import axios from "axios";
import { API_URL } from "../config/api";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const nav = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleLogin = async () => {
    try {
      const res = await axios.post(`${API_URL}/auth/login`, form);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      nav("/profile");
    } catch (err) {
      alert(err.response?.data?.error || "Error de login");
    }
  };

  return (
    <div style={{ padding: 20, maxWidth: 420, margin: "40px auto", background: "white", borderRadius: 8 }}>
      <h2 style={{ textAlign: "center" }}>Iniciar sesión</h2>
      <input placeholder="Email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} className="p-2 w-full mb-2" />
      <input placeholder="Contraseña" type="password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} className="p-2 w-full mb-2" />
      <button onClick={handleLogin} className="w-full p-2 bg-purple-600 text-white rounded">Entrar</button>
      <div style={{ marginTop: 10, textAlign: "center" }}>
        <Link to="/register">Crear cuenta</Link>
      </div>
    </div>
  );
}
