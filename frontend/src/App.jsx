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
import { Toaster } from "react-hot-toast";

export default function App() {
  return (
    <div className="min-h-screen">
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/edit" element={<EditProfile />} />
        <Route path="/events" element={<Events />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/notifications" element={<Notificaciones />} />
      </Routes>

      {/* bottom nav */}
      <nav style={{ position: "fixed", bottom: 0, left: 0, right: 0 }} className="bg-white border-t p-2 flex justify-around">
        <Link to="/">🏠</Link>
        <Link to="/events">🎉</Link>
        <Link to="/chat">💬</Link>
        <Link to="/profile">👤</Link>
        <Link to="/notifications">🔔</Link>
      </nav>

      <Toaster position="top-center" />
    </div>
  );
}
