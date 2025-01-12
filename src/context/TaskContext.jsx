import { createContext, useState, useEffect } from "react";
import { tasks as data } from "../data/tasks";
import { users } from "../data/users";

export const TaskContext = createContext();

export function TaskContextProvider(props) {
  const [tasks, setTasks] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Estado de autenticación
  const [currentUser, setCurrentUser] = useState(null); // Almacenar el usuario actual

  useEffect(() => {
    setTasks(data); // Cargar tareas iniciales
  }, []);

  function createTask(task) {
    setTasks((prevTasks) => [
      ...prevTasks,
      {
        title: task.title,
        id: prevTasks.length,
        description: task.description,
        Responsable_cierre: task.responsible,
        Area: task.area.nombreArea,
        Territorio: task.territory.nombreTerritorio,
        img: task.image,
      },
    ]);
  }

  function deleteTask(taskId) {
    setTasks(tasks.filter((task) => task.id !== taskId));
  }

  function login(email, password) {
    const user = users.find(
      (user) =>
        user.correo === email &&
        user.passwd === password &&
        user.estado === true
    );

    if (user) {
      setIsAuthenticated(true); // Login exitoso
      setCurrentUser(user); // Guardar el usuario actual
      return true;
    }
    return false; // Login fallido
  }

  function logout() {
    setIsAuthenticated(false); // Cambiar el estado de autenticación
    setCurrentUser(null); // Limpiar el usuario actual
  }

  function getVisibleTasks() {
    if (!isAuthenticated || !currentUser) return []; // No hay tareas si no está autenticado

    // Filtrar tareas según el rol del usuario
    if (currentUser.rol === "ADMINISTRADOR") {
      return tasks; // El administrador ve todas las tareas
    } else {
      // Los supervisores y operadores solo ven sus tareas
      return tasks.filter(
        (task) =>
          task.Responsable_cierre === `${currentUser.nombre} ${currentUser.apellidos}`
      );
    }
  }

  return (
    <TaskContext.Provider
      value={{
        tasks: getVisibleTasks(), // Usar el filtrado de tareas
        deleteTask,
        createTask,
        login,
        logout,
        isAuthenticated,
        currentUser, // Proveer el usuario actual si es necesario
      }}
    >
      {props.children}
    </TaskContext.Provider>
  );
}
