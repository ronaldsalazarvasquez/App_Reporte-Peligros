import React, { useEffect, useState } from "react";
import UserForm from "./UserForm"; // Importa el UserForm

function UserTable() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); // Estado para manejar el texto de búsqueda

  useEffect(() => {
    fetchUsers(); // Llama a la función para obtener los usuarios al cargar el componente
  }, []);

  const fetchUsers = () => {
    fetch('http://localhost:8080/utp/reporteAPP/api/usuarios')
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al accesor al API');
        }
        return response.json();
      })
      .then(data => setUsers(data))
      .catch(error => setError(error));
  };

  const handleEditClick = (user) => {
    setSelectedUser(user);
    setIsEditing(true); // Activar el modo de edición
    setShowModal(true); // Muestra el modal para editar
  };

  const handleAddUserClick = () => {
    setSelectedUser(null); // No hay usuario seleccionado
    setIsEditing(false); // No estamos editando
    setShowModal(true); // Mostrar el formulario
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedUser(null);
    setIsEditing(false); // Resetear el estado al cerrar
  };

  const handleUserCreated = (newUser) => {
    setUsers((prev) => [...prev, newUser]); // Agrega el nuevo usuario a la lista
  };

  const handleUserUpdated = (updatedUser) => {
    setUsers((prev) => 
      prev.map(user => (user.id === updatedUser.id ? updatedUser : user))
    ); // Actualiza el usuario en la lista
  };

  const filteredUsers = users.filter(user =>
    user.nombre.toLowerCase().includes(searchTerm.toLowerCase()) || // Filtra por nombre
    user.apellidos.toLowerCase().includes(searchTerm.toLowerCase()) // Filtra por apellidos
  );

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="overflow-x-auto relative">
      <h2 className="text-white p-2">Buscador </h2>
      <input
        type="text"
        placeholder="Buscar por nombre o apellidos"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)} // Actualiza el estado del texto de búsqueda
        className="mb-4 p-2 rounded border border-gray-600 w-1/3"
      />
      <button 
        className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-full shadow-lg hover:bg-green-400 transition"
        onClick={handleAddUserClick} // Agregar el nuevo usuario
      >
        +
      </button>

      {/* Modal para el formulario de usuario */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-80">
          <div className="relative bg-gray-900 p-8 rounded-lg max-w-lg w-full border border-gray-700 shadow-lg">
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-red-500 focus:outline-none text-xl font-bold"
            >
              ✖
            </button>
            <UserForm 
              onUserCreated={handleUserCreated} 
              onUserUpdated={handleUserUpdated} 
              selectedUser={selectedUser} 
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
            <th className="py-2 px-4 text-center">Nombre</th>
            <th className="py-2 px-4 text-center">Apellidos</th>
            <th className="py-2 px-4 text-center">Rol</th>
            <th className="py-2 px-4 text-center">Correo</th>
            <th className="py-2 px-4 text-center">Teléfono</th>
            <th className="py-2 px-4 text-center">Estado</th>
            <th className="py-2 px-4 text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <tr key={user.id} className="border-b border-gray-700">
                <td className="py-2 px-4 text-center">{user.id}</td>
                <td className="py-2 px-4 text-center">{user.nombre}</td>
                <td className="py-2 px-4 text-center">{user.apellidos}</td>
                <td className="py-2 px-4 text-center">{user.rol}</td>
                <td className="py-2 px-4 text-center">{user.correo}</td>
                <td className="py-2 px-4 text-center">{user.telefono}</td>
                <td className="py-2 px-4 text-center">
                  {user.estado ? "Activo" : "Inactivo"}
                </td>
                <td className="py-2 px-4 text-center flex justify-center space-x-2">
                  <button 
                    className="bg-yellow-500 px-3 py-1 rounded-md hover:bg-yellow-400"
                    onClick={() => handleEditClick(user)} // Llama a la función para editar
                  >
                    Editar
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="py-4 px-4 text-center text-gray-400">
                No hay datos de usuarios.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default UserTable;
