import React, { useState, useRef, useContext, useEffect } from "react";
import { TaskContext } from "../context/TaskContext";
import { FaHome, FaListAlt, FaExclamationTriangle, FaCogs, FaChartLine, FaSignOutAlt } from "react-icons/fa";
import Avatar from "react-avatar";

function Navbar({ setView }) {
  const { isAuthenticated, currentUser, logout } = useContext(TaskContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="bg-gray-900 text-white">
      <header className="flex justify-between items-center p-4 bg-gray-800 h-16">
        {/* LOGO */}
        <div className="flex items-center space-x-4">
          <img src="/logo.png" alt="Logo" className="w-10 h-10" />
          <div className="text-2xl font-bold">SAFETY-REPORT</div>
        </div>

        {/* NAVIGATION */}
        <nav>
          <ul className="flex items-center space-x-8">
            <li className="flex items-center cursor-pointer hover:text-blue-400 transition" onClick={() => setView("home")}>
              <FaHome className="mr-2 text-xl" />
              <span>Inicio</span>
            </li>
            <li className="flex items-center cursor-pointer hover:text-blue-400 transition" onClick={() => setView("reportes")}>
              <FaListAlt className="mr-2 text-xl" />
              <span>Reportes</span>
            </li>
            <li className="flex items-center cursor-pointer hover:text-blue-400 transition" onClick={() => setView("reportarPeligro")}>
              <FaExclamationTriangle className="mr-2 text-xl" />
              <span>Reportar Peligro</span>
            </li>

            {/* Submenú Gestionar */}
            <li className="relative" ref={dropdownRef}>
              <div
                className="flex items-center cursor-pointer hover:text-blue-400 transition"
                onClick={toggleDropdown}
              >
                <FaCogs className="mr-2 text-xl" />
                <span>Gestionar</span>
              </div>

              {isDropdownOpen && (
                <ul className="absolute top-full left-0 bg-gray-800 text-white rounded-md shadow-lg mt-2 z-50 w-48">
                  <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer" onClick={() => setView("Usuarios")}>
                    Usuarios
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer" onClick={() => setView("Areas")}>
                    Áreas
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer" onClick={() => setView("Equipos")}>
                    Equipos
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer" onClick={() => setView("Territorios")}>
                    Territorios
                  </li>
                </ul>
              )}
            </li>

            <li className="flex items-center cursor-pointer hover:text-blue-400 transition" onClick={() => setView("monitoreo")}>
              <FaChartLine className="mr-2 text-xl" />
              <span>Monitoreo</span>
            </li>
          </ul>
        </nav>

        {/* USER INFO */}
        {isAuthenticated && currentUser && (
          <div className="flex items-center space-x-4">
            {/* Avatar dinámico */}
            <Avatar
              name={`${currentUser.nombre} ${currentUser.apellidos}`}
              email={currentUser.correo}
              size="40"
              round={true}
              color="#007bff" // Color predeterminado para el avatar
              fgColor="#fff" // Color del texto (iniciales)
            />
            <div className="text-sm">
              <div className="font-bold">{`${currentUser.nombre} ${currentUser.apellidos}`}</div>
              <div className="text-gray-400">{currentUser.correo}</div>
              <div className="text-blue-400">{`Rol: ${currentUser.rol}`}</div>
            </div>
            <button
              className="flex items-center bg-red-500 px-4 py-3 rounded hover:bg-red-400 text-white"
              onClick={logout}
            >
              <FaSignOutAlt className="mr-2 text-lg" />
              <span>Exit</span>
            </button>
          </div>
        )}
      </header>
    </div>
  );
}

export default Navbar;
