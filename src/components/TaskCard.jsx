import { useContext } from "react";
import { TaskContext } from "../context/TaskContext";


function TaskCard({ task }) {
  const { deleteTask } = useContext(TaskContext);

  return (
    <div className="bg-gray-800 text-white p-4 rounded-md">
      <h1 className="text-xl font-bold capitalize">{task.title}</h1>
      <p className="text-gray-500 text-sm">{task.description}</p>
      {/* {task.image && <img src={task.image} alt={task.title} className="mt-2" />} Muestra la imagen */}
       {/*<img src="./img/img.jpeg" alt="Descripción de la imagen"/>*/}
      <button
        className="bg-red-500 px-2 py-1 rounded-md mt-4 hover:bg-red-400"
        onClick={() => deleteTask(task.id)}
      >
        Eliminar Peligro
      </button>
    </div>
  );
}


export default TaskCard;
