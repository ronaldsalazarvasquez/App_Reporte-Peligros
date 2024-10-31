function Grafana() {
    return (
        <div className="flex flex-col items-center justify-center  bg-gray p-4">
            <h1 className="text-2xl font-bold mb-2 text-gray-200">Dashboard de cumplimiento</h1>
            <iframe 
                src="https://snapshots.raintank.io/dashboard/snapshot/lttAtgTxtPbfevxnvpyE97PNxM9oPWn4" 
                allowFullScreen 
                title="Monitoreo de repotes"
                className="w-full h-[700px] border-none shadow-lg" 
            ></iframe>
            <footer className="mt-4 text-gray-600">
                <p>Dashboard de cumpliemiento de reportes</p>
            </footer>
        </div>
    );
}

export default Grafana;
