import { useState, useContext, useEffect, useRef } from "react";
import { TaskContext } from "../context/TaskContext";
import { FaCamera, FaUpload } from "react-icons/fa";

function TaskForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const { createTask } = useContext(TaskContext);

  const [responsible, setResponsible] = useState("");
  const [territory, setTerritory] = useState({});
  const [area, setArea] = useState({});
  const [responsibles, setResponsibles] = useState([]);
  const [areas, setAreas] = useState([]);
  const [territories, setTerritories] = useState([]);

  // Estados y referencias para la cámara
  const [cameraOpen, setCameraOpen] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const fetchResponsibles = async () => {
      const response = await fetch(
        "http://localhost:8080/utp/reporteAPP/api/usuarios"
      );
      const data = await response.json();
      setResponsibles(data);
    };

    const fetchAreas = async () => {
      const response = await fetch(
        "http://localhost:8080/utp/reporteAPP/api/areas/all"
      );
      const data = await response.json();
      setAreas(data);
    };

    fetchResponsibles();
    fetchAreas();
  }, []);

  const handleAreaChange = async (e) => {
    const selectedAreaId = e.target.value;
    const selectedAreaObj = areas.find(
      (a) => a.id === parseInt(selectedAreaId)
    );
    setArea(selectedAreaObj);
    setTerritory({}); // Reiniciar el territorio seleccionado

    if (selectedAreaId) {
      const response = await fetch(
        `http://localhost:8080/utp/reporteAPP/api/territorios?idArea=${selectedAreaId}`
      );
      const data = await response.json();
      setTerritories(data);
    } else {
      setTerritories([]);
    }
  };

  const handleTerritoryChange = (e) => {
    const selectedTerritoryId = e.target.value;
    const selectedTerritoryObj = territories.find(
      (t) => t.id === parseInt(selectedTerritoryId)
    );
    setTerritory(selectedTerritoryObj);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !description || !responsible || !territory || !area) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    createTask({
      title,
      description,
      image,
      responsible,
      territory: {
        nombreTerritorio: territory.nombreTerritorio,
        id: territory.id,
      },
      area: {
        nombreArea: area.nombreArea,
        id: area.id,
      },
    });

    // Resetear campos del formulario
    setTitle("");
    setDescription("");
    setImage(null);
    setResponsible("");
    setTerritory({});
    setArea({});
    setSuccessMessage(
      "Reporte creado con éxito. ¡Gracias a tu reporte, estás salvando vidas!"
    );
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const openCamera = () => {
    setCameraOpen(true);
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      })
      .catch((error) => {
        console.error("Error al acceder a la cámara:", error);
        alert("No se pudo acceder a la cámara. Por favor, verifica los permisos.");
      });
  };

  const takePhoto = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;

    const context = canvas.getContext("2d");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    const photo = canvas.toDataURL("image/png");

    setImage(photo); // Guarda la foto en formato base64
    closeCamera();
  };

  const closeCamera = () => {
    const video = videoRef.current;
    const stream = video.srcObject;
    if (stream) {
      const tracks = stream.getTracks();
      tracks.forEach((track) => track.stop());
    }
    setCameraOpen(false);
  };

  return (
    <div className="flex items-center justify-center bg-gray-900 min-h-screen p-4">
      <div className="max-w-md w-full mt-10">
        <form
          onSubmit={handleSubmit}
          className="bg-slate-800 p-10 mb-4 rounded-lg shadow-lg"
        >
          <h1 className="text-2xl font-bold text-white mb-3 text-center">
            Reportar Peligro
          </h1>

          <input
            placeholder="Escribe el peligro"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            className="bg-slate-300 p-3 w-full mb-2 rounded"
            autoFocus
          />

          <textarea
            placeholder="Escribe la descripción del peligro identificado"
            onChange={(e) => setDescription(e.target.value)}
            className="bg-slate-300 p-3 w-full h-32 mb-2 rounded"
            value={description}
          ></textarea>

          <div className="flex items-center space-x-4 mb-4">
            <label className="flex items-center bg-slate-300 px-4 py-2 rounded cursor-pointer hover:bg-slate-400 transition duration-200">
              <FaUpload className="mr-2" />
              Subir Imagen
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>

            <button
              type="button"
              onClick={openCamera}
              className="flex items-center bg-blue-500 px-4 py-2 rounded hover:bg-blue-400 transition duration-200 text-white"
            >
              <FaCamera className="mr-2" />
              Tomar Foto
            </button>
          </div>

          {image && (
            <img
              src={image}
              alt="Preview"
              className="mt-2 w-full h-auto max-h-48 object-contain rounded-md border border-gray-700"
            />
          )}

          <label className="block text-white mt-4">Responsable de Cierre:</label>
          <select
            className="bg-slate-300 p-3 w-full mb-2 rounded"
            value={responsible}
            onChange={(e) => setResponsible(e.target.value)}
          >
            <option value="">Selecciona un responsable</option>
            {responsibles.map((resp) => (
              <option key={resp.id} value={`${resp.nombre} ${resp.apellidos}`}>
                {resp.nombre} {resp.apellidos}
              </option>
            ))}
          </select>

          <label className="block text-white mt-4">Área:</label>
          <select
            className="bg-slate-300 p-3 w-full mb-2 rounded"
            value={area.id || ""}
            onChange={handleAreaChange}
          >
            <option value="">Selecciona un área</option>
            {areas.map((a) => (
              <option key={a.id} value={a.id}>
                {a.nombreArea}
              </option>
            ))}
          </select>

          <label className="block text-white mt-4">Territorio:</label>
          <select
            className="bg-slate-300 p-3 w-full mb-2 rounded"
            value={territory.id || ""}
            onChange={handleTerritoryChange}
            disabled={!area.id}
          >
            <option value="">Selecciona un territorio</option>
            {territories.map((t) => (
              <option key={t.id} value={t.id}>
                {t.nombreTerritorio}
              </option>
            ))}
          </select>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-teal-500 text-white font-bold py-2 mt-6 rounded-lg hover:from-teal-500 hover:to-blue-500 transition duration-200"
          >
            Guardar
          </button>
        </form>

        {successMessage && (
          <div className="bg-green-500 text-white p-3 rounded mt-4 text-center">
            {successMessage}
          </div>
        )}
      </div>

      {cameraOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-4 rounded-lg">
            <video
              ref={videoRef}
              className="w-full h-auto rounded-md mb-4"
              autoPlay
            ></video>
            <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
            <div className="flex justify-center space-x-4">
              <button
                onClick={takePhoto}
                className="flex items-center bg-green-500 px-4 py-2 rounded-md text-white hover:bg-green-400 transition duration-200"
              >
                <FaCamera className="mr-2" />
                Tomar Foto
              </button>
              <button
                onClick={closeCamera}
                className="flex items-center bg-red-500 px-4 py-2 rounded-md text-white hover:bg-red-400 transition duration-200"
              >
                ✖ Cerrar Cámara
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TaskForm;
