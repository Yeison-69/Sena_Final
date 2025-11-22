import React, { useEffect, useState } from "react";
import TinderCard from "react-tinder-card";
import axios from "axios";
import { API_URL } from "../config/api";

export default function Dashboard() {
  const token = localStorage.getItem("token");
  const [users, setUsers] = useState([]);

  useEffect(()=> {
    if (!token) return;
    axios.get(`${API_URL}/user/discover`, { headers: { Authorization: `Bearer ${token}` }})
      .then(res => setUsers(res.data))
      .catch(()=>{});
  }, []);

  const onSwipe = async (direction, id) => {
    if (!token) return alert("Inicia sesión");
    try {
      if (direction === "right") {
        await axios.post(`${API_URL}/match/like`, { likedId: id }, { headers: { Authorization: `Bearer ${token}` }});
      } else {
        // dislike (no endpoint required here)
      }
      setUsers(prev => prev.filter(u => u.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2 style={{ textAlign: "center" }}>Buscar pareja</h2>

      <div style={{ display: "flex", justifyContent: "center", paddingTop: 20 }}>
        {users.length === 0 && <div>No hay usuarios</div>}
        <div style={{ width: 300 }}>
          {users.map(u => (
            <TinderCard key={u.id} onSwipe={(dir)=>onSwipe(dir,u.id)}>
              <div style={{ background: "white", padding: 10, borderRadius: 8, marginBottom: 12 }}>
                <img src={u.foto || "/images/user-default.png"} alt="" style={{ width: "100%", height: 380, objectFit: "cover", borderRadius: 8 }} />
                <h3>{u.nombre}</h3>
                <p style={{ color: "#666" }}>{u.descripcion}</p>
              </div>
            </TinderCard>
          ))}
        </div>
      </div>
    </div>
  );
}
