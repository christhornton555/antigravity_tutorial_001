import Image from "next/image";
import FlightSearch from "./components/FlightSearch";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-purple-500/20 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute top-[40%] -right-[10%] w-[40%] h-[40%] bg-sky-500/20 rounded-full blur-[100px] animate-pulse delay-1000"></div>
        <div className="absolute -bottom-[10%] left-[20%] w-[30%] h-[30%] bg-indigo-500/20 rounded-full blur-[80px] animate-pulse delay-2000"></div>
      </div>

      <div className="z-10 w-full max-w-4xl flex flex-col items-center gap-8">
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="relative w-32 h-32 md:w-40 md:h-40">
            <Image
              src="/logo.png"
              alt="SkyTrack Logo"
              fill
              className="object-contain drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]"
              priority
            />
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sky-300 via-white to-purple-300 tracking-tight">
            SkyTrack
          </h1>
          <p className="text-slate-400 text-lg">Real-time flight status at your fingertips</p>
        </div>

        <FlightSearch />
      </div>
    </main>
  );
}
