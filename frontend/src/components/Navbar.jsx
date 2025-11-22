import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const linkClass = ({ isActive }) =>
    isActive
      ? "text-white bg-blue-500 px-3 py-2 rounded"
      : "text-gray-700 hover:text-white hover:bg-blue-500 px-3 py-2 rounded transition";

  return (
    <nav className="bg-gray-100 shadow-md px-4 py-3 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-blue-500">Proyecto Final</h1>
      <div className="space-x-2 flex">
        <NavLink to="/" className={linkClass}>
          Dashboard
        </NavLink>
        <NavLink to="/eventos" className={linkClass}>
          Eventos
        </NavLink>
        <NavLink to="/parches" className={linkClass}>
          Parches
        </NavLink>
        <NavLink to="/amigos" className={linkClass}>
          Amigos
        </NavLink>
        <NavLink to="/mapa" className={linkClass}>
          Mapa
        </NavLink>
        <NavLink to="/profile" className={linkClass}>
          Perfil
        </NavLink>
        <NavLink to="/login" className={linkClass}>
          Login
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
