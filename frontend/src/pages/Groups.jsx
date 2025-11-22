import React, { useState } from "react";

export default function Groups() {
  const [items, setItems] = useState(JSON.parse(localStorage.getItem("parches")) || []);
  const [form, setForm] = useState({ titulo:"", descripcion:"", imagen:"" });

  const save = () => {
    const newItem = { id: Date.now(), ...form };
    const updated = [...items, newItem];
    setItems(updated);
    localStorage.setItem("parches", JSON.stringify(updated));

    setForm({ titulo:"", descripcion:"", imagen:"" });
    alert("Parche creado 🎉");
  };

  return (
    <div className="container">
      <div className="card">
        <h2>Crear parche</h2>
        <input placeholder="Título" value={form.titulo}
          onChange={e=>setForm({...form,titulo:e.target.value})}/>
        <textarea placeholder="Descripción" value={form.descripcion}
          onChange={e=>setForm({...form,descripcion:e.target.value})}/>
        <input placeholder="Imagen URL" value={form.imagen}
          onChange={e=>setForm({...form,imagen:e.target.value})}/>

        <button onClick={save}>Crear</button>
      </div>

      {items.map(p => (
        <div className="card" key={p.id} style={{ marginTop:10 }}>
          {p.imagen && <img src={p.imagen} style={{ width:"100%", borderRadius:10 }} />}
          <h3>{p.titulo}</h3>
          <p>{p.descripcion}</p>
        </div>
      ))}
    </div>
  );
}
