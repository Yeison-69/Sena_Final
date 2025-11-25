import { useEffect, useState } from "react";
import api from "../api/axios";
import ParcheCard from "../components/ParcheCard";

export default function Dashboard() {
  const [users, setUsers] = useState([]);
  const [index, setIndex] = useState(0);

  const loadUsers = async () => {
    try {
      const res = await api.get("/users/discover");
      setUsers(res.data);
      setIndex(0);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const likeUser = async () => {
    if (!users[index]) return;

    await api.post("/matches/like", { targetId: users[index].id });

    nextUser();
  };

  const skipUser = () => {
    nextUser();
  };

  const nextUser = () => {
    if (index + 1 < users.length) setIndex(index + 1);
    else alert("No hay más usuarios por hoy");
  };

  if (!users[index]) {
    return <h2 style={{ textAlign: "center", marginTop: 40 }}>Cargando...</h2>;
  }

  const u = users[index];

  return (
    <div style={{
      padding: 20,
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    }}>
      
      <h2>Personas cercanas</h2>

      <ParcheCard user={u} />

      {/* 🔥 BOTONES GRANDES Y VISIBLES */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 25,
          marginTop: 25
        }}
      >
        {/* ❌ Dislike */}
        <button
          onClick={skipUser}
          style={{
            width: 80,
            height: 80,
            borderRadius: "50%",
            border: "none",
            background: "#ff4d4d",
            color: "white",
            fontSize: 30,
            cursor: "pointer",
            boxShadow: "0 4px 12px rgba(0,0,0,0.3)"
          }}
        >
          ✖
        </button>

        {/* ❤️ Like */}
        <button
          onClick={likeUser}
          style={{
            width: 80,
            height: 80,
            borderRadius: "50%",
            border: "none",
            background: "#4ade80",
            color: "white",
            fontSize: 30,
            cursor: "pointer",
            boxShadow: "0 4px 12px rgba(0,0,0,0.3)"
          }}
        >
          ❤️
        </button>
      </div>
    </div>
  );
}
