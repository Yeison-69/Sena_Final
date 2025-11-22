import React, { useEffect, useState } from "react";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { API_URL } from "../config/api";
import toast from "react-hot-toast";

// fix icons for Vite
const iconUrl = new URL("leaflet/dist/images/marker-icon.png", import.meta.url).href;
const iconRetina = new URL("leaflet/dist/images/marker-icon-2x.png", import.meta.url).href;
const shadowUrl = new URL("leaflet/dist/images/marker-shadow.png", import.meta.url).href;
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: iconRetina,
  iconUrl: iconUrl,
  shadowUrl: shadowUrl,
});

export default function Events() {
  const token = localStorage.getItem("token");
  const me = JSON.parse(localStorage.getItem("user") || "null");
  const [events, setEvents] = useState([]);
  const [form, setForm] = useState({ titulo: "", descripcion: "", fecha: "", lat: 6.2442, lng: -75.5812, imagen: "" });
  const [editingId, setEditingId] = useState(null);

  const load = async ()=> {
    const res = await axios.get(`${API_URL}/events`);
    setEvents(res.data);
  };

  useEffect(()=>{ load(); }, []);

  const createOrUpdate = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`${API_URL}/events/update`, { id: editingId, ...form }, { headers: { Authorization: `Bearer ${token}` }});
        toast.success("Evento actualizado");
      } else {
        await axios.post(`${API_URL}/events/create`, form, { headers: { Authorization: `Bearer ${token}` }});
        toast.success("Evento creado");
      }
      setForm({ titulo: "", descripcion: "", fecha: "", lat: 6.2442, lng: -75.5812, imagen: "" });
      setEditingId(null);
      load();
    } catch (err) { toast.error("Error"); console.error(err); }
  };

  const handleEdit = (ev) => {
    setEditingId(ev.id);
    setForm({ titulo: ev.titulo || "", descripcion: ev.descripcion || "", fecha: ev.fecha || "", lat: ev.lat || 6.2442, lng: ev.lng || -75.5812, imagen: ev.imagen || "" });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!confirm("Eliminar evento?")) return;
    try {
      await axios.put(`${API_URL}/events/update`, { id, titulo: "__DELETE__" }, { headers: { Authorization: `Bearer ${token}` }});
      // NOTE: backend delete route is different in your backend; adapt if needed.
      toast.success("Evento eliminado (backend debe soportarlo)");
      load();
    } catch (err) { toast.error("Error"); }
  };

  const handleJoin = async (id) => {
    try {
      await axios.post(`${API_URL}/events/${id}/join`, {}, { headers: { Authorization: `Bearer ${token}` }});
      toast.success("Te uniste");
    } catch (err) { toast.error("No se pudo unir"); }
  };

  return (
    <div style={{ padding: 20 }}>
      <form onSubmit={createOrUpdate} style={{ background: "white", padding: 12, borderRadius: 8, marginBottom: 12 }}>
        <h3>{editingId ? "Editar evento" : "Crear evento"}</h3>
        <input placeholder="Título" value={form.titulo} onChange={e=>setForm({...form,titulo:e.target.value})} className="p-2 w-full mb-2" required />
        <textarea placeholder="Descripción" value={form.descripcion} onChange={e=>setForm({...form,descripcion:e.target.value})} className="p-2 w-full mb-2" />
        <div style={{ display: "flex", gap: 8 }}>
          <input type="date" value={form.fecha} onChange={e=>setForm({...form,fecha:e.target.value})} className="p-2" />
          <input placeholder="Lat" value={form.lat} onChange={e=>setForm({...form,lat:e.target.value})} className="p-2" />
          <input placeholder="Lng" value={form.lng} onChange={e=>setForm({...form,lng:e.target.value})} className="p-2" />
        </div>
        <input placeholder="URL imagen" value={form.imagen} onChange={e=>setForm({...form,imagen:e.target.value})} className="p-2 w-full mt-2" />
        <div style={{ marginTop: 8 }}>
          <button className="px-4 py-2 bg-blue-600 text-white rounded">{editingId ? "Guardar" : "Crear"}</button>
          {editingId && <button type="button" onClick={()=>{ setEditingId(null); setForm({ titulo: "", descripcion: "", fecha: "", lat:6.2442, lng:-75.5812, imagen:"" }); }} className="ml-2 px-3 py-2 border rounded">Cancelar</button>}
        </div>
      </form>

      <MapContainer center={[6.2442, -75.5812]} zoom={13} style={{ height: 300, width: "100%", marginBottom: 12 }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {events.map(ev => (
          <Marker key={ev.id} position={[ev.lat || 6.2442, ev.lng || -75.5812]}>
            <Popup>
              <strong>{ev.titulo}</strong><br />
              {ev.descripcion}<br />
              <button onClick={()=>handleJoin(ev.id)} className="mt-2 px-2 py-1 bg-green-500 text-white rounded">Unirse</button>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      <div>
        {events.map(ev => (
          <div key={ev.id} style={{ background: "white", padding: 12, borderRadius: 8, marginBottom: 10 }}>
            {ev.imagen && <img src={ev.imagen} alt="" style={{ width: "100%", height: 160, objectFit: "cover", borderRadius: 8 }} />}
            <h3>{ev.titulo}</h3>
            <p style={{ color: "#666" }}>{ev.descripcion}</p>
            <small>Organizador: {ev.creador_nombre || ev.creator_id}</small>
            <div style={{ marginTop: 8 }}>
              <button className="px-3 py-1 bg-green-600 text-white rounded mr-2" onClick={()=>handleJoin(ev.id)}>Unirse</button>
              {JSON.parse(localStorage.getItem("user") || "{}").id === ev.creator_id && (
                <>
                  <button className="px-3 py-1 bg-yellow-400 rounded mr-2" onClick={()=>handleEdit(ev)}>Editar</button>
                  <button className="px-3 py-1 bg-red-600 text-white rounded" onClick={()=>handleDelete(ev.id)}>Eliminar</button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
