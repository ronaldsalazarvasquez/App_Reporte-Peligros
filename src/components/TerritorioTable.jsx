import React, { useEffect, useState } from "react";
import TerritorioForm from "./TerritorioForm";

function TerritorioTable() {
  const [territorios, setTerritorios] = useState([]);
  const [areas, setAreas] = useState([]);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedTerritorio, setSelectedTerritorio] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchTerritorios();
    fetchAreas();
  }, []);

  const fetchTerritorios = () => {
    fetch("http://localhost:8080/utp/reporteAPP/api/territorios")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => setTerritorios(data))
      .catch((error) => setError(error));
  };

  const fetchAreas = () => {
    fetch("http://localhost:8080/utp/reporteAPP/api/areas/all")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => setAreas(data))
      .catch((error) => setError(error));
  };

  const handleAddTerritorioClick = () => {
    setSelectedTerritorio(null);
    setIsEditing(false);
    setShowModal(true);
  };

  const handleEditClick = (territorio) => {
    setSelectedTerritorio(territorio);
    setIsEditing(true);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedTerritorio(null);
    setIsEditing(false);
  };

  const handleTerritorioCreated = (newTerritorio) => {
    setTerritorios((prev) => [...prev, newTerritorio]);
  };

  const handleTerritorioUpdated = (updatedTerritorio) => {
    setTerritorios((prev) =>
      prev.map((territorio) =>
        territorio.id === updatedTerritorio.id ? updatedTerritorio : territorio
      )
    );
  };

  const handleDeleteClick = (id) => {
    fetch(`http://localhost:8080/utp/reporteAPP/api/territorios/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al eliminar el territorio");
        }
        setTerritorios((prev) =>
          prev.filter((territorio) => territorio.id !== id)
        );
      })
      .catch((error) => setError(error));
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="overflow-x-auto relative">
      <h1 className="flex items-center justify-center text-white font-bold mt-10 p-3">
        {" "}
        GESTION DE TERRITORIOS{" "}
      </h1>
      <button
        className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-full shadow-lg hover:bg-green-400 transition"
        onClick={handleAddTerritorioClick}
      >
        <span className="text-2xl">+</span>
      </button>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-80">
          <div className="relative bg-gray-900 p-8 rounded-lg max-w-lg w-full border border-gray-700 shadow-lg">
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-red-500 focus:outline-none text-xl font-bold"
            >
              ✖
            </button>
            <TerritorioForm
              onTerritorioCreated={handleTerritorioCreated}
              onTerritorioUpdated={handleTerritorioUpdated}
              selectedTerritorio={selectedTerritorio}
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
            <th className="py-2 px-4 text-center">Nombre del Territorio</th>
            <th className="py-2 px-4 text-center">ID Área</th>
            <th className="py-2 px-4 text-center">Nombre Área</th>
            <th className="py-2 px-4 text-center">Estado</th>
            <th className="py-2 px-4 text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {territorios.length > 0 ? (
            territorios.map((territorio) => {
              const area = areas.find((area) => area.id === territorio.idArea);
              return (
                <tr key={territorio.id} className="border-b border-gray-700">
                  <td className="py-2 px-4 text-center">{territorio.id}</td>
                  <td className="py-2 px-4 text-center">
                    {territorio.nombreTerritorio}
                  </td>
                  <td className="py-2 px-4 text-center">{territorio.idArea}</td>
                  <td className="py-2 px-4 text-center">
                    {area ? area.nombreArea : "No asignado"}
                  </td>
                  <td className="py-2 px-4 text-center">{territorio.estado}</td>
                  <td className="py-2 px-4 text-center flex justify-center space-x-2">
                    <button
                      className="bg-yellow-500 px-3 py-1 rounded-md hover:bg-yellow-400"
                      onClick={() => handleEditClick(territorio)}
                    >
                      Editar
                    </button>
                    <button
                      className="bg-red-500 px-3 py-1 rounded-md hover:bg-red-400"
                      onClick={() => handleDeleteClick(territorio.id)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="6" className="py-4 px-4 text-center text-gray-400">
                No hay territorios disponibles.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default TerritorioTable;
