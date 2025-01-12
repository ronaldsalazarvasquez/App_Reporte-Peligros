import React, { useState, useEffect } from "react";
import { toast } from 'react-toastify';

function UserForm({ onUserCreated, onUserUpdated, selectedUser, isEditing, onClose }) {
  const [nombre, setNombre] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [correo, setCorreo] = useState("");
  const [telefono, setTelefono] = useState("");
  const [estado, setEstado] = useState(true);
  const [rol, setRol] = useState("OPERADOR");
  const [idArea, setIdArea] = useState("");
  const [areas, setAreas] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/utp/reporteAPP/api/areas/all')
      .then(response => response.json())
      .then(data => setAreas(data))
      .catch(error => console.error('Error:', error));

    if (isEditing && selectedUser) {
      setNombre(selectedUser.nombre);
      setApellidos(selectedUser.apellidos);
      setCorreo(selectedUser.correo);
      setTelefono(selectedUser.telefono);
      setEstado(selectedUser.estado);
      setRol(selectedUser.rol);
      setIdArea(selectedUser.idArea); // Asignar el área seleccionada
    } else {
      setNombre("");
      setApellidos("");
      setCorreo("");
      setTelefono("");
      setEstado(true);
      setRol("OPERADOR");
      setIdArea("");
    }
  }, [selectedUser, isEditing]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const userData = {
      nombre,
      apellidos,
      correo,
      telefono,
      estado,
      rol,
      idArea,
    };

    if (isEditing) {
      fetch(`http://localhost:8080/utp/reporteAPP/api/usuarios/${selectedUser.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al actualizar el usuario');
        }
        return response.json();
      })
      .then(updatedUser => {
        onUserUpdated(updatedUser);
        toast.success("Usuario actualizado satisfactoriamente."); // Mensaje de éxito
        onClose();
      })
      .catch(error => {
        toast.error("Error al actualizar el usuario."); // Mensaje de error
        console.error('Error:', error);
      });
    } else {
      fetch(`http://localhost:8080/utp/reporteAPP/api/usuarios`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al crear el usuario');
        }
        return response.json();
      })
      .then(createdUser => {
        onUserCreated(createdUser);
        toast.success("Usuario creado satisfactoriamente."); // Mensaje de éxito
        onClose();
      })
      .catch(error => {
        toast.error("Error al crear el usuario."); // Mensaje de error
        console.error('Error:', error);
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-md shadow-lg">
      <h2 className="text-white text-2xl mb-4 text-center">{isEditing ? "Editar Usuario" : "Crear Usuario"}</h2>
      <div className="mb-4">
        <label className="block text-gray-300 mb-1">Nombre</label>
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="w-full p-3 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring focus:ring-blue-500"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-300 mb-1">Apellidos</label>
        <input
          type="text"
          value={apellidos}
          onChange={(e) => setApellidos(e.target.value)}
          className="w-full p-3 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring focus:ring-blue-500"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-300 mb-1">Correo</label>
        <input
          type="email"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          className="w-full p-3 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring focus:ring-blue-500"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-300 mb-1">Teléfono</label>
        <input
          type="tel"
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
          className="w-full p-3 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring focus:ring-blue-500"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-300 mb-1">Estado</label>
        <select
          value={estado}
          onChange={(e) => setEstado(e.target.value === "true")}
          className="w-full p-3 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring focus:ring-blue-500"
        >
          <option value="true">Activo</option>
          <option value="false">Inactivo</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-gray-300 mb-1">Rol</label>
        <select
          value={rol}
          onChange={(e) => setRol(e.target.value)}
          className="w-full p-3 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring focus:ring-blue-500"
          required
        >
          <option value="OPERADOR">OPERADOR</option>
          <option value="SUPERVISOR">SUPERVISOR</option>
          <option value="ADMINISTRADOR">ADMINISTRADOR</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-gray-300 mb-1">Área</label>
        <select
          value={idArea}
          onChange={(e) => setIdArea(e.target.value)}
          className="w-full p-3 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring focus:ring-blue-500"
          required
        >
          <option value="">Seleccione un área</option>
          {areas.map(area => (
            <option key={area.id} value={area.id}>{area.nombreArea}</option>
          ))}
        </select>
      </div>
      <div className="flex justify-center space-x-4 mt-6">
        <button type="submit" className="bg-blue-500 text-white px-6 py-2 rounded-md shadow-md hover:bg-blue-400 transition">
          {isEditing ? "Actualizar" : "Guardar"}
        </button>
        <button type="button" onClick={onClose} className="bg-red-500 text-white px-6 py-2 rounded-md shadow-md hover:bg-red-400 transition">
          Cancelar
        </button>
      </div>
    </form>
  );
}

export default UserForm;
