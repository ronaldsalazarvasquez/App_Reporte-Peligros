import React from 'react';

function UserCard({ user, onClose }) {
  // Verifica si el usuario está definido
  if (!user) {
    return null; // O un mensaje de "Usuario no encontrado"
  }

  return (
    <div className="bg-gray-800 p-6 rounded-md shadow-lg">
      <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-red-500">
        ✖
      </button>
      <h2 className="text-white text-2xl mb-4">{`${user.nombre} ${user.apellidos}`}</h2>
      <p className="text-gray-300">Rol: {user.rol}</p>
      <p className="text-gray-300">Correo: {user.correo}</p>
      <p className="text-gray-300">Teléfono: {user.telefono}</p>
      <p className="text-gray-300">Estado: {user.estado ? 'Activo' : 'Inactivo'}</p>
      <p className="text-gray-300">Área: {user.nombreArea}</p> {/* Muestra el nombre del área */}
    </div>
  );
}

export default UserCard;
