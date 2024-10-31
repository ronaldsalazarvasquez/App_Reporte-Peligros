import TaskCard from "./TaskCard";
import { useContext } from "react";
import { TaskContext } from "../context/TaskContext";

function TaskList() {
  const { tasks } = useContext(TaskContext);

  return (
    <div className="container mx-auto p-4">
      {/* Contenido de la lista de tareas */}
      <main className="mt-4">
        {tasks.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[30vh] bg-gradient-to-r from-green-400 to-blue-500 rounded-lg shadow-lg p-6">
            <h1 className="text-white text-4xl font-bold text-center mb-2">
              🎉 Felicidades..!! no tienes peligros en tu territorio 🎉
            </h1>
            <p className="text-white text-lg text-center">
              ¡Sigue así y mantén tu entorno seguro!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-2">
            {tasks.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default TaskList;
