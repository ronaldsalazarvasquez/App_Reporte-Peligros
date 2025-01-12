import { useState, useContext } from "react";
import { TaskContext } from "../context/TaskContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useContext(TaskContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    const isValid = login(email, password);
    if (!isValid) {
      setError("Credenciales inválidas. Intenta de nuevo.");
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      {/* Sección izquierda con imagen de fondo */}
      <div className="lg:flex-1 bg-black relative overflow-hidden hidden lg:block">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/img/safety-background.jpg')",
          }}
        ></div>
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      {/* Sección derecha: Título estilizado de y formulario */}
      <div className="lg:w-1/3 w-full flex flex-col bg-gray-900 pt-12 px-6">
        <h1 className="text-4xl lg:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-300 drop-shadow-lg text-center mb-20">
          Portal de Reporte de Peligros
        </h1>

        {/* Formulario de inicio de sesión */}
        <div className="w-full max-w-sm mx-auto bg-white/10 backdrop-blur-md rounded-lg shadow-lg p-8 border border-gray-700">
          {/* Logo */}
          <img
            src="./img/login.png"
            alt="Logo"
            className="mx-auto mb-4 h-16 w-auto"
          />
          <h1 className="text-2xl font-bold text-center text-white mb-4">
            Iniciar Sesión
          </h1>
          {/* Mensaje de error */}
          {error && (
            <p className="text-red-500 text-center mb-4 bg-red-100/10 rounded-lg p-2">
              {error}
            </p>
          )}
          {/* Formulario */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="email"
                placeholder="Correo Electrónico"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className="bg-gray-800/50 text-white p-3 w-full rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                required
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Contraseña"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className="bg-gray-800/50 text-white p-3 w-full rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-3 rounded-lg transition duration-300 w-full font-semibold"
            >
              Iniciar Sesión
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
