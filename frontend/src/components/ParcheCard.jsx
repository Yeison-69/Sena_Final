import React from "react";

export default function ParcheCard({ parche, onJoin, onFocus, onEdit, onDelete }) {
  return (
    <div
      onClick={() => onFocus && onFocus(parche)}
      className="bg-white text-gray-900 rounded-xl shadow-md overflow-hidden hover:scale-[1.02] transition-transform cursor-pointer"
    >
      {parche.image && (
        <img
          src={parche.image}
          alt={parche.title}
          className="w-full h-40 object-cover"
        />
      )}
      <div className="p-4">
        <h2 className="text-xl font-semibold">{parche.title}</h2>
        <p className="text-gray-600 text-sm mb-2">{parche.description}</p>
        <p className="text-sm text-gray-500">{parche.place}</p>
        <p className="text-xs text-gray-400">
          📅 {parche.time ? new Date(parche.time).toLocaleString() : "Sin fecha"}
        </p>

        <div className="flex gap-2 mt-3">
          {onJoin && (
            <button
              onClick={(e) => { e.stopPropagation(); onJoin(parche.id); }}
              className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md text-sm"
            >
              🤝 Unirme
            </button>
          )}
          {onEdit && (
            <button
              onClick={(e) => { e.stopPropagation(); onEdit(parche); }}
              className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md text-sm"
            >
              ✏️ Editar
            </button>
          )}
          {onDelete && (
            <button
              onClick={(e) => { e.stopPropagation(); onDelete(parche.id); }}
              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm"
            >
              🗑️ Eliminar
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
