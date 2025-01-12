import React, { useState } from "react";
import TaskList from "./TaskList";
import VideoPlayer from "./VideoPlayer";
import { ArrowRight, Shield, Book, AlertTriangle } from "lucide-react"; // inportacion de iconos

function Home() {
  const [showTaskList, setShowTaskList] = useState(false);

  const handleReportClick = () => {
    setShowTaskList(true);
  };

  return (
    <div className="bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 min-h-screen text-white">
      {/* Header con efecto de degradado */}
      <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-blue-500/20 to-transparent pointer-events-none" />

      {/* Contenido principal */}
      <main className="relative container mx-auto px-4 py-16 max-w-6xl">
        {showTaskList ? (
          <TaskList />
        ) : (
          <>
            {/* Sección Hero */}
            <div className="flex flex-col items-center text-center space-y-6 mb-16">
              <div className="inline-block p-2 bg-blue-500/10 rounded-full mb-4">
                <Shield className="w-8 h-8 text-blue-400" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                Territorio Seguro
              </h1>
              <p className="text-xl text-gray-300 max-w-2xl">
                Para que un territorio sea seguro no debe de existir peligros no
                identificados de esta manera aseguramos un ambiente de trabajo
                seguro garantizando que no ocurran accidentes.
              </p>
              <button
                onClick={handleReportClick}
                className="group relative inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-200 hover:scale-105"
              >
                ver los peligros en mi territorio
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* targetas informativas*/}
            <div className="grid md:grid-cols-3 gap-6 mb-16">
              {[
                {
                  title: "Monitoreo",
                  icon: <Book className="w-6 h-6" />,
                  description:
                    "Reportar peligros garantizando las 5s para la organización y seguridad del trabajo.",
                },
                {
                  title: "Cultura",
                  icon: <Shield className="w-6 h-6" />,
                  description:
                    "Fomentamos una cultura de seguridad en todos los niveles.",
                },
                {
                  title: "Gestión SIF",
                  icon: <AlertTriangle className="w-6 h-6" />,
                  description:
                    "Sistema Integral de Fatalidades para prevenir accidentes graves.",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700 hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10"
                >
                  <div className="bg-blue-500/10 w-12 h-12 flex items-center justify-center rounded-lg mb-4">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-gray-400">{item.description}</p>
                </div>
              ))}
            </div>

            {/* preguntas frecuentes*/}
            <section className="space-y-8">
              <h2 className="text-3xl font-bold text-center mb-8">
                Preguntas Frecuentes
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700 hover:border-blue-500/50 transition-all duration-300">
                  <h4 className="text-xl font-semibold mb-3">
                    ¿Que es un peligro?
                  </h4>
                  <p className="text-gray-400">
                    Un peligro es cualquier situación, condición o elemento que
                    tiene el potencial de causar daño, lesión o afectación a las
                    personas, al ambiente o a los bienes materiales.
                  </p>
                </div>
                <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700 hover:border-blue-500/50 transition-all duration-300">
                  <h4 className="text-xl font-semibold mb-3">
                    ¿Para que reportamos los peligros?
                  </h4>
                  <p className="text-gray-400">
                    Reportamos un peligro para prevenir accidentes y reducir
                    riesgos, protegiendo así la seguridad de los trabajadores,
                    la integridad de los equipos y el cumplimiento de normas de
                    seguridad.
                  </p>
                </div>
              </div>
            </section>

            {/* mostrar componete de video*/}
            <section className="mt-16">
              <h2 className="text-3xl font-bold text-center mb-8">
                Aprende más sobre seguridad
              </h2>
              <div className="flex justify-center">
                <VideoPlayer />
              </div>
            </section>

            {/* mostrar PDF de guia de monitoreo*/}
            <section className="mt-16">
              <h2 className="text-3xl font-bold text-center mb-8">
                GUIA DE MONITORERO
              </h2>
              <iframe
                src="https://cdn.www.gob.pe/uploads/document/file/3929426/Manual%20para%20Identificaci%C3%B3n%20de%20Peligros%20y%20Evaluaci%C3%B3n%20de%20Riesgos%20y%20Determinaci%C3%B3n%20de%20Controles%20-%20IPERC.pdf.pdf"
                allowFullScreen
                title="Guia de monitoreo de reportes"
                className="w-full h-[1000px] border-none shadow-lg"
              ></iframe>
            </section>
          </>
        )}
      </main>

      {/* decoracion de elementos */}
      <div className="fixed inset-0 -z-10 h-full w-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
    </div>
  );
}

export default Home;
