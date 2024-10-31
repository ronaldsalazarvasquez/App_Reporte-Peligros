import React, { useState, useRef, useContext, useEffect } from 'react';
import { TaskContext } from '../context/TaskContext'; // Asegúrate de que la ruta sea correcta

function Narvar({ setView, handleLogout }) { // Agrega handleLogout como prop
    const { isAuthenticated } = useContext(TaskContext); // Usa el contexto
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
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="bg-gray-900 text-white">
            <header className="flex justify-between items-center p-4 bg-gray-800 h-16">
                <div className="text-2xl font-bold">BACKUS</div>
                <nav>
                    <ul className="flex items-center space-x-4">
                        <li className="hover:text-blue-500 transition duration-300">
                            <a href="#" onClick={() => setView("home")}>Home</a>
                        </li>
                        <li className="hover:text-blue-500 transition duration-300">
                            <a href="#" onClick={() => setView("reportes")}>Reportes</a>
                        </li>
                        <li className="hover:text-blue-500 transition duration-300">
                            <a href="#" onClick={() => setView("reportarPeligro")}>Reportar Peligro</a>
                        </li>
                        <li className="relative" ref={dropdownRef}>
                            <span
                                className="hover:text-blue-500 transition duration-300 cursor-pointer"
                                onClick={toggleDropdown}
                            >
                                Gestionar
                            </span>
                            {isDropdownOpen && (
                                <ul className="absolute left-0 mt-2 bg-gray-800 text-white rounded shadow-lg">
                                    <li className="px-4 py-2 hover:bg-gray-700">
                                        <a href="/usuarios">Usuarios</a>
                                    </li>
                                    <li className="px-4 py-2 hover:bg-gray-700">
                                        <a href="/areas">Áreas</a>
                                    </li>
                                    <li className="px-4 py-2 hover:bg-gray-700">
                                        <a href="/equipos">Equipos</a>
                                    </li>
                                    <li className="px-4 py-2 hover:bg-gray-700">
                                        <a href="/territorios">Territorios</a>
                                    </li>
                                </ul>
                            )}
                        </li>
                        <li className="hover:text-blue-500 transition duration-300">
                            <a href="#" onClick={() => setView("monitoreo")}>Monitoreo</a>
                        </li>
                        <li className="bg-green-500 text-white px-4 py-2 rounded hover:bg-blue-500">
                            <a href="#" onClick={isAuthenticated ? handleLogout : () => setView("login")}>
                                {isAuthenticated ? "Cerrar sesión" : "Iniciar sesión"}
                            </a>
                        </li>
                    </ul>
                </nav>
            </header>
        </div>
    );
}

export default Narvar;
