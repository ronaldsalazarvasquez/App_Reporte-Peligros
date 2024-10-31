import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import Login from "./components/Login";
import Home from "./components/Home"; 
import Navbar from "./components/Navbar";
import Monitoreo from "./components/Monitoreo";

import { useContext, useEffect, useState } from "react";
import { TaskContext } from "./context/TaskContext";

function App() {
  const { isAuthenticated, logout } = useContext(TaskContext);
  const [view, setView] = useState("login"); // Empieza en "login"

  // Cambia la vista a "home" automáticamente si el usuario está autenticado
  useEffect(() => {
    if (isAuthenticated) {
      setView("home");
    }
  }, [isAuthenticated]);

  const handleLogout = () => {
    logout();
    setView("login");
  };

  const renderView = () => {
    switch (view) {
      case "home":
        return <Home />;
      case "reportes":
        return <TaskList />;
      case "reportarPeligro":
        return <TaskForm />;
      case "monitoreo":
        return <Monitoreo />;
      case "login":
        return <Login />;
      default:
        return <Home />;
    }
  };

  return (
    <main className="bg-zinc-900 min-h-screen">
      <div className="container mx-auto p-10">
        {isAuthenticated ? (
          <>
            <Navbar setView={setView} handleLogout={handleLogout} /> {/* Cambiar vista y manejar logout */}
            {renderView()}
          </>
        ) : (
          <Login />
        )}
      </div>
    </main>
  );
}

export default App;
