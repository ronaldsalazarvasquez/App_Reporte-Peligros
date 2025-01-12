import React, { useState, useEffect } from "react";

function TerritorioForm({ onTerritorioCreated, onTerritorioUpdated, selectedTerritorio, isEditing, onClose }) {
  const [nombreTerritorio, setNombreTerritorio] = useState("");
  const [idArea, setIdArea] = useState("");
  const [areas, setAreas] = useState([]);

  useEffect(() => {
    // Fetch de las áreas disponibles
    fetch('http://localhost:8080/utp/reporteAPP/api/areas/all')
      .then(response => response.json())
      .then(data => setAreas(data))
      .catch(error => console.error('Error:', error));

    if (isEditing && selectedTerritorio) {
      setNombreTerritorio(selectedTerritorio.nombreTerritorio);
      setIdArea(selectedTerritorio.idArea); // Asignar el área seleccionada
    } else {
      setNombreTerritorio("");
      setIdArea("");
    }
  }, [selectedTerritorio, isEditing]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const territorioData = {
      nombreTerritorio,
      idArea, // Asegúrate de enviar el ID del área
    };

    if (isEditing) {
      // Enviar solicitud PUT para actualizar el territorio
      fetch(`http://localhost:8080/utp/reporteAPP/api/territorios/${selectedTerritorio.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(territorioData),
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Error al actualizar el territorio');
          }
          return response.json();
        })
        .then(updatedTerritorio => {
          onTerritorioUpdated(updatedTerritorio);
          onClose();
        })
        .catch(error => console.error('Error:', error));
    } else {
      // Enviar solicitud POST para crear un nuevo territorio
      fetch('http://localhost:8080/utp/reporteAPP/api/territorios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(territorioData),
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Error al crear el territorio');
          }
          return response.json();
        })
        .then(createdTerritorio => {
          onTerritorioCreated(createdTerritorio);
          onClose();
        })
        .catch(error => console.error('Error:', error));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-md shadow-lg">
      <h2 className="text-white text-2xl mb-4 text-center">{isEditing ? "Editar Territorio" : "Crear Territorio"}</h2>
      <div className="mb-4">
        <label className="block text-gray-300 mb-1">Nombre del Territorio</label>
        <input
          type="text"
          value={nombreTerritorio}
          onChange={(e) => setNombreTerritorio(e.target.value)}
          className="w-full p-3 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring focus:ring-blue-500"
          required
        />
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

export default TerritorioForm;
