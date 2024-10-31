import { useState, useContext } from "react";
import { TaskContext } from "../context/TaskContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login, isAuthenticated } = useContext(TaskContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    
    const isValid = login(email, password);
    if (!isValid) {
      setError("Credenciales inválidas. Intenta de nuevo.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      <div className="max-w-md w-full bg-white/10 backdrop-blur-md rounded-lg shadow-lg p-8 border border-gray-700">
        <img 
          src="./img/login.png" 
          alt="Logo"
          className="mx-auto mb-4 h-20 w-auto"
        />
        <h1 className="text-2xl font-bold text-center text-white mb-4">Iniciar Sesión</h1>
        {error && <p className="text-red-500 text-center mb-4 bg-red-100/10 rounded-lg p-2">{error}</p>}
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

      {/* Decoracion de elementos */}
      <div className="fixed inset-0 -z-10 h-full w-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
    </div>
  );
}

export default Login;
