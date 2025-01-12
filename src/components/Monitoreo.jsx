function Grafana() {
  return (
    <div className="flex flex-col items-center justify-center  bg-gray p-4">
      <h1 className="text-2xl font-bold mb-2 text-gray-200">
        Dashboard de cumplimiento
      </h1>
      <iframe
        //src="http://192.168.100.45:3000/d/ae94yxnq32kn4d/new-dashboard?orgId=1&from=now-6h&to=now&timezone=browser"
        src="https://snapshots.raintank.io/dashboard/snapshot/eJTDfLC2jjF1cj3sF22KhqNCQYg5fcFb"
        allowFullScreen
        title="Monitoreo de repotes"
        className="w-full h-[1000px] border-none shadow-lg"
      ></iframe>
      <footer className="mt-4 text-gray-600">
        <p>Dashboard de cumpliemiento de reportes</p>
      </footer>
    </div>
  );
}

export default Grafana;
