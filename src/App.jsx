import { ToastContainer } from 'react-toastify'; // Importa ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Importa los estilos de Toastify
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import Login from "./components/Login";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Monitoreo from "./components/Monitoreo";
import UserTable from "./components/UserTable";
import AreaList from "./components/AreaList";
import { useContext, useEffect, useState } from "react";
import { TaskContext } from "./context/TaskContext";
import TerritorioTable from './components/TerritorioTable';
import EquipoTable from './components/EquipoTable';

function App() {
  const { isAuthenticated, logout } = useContext(TaskContext);
  const [view, setView] = useState("login");

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
      case "Areas":
        return <AreaList />;
      case "Territorios":
        return <TerritorioTable />;
        case "Equipos":
      return <EquipoTable />;
      case "Usuarios":
        return (
          <div className="App justify-center">
            <h1 className="text-center text-2xl text-white font-bold mb-4">
              Lista de Usuarios
            </h1>
            <UserTable />
          </div>
        );
      case "login":
        return <Login />;
      default:
        return <Home />;
    }
  };

  return (
    <main className="bg-zinc-900 min-h-screen">
      <div className="w-full p-2">
        {isAuthenticated ? (
          <>
            <Navbar setView={setView} handleLogout={handleLogout} />
            {renderView()}
          </>
        ) : (
          <Login />
        )}
      </div>
      <ToastContainer /> {/* Añadimos aquí el ToastContainer */}
    </main>
  );
}

export default App;
