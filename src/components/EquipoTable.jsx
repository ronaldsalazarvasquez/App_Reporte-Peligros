import React, { useEffect, useState } from "react";

function EquipoTable() {
  const [equipos, setEquipos] = useState([]);
  const [areas, setAreas] = useState([]);
  const [territorios, setTerritorios] = useState([]);
  const [error, setError] = useState(null);
  const [selectedArea, setSelectedArea] = useState("");
  const [selectedTerritorio, setSelectedTerritorio] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchEquipos(); // Cargar los equipos al iniciar
    fetchAreas(); // Cargar áreas al iniciar
    fetchTerritorios(); // Cargar territorios al iniciar
  }, []);

  const fetchEquipos = () => {
    fetch("http://localhost:8080/utp/reporteAPP/api/equipos")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => setEquipos(data))
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

  const filteredEquipos = equipos.filter(
    (equipo) =>
      equipo.nombreEquipo &&
      equipo.nombreEquipo.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedArea ? equipo.idArea === parseInt(selectedArea) : true) &&
      (selectedTerritorio
        ? equipo.idTerritorio === parseInt(selectedTerritorio)
        : true)
  );

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="overflow-x-auto relative mt-10">
      <div className="overflow-x-auto relative mt-10 bg-gray-900 p-6 rounded-lg shadow-lg">
        <div className="flex justify-center mt-5">
          {" "}
          <input
            type="text"
            placeholder="Buscar por nombre del equipo"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mb-4 p-3 rounded-lg border border-gray-600 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out w-1/3"
          />
        </div>
        <div className="flex flex-col items-center ">
          {" "}
          {/* Reducido el margen superior */}
          <select
            value={selectedArea}
            onChange={(e) => setSelectedArea(e.target.value)}
            className="mb-2 p-3 rounded-lg border border-gray-600 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out w-1/4"
          >
            <option value="" className="bg-gray-700 text-gray-300">
              Seleccione un área
            </option>
            {areas.map((area) => (
              <option
                key={area.id}
                value={area.id}
                className="bg-gray-700 text-gray-300"
              >
                {area.nombreArea}
              </option>
            ))}
          </select>
          <select
            value={selectedTerritorio}
            onChange={(e) => setSelectedTerritorio(e.target.value)}
            className="mb-4 p-3 rounded-lg border border-gray-600 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out w-1/4"
          >
            <option value="" className="bg-gray-700 text-gray-300">
              Seleccione un territorio
            </option>
            {territorios.map((territorio) => (
              <option
                key={territorio.id}
                value={territorio.id}
                className="bg-gray-700 text-gray-300"
              >
                {territorio.nombreTerritorio}
              </option>
            ))}
          </select>
        </div>
      </div>

      <table className="min-w-full bg-gray-900 text-white rounded-md shadow-md mt-4">
        <thead>
          <tr className="bg-gray-800">
            <th className="py-2 px-4 text-center">ID</th>
            <th className="py-2 px-4 text-center">Número SAP</th>
            <th className="py-2 px-4 text-center">Nombre del Equipo</th>
            <th className="py-2 px-4 text-center">Descripción</th>
            <th className="py-2 px-4 text-center">Territorio</th>
            <th className="py-2 px-4 text-center">Área</th>
            <th className="py-2 px-4 text-center">Reportes Abiertos</th>
            <th className="py-2 px-4 text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredEquipos.length > 0 ? (
            filteredEquipos.map((equipo) => (
              <tr key={equipo.id} className="border-b border-gray-700">
                <td className="py-2 px-4 text-center">{equipo.id}</td>
                <td className="py-2 px-4 text-center">{equipo.nroSap}</td>
                <td className="py-2 px-4 text-center">{equipo.nombreEquipo}</td>
                <td className="py-2 px-4 text-center">{equipo.descripcion}</td>
                <td className="py-2 px-4 text-center">
                  {equipo.nombreTerritorio}
                </td>
                <td className="py-2 px-4 text-center">{equipo.nombreArea}</td>
                <td className="py-2 px-4 text-center">
                  {equipo.reportesAbiertos}
                </td>
                <td className="py-2 px-4 text-center flex justify-center space-x-2">
                  <button className="bg-yellow-500 px-3 py-1 rounded-md hover:bg-yellow-400">
                    Editar
                  </button>
                  <button className="bg-red-500 px-3 py-1 rounded-md hover:bg-red-400">
                    Eliminar
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="py-4 px-4 text-center text-gray-400">
                No hay equipos disponibles.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default EquipoTable;
