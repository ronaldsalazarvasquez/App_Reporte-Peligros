import React, { useEffect, useState } from "react";
import AreaForm from "./AreaForm"; // Importa el formulario de área

function AreaList() {
  const [areas, setAreas] = useState([]);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedArea, setSelectedArea] = useState(null);
  const [isEditing, setIsEditing] = useState(false); // Estado para controlar la edición

  useEffect(() => {
    fetch('http://localhost:8080/utp/reporteAPP/api/areas/all')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => setAreas(data))
      .catch(error => setError(error));
  }, []);

  const handleAddAreaClick = () => {
    setSelectedArea(null); // No hay área seleccionada
    setIsEditing(false); // No estamos editando
    setShowModal(true); // Mostrar el formulario
  };

  const handleEditClick = (area) => {
    setSelectedArea(area);
    setIsEditing(true); // Activar el modo de edición
    setShowModal(true); // Mostrar el formulario
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedArea(null);
    setIsEditing(false); // Resetear el estado al cerrar
  };

  const handleAreaCreated = (newArea) => {
    setAreas((prev) => [...prev, newArea]); // Agrega el nuevo área a la lista
  };

  const handleAreaUpdated = (updatedArea) => {
    setAreas((prev) =>
      prev.map(area => (area.id === updatedArea.id ? updatedArea : area))
    ); // Actualiza el área en la lista
  };

  const handleDeleteClick = (id) => {
    fetch(`http://localhost:8080/utp/reporteAPP/api/areas/delete/${id}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al eliminar el área');
        }
        setAreas((prev) => prev.filter(area => area.id !== id)); // Elimina el área de la lista
      })
      .catch(error => setError(error));
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="overflow-x-auto relative">
     <h2 className="flex items-center justify-center text-white font-bold mt-10">GESTION DE AREAS</h2>
      <button 
        className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-full shadow-lg hover:bg-green-400 transition"
        onClick={handleAddAreaClick} // Agregar nuevo área
      >
        +
      </button>

      {/* Modal para el formulario de área */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-80">
          <div className="relative bg-gray-900 p-8 rounded-lg max-w-lg w-full border border-gray-700 shadow-lg">
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-red-500 focus:outline-none text-xl font-bold"
            >
              ✖
            </button>
            <AreaForm 
              onAreaCreated={handleAreaCreated} 
              onAreaUpdated={handleAreaUpdated} 
              selectedArea={selectedArea} 
              isEditing={isEditing} 
              onClose={handleCloseModal} 
            />
          </div>
        </div>
      )}

      <table className="min-w-full bg-gray-900 text-white rounded-md shadow-md mt-4">
        <thead>
          <tr className="bg-gray-800">
            <th className="py-2 px-4 text-center">ID</th>
            <th className="py-2 px-4 text-center">Nombre del Área</th>
            <th className="py-2 px-4 text-center">Descripción</th>
            <th className="py-2 px-4 text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {areas.length > 0 ? (
            areas.map((area) => (
              <tr key={area.id} className="border-b border-gray-700">
                <td className="py-2 px-4 text-center">{area.id}</td>
                <td className="py-2 px-4 text-center">{area.nombreArea}</td>
                <td className="py-2 px-4 text-center">{area.descripcion}</td>
                <td className="py-2 px-4 text-center flex justify-center space-x-2">
                  <button 
                    className="bg-blue-500 px-3 py-1 rounded-md hover:bg-blue-400"
                    onClick={() => handleEditClick(area)} // Llama a la función para editar
                  >
                    Editar
                  </button>
                  <button 
                    className="bg-red-500 px-3 py-1 rounded-md hover:bg-red-400"
                    onClick={() => handleDeleteClick(area.id)} // Llama a la función para eliminar
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="py-4 px-4 text-center text-gray-400">
                No hay áreas disponibles.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default AreaList;
