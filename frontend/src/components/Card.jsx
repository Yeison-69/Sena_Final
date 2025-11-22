import React from "react";

const Card = ({ title, description, image, children }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      {image && (
        <img src={image} alt={title} className="w-full h-48 object-cover" />
      )}
      <div className="p-4">
        <h2 className="text-xl font-bold mb-2">{title}</h2>
        <p className="text-gray-700 mb-4">{description}</p>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Card;
