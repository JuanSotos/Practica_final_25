'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
// Asegúrate de que la ruta sea correcta según donde guardaste el archivo (ej: src/lib/auth.js)
import { isAuthenticated, getSpotifyAuthUrl } from '@/lib/auth'; 

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Usamos la función isAuthenticated de tu nuevo auth.js
    // Si devuelve true (token válido en localStorage), redirigimos al dashboard
    if (isAuthenticated()) {
      router.push('/dashboard');
    } else {
      setLoading(false);
    }
  }, [router]);

  const handleLogin = () => {
    // Tu función getSpotifyAuthUrl ya se encarga de:
    // 1. Generar el state aleatorio
    // 2. Guardarlo en localStorage
    // 3. Construir la URL completa
    const authUrl = getSpotifyAuthUrl();
    window.location.href = authUrl;
  };



  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4 bg-gradient-to-b from-zinc-900 to-black">
      <div className="max-w-md w-full bg-zinc-900/50 p-10 rounded-2xl shadow-2xl border border-zinc-800 text-center backdrop-blur-sm">
        
        <div className="mb-6 flex justify-center">
          <span className="text-6xl">🎶</span>
        </div>

        <h1 className="text-4xl font-bold mb-2 tracking-tighter">
          Spotify Taste Mixer
        </h1>
        
        <p className="text-zinc-400 mb-8 text-lg">
          Descubre tus estadísticas y mezcla tu música favorita.
        </p>

        <button
          onClick={handleLogin}
          className="w-full bg-[#1DB954] hover:bg-[#1ed760] text-black font-bold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg shadow-green-500/20 flex items-center justify-center gap-2"
        >
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor" ></svg>
          🎵 Iniciar sesión con Spotify 🎵
        </button>

        <p className="mt-6 text-xs text-zinc-600">
          Al continuar, aceptas dar acceso a tus datos públicos de Spotify.
        </p>
      </div>
    </main>
  );
}