import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    domains: ['s4.anilist.co'], // Agrega el dominio aquí
    unoptimized: true, // Deshabilita la optimización de imágenes
  },
};

export default nextConfig;
