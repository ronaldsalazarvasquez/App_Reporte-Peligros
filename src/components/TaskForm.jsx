import { useState, useContext } from "react";
import { TaskContext } from '../context/TaskContext';

function TaskForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const { createTask } = useContext(TaskContext);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validar que los campos no estén vacíos
    if (!title || !description) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    createTask({
      title,
      description,
      image,
    });

    // Limpiar los campos
    setTitle("");
    setDescription("");
    setImage(null);
    
    // Mostrar mensaje de éxito
    setSuccessMessage("Reporte creado con éxito. ¡Gracias a tu reporte, estás salvando vidas!");
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  return (
    <div className="flex items-center justify-center bg-gray-900">
      <div className="max-w-md w-full mt-10">
        <form onSubmit={handleSubmit} className="bg-slate-800 p-10 mb-4 rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold text-white mb-3 text-center">Reportar Peligro</h1>
          <input
            placeholder="Escribe el peligro"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            className="bg-slate-300 p-3 w-full mb-2 rounded"
            autoFocus
          />
          <textarea
            placeholder="Escribe la descripcion del peligro identificado"
            onChange={(e) => setDescription(e.target.value)}
            className="bg-slate-300 p-3 w-full mb-2 rounded"
            value={description}
          ></textarea>
          
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="bg-slate-300 p-3 w-full mb-2 rounded"
          />

          {image && (
            <img 
              src={image} 
              alt="Preview" 
              className="mt-2 w-full h-auto max-h-48 object-contain" 
            />
          )}

          <button
            type="submit"
            className="bg-indigo-500 px-3 py-1 text-white mr-2 mt-2 rounded mx-auto"
          >
            Guardar
          </button>
        </form>

        {/* Mostrar mensaje de éxito */}
        {successMessage && (
          <div className="bg-green-500 text-white p-3 rounded mt-4 text-center">
            {successMessage}
          </div>
        )}
      </div>
    </div>
  );
}

export default TaskForm;
