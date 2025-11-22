import React from "react";
import { Routes, Route, Link } from "react-router-dom";

import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Profile from "./pages/Profile.jsx";
import EditProfile from "./pages/EditProfile.jsx";
import Events from "./pages/Events.jsx";
import Chat from "./pages/Chat.jsx";
import Notificaciones from "./pages/Notificaciones.jsx";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/edit" element={<EditProfile />} />
        <Route path="/events" element={<Events />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/notifications" element={<Notificaciones />} />
        <Route path="/edit-profile" element={<EditProfile />} />

      </Routes>

      <nav className="bottom">
        <Link to="/">🏠</Link>
        <Link to="/events">🎉</Link>
        <Link to="/chat">💬</Link>
        <Link to="/profile">👤</Link>
        <Link to="/notifications">🔔</Link>
      </nav>
    </>
  );
}
