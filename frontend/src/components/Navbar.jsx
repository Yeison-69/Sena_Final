import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../config/api";

export default function Navbar() {
  const token = localStorage.getItem("token");
  const [numNoti, setNumNoti] = useState(0);

  const load = async () => {
    if (!token) return;
    const res = await axios.get(`${API_URL}/notificaciones`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    const sinLeer = res.data.filter((n) => n.leida === 0).length;
    setNumNoti(sinLeer);
  };

  useEffect(() => {
    load();
    const interval = setInterval(load, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <nav className="p-4 bg-purple-600 text-white flex justify-between">
      <h1 className="font-bold">ParcheGO</h1>

      <a href="/notificaciones" className="relative text-xl">
        🔔
        {numNoti > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs px-1 rounded-full">
            {numNoti}
          </span>
        )}
      </a>
    </nav>
  );
}
