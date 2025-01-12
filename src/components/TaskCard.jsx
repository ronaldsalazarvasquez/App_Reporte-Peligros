import { useContext, useState } from "react";
import { TaskContext } from "../context/TaskContext";

function TaskCard({ task }) {
  const { deleteTask } = useContext(TaskContext);
  const [showModal, setShowModal] = useState(false);

  const handleCardClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <div
        className="bg-gray-800 text-white p-4 rounded-md cursor-pointer"
        onClick={handleCardClick}
      >
        <h1 className="text-xl font-bold capitalize">{task.title}</h1>
        <p className="text-gray-500 text-sm">{task.description}</p>
        <button
          className="bg-red-500 px-2 py-1 rounded-md mt-4 hover:bg-red-400"
          onClick={(e) => {
            e.stopPropagation(); // Evitar que el clic elimine el modal
            deleteTask(task.id);
          }}
        >
          Eliminar Peligro
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-80">
          <div className="relative bg-gray-900 rounded-lg max-w-4xl w-full max-h-[90vh] p-8 border border-gray-700 shadow-lg overflow-hidden">
            {/* Botón de cerrar (X) */}
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-red-500 focus:outline-none text-xl font-bold"
            >
              ✖
            </button>

            {/* Título */}
            <h2 className="text-3xl text-white font-extrabold mb-6 text-center tracking-wide">
              {task.title}
            </h2>

            {/* Contenido con desplazamiento */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 overflow-y-auto max-h-[75vh] pr-4">
              {/* Columna izquierda: Imagen */}
              <div>
                <img
                  src={task.img}
                  alt="Descripción de la imagen"
                  className="w-full rounded-md border border-gray-700 shadow-md"
                />
              </div>

              {/* Columna derecha: Descripción y datos relacionados */}
              <div className="flex flex-col justify-between">
                {/* Recuadro alrededor de la descripción */}
                <div className="p-4 border border-gray-100 rounded-lg bg-gray-800">
                  <p className="text-gray-300 text-justify leading-relaxed">
                    {task.description}
                  </p>
                </div>

                {/* Datos relacionados */}
                <ul className="space-y-4 mt-6">
                  <li className="flex items-center">
                    <span className="font-semibold text-gray-200">
                      RESPONSABLE DE CIERRE:
                    </span>
                    <span className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-full inline-block shadow-md">
                      {task.Responsable_cierre}
                    </span>
                  </li>

                  <li className="flex items-center">
                    <span className="font-semibold text-gray-200">
                      AREA REPORTADA:
                    </span>
                    <span className="ml-2 bg-green-500 text-white px-4 py-2 rounded-full inline-block shadow-md">
                      {task.Area}
                    </span>
                  </li>

                  <li className="flex items-center">
                    <span className="font-semibold text-gray-200">
                      TERRITORIO:
                    </span>
                    <span className="ml-2 bg-red-500 text-white px-4 py-2 rounded-full inline-block shadow-md">
                      {task.Territorio}
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Botón de cerrar (grande) */}
            <button
              className="w-full bg-gradient-to-r from-blue-500 to-teal-500 text-white font-bold py-2 mt-6 rounded-lg hover:from-teal-500 hover:to-blue-500 transition duration-200"
              onClick={handleCloseModal}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default TaskCard;
