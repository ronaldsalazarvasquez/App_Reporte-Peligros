import { createContext, useState, useEffect } from "react";
import { tasks as data } from "../data/tasks";

export const TaskContext = createContext();

export function TaskContextProvider(props) {
  const [tasks, setTasks] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Estado de autenticación

  function createTask(task) {
    setTasks([
      ...tasks,
      {
        title: task.title,
        id: tasks.length,
        description: task.description,
      },
    ]);
  }

  function deleteTask(taskId) {
    setTasks(tasks.filter((task) => task.id !== taskId));
  }

  function login(email, password) {
    // Credenciales de prueba
    const validEmail = "ronald@backus.com";
    const validPassword = "Rsv_7787";

    // Validar las credenciales
    if (email === validEmail && password === validPassword) {
      setIsAuthenticated(true); // Simulación de login exitoso
      return true; // Login exitoso
    }
    return false; // Login fallido
  }

  function logout() {
    setIsAuthenticated(false); // Cambiar el estado de autenticación al cerrar sesión
  }

  useEffect(() => {
    setTasks(data);
  }, []);

  return (
    <TaskContext.Provider
      value={{
        tasks,
        deleteTask,
        createTask,
        login, // Función de inicio de sesión
        logout, // Función de cierre de sesión
        isAuthenticated, // Estado de autenticación
      }}
    >
      {props.children}
    </TaskContext.Provider>
  );
}
