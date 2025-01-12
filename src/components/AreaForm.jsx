import React, { useEffect, useState } from "react";

function AreaForm({ onAreaCreated, onAreaUpdated, selectedArea, isEditing, onClose }) {
  const [nombreArea, setNombreArea] = useState("");
  const [descripcion, setDescripcion] = useState("");

  useEffect(() => {
    if (isEditing && selectedArea) {
      setNombreArea(selectedArea.nombreArea);
      setDescripcion(selectedArea.descripcion);
    } else {
      // Resetear el formulario si no estamos editando
      setNombreArea("");
      setDescripcion("");
    }
  }, [selectedArea, isEditing]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const areaData = {
      nombreArea,
      descripcion,
    };

    // Si estamos editando, añadir el ID al objeto
    if (isEditing && selectedArea) {
      areaData.id = selectedArea.id; // Usar el ID para actualizar
    }

    // Enviar la solicitud POST al mismo endpoint para crear o actualizar
    fetch('http://localhost:8080/utp/reporteAPP/api/areas/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(areaData),
    })
      .then(response => response.json())
      .then(data => {
        if (isEditing) {
          onAreaUpdated(data); // Llama a la función de actualización
        } else {
          onAreaCreated(data); // Llama a la función de creación
        }
        onClose(); // Cierra el modal
      })
      .catch(error => console.error('Error:', error));
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-800 p-4 rounded-md">
      <h2 className="text-white text-lg mb-4">{isEditing ? "Editar Área" : "Crear Área"}</h2>
      <div className="mb-4">
        <label className="block text-gray-300 mb-1">Nombre del Área</label>
        <input
          type="text"
          value={nombreArea}
          onChange={(e) => setNombreArea(e.target.value)}
          className="w-full p-2 rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-300 mb-1">Descripción</label>
        <textarea
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          className="w-full p-2 rounded"
        />
      </div>
      <div className="flex justify-end">
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2">
          {isEditing ? "Actualizar" : "Guardar"}
        </button>
        <button type="button" onClick={onClose} className="bg-red-500 text-white px-4 py-2 rounded-md">
          Cancelar
        </button>
      </div>
    </form>
  );
}

export default AreaForm;
