'use client';
import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/">
          <div className="flex items-center">
            <span className="text-white text-xl font-bold ml-2">AnimeApp</span>
          </div>
        </Link>

        {/* Enlaces de navegación */}
        <div className="flex space-x-4">
          <Link href="/">
            <span className="text-white hover:text-gray-300">Inicio</span>
          </Link>
          <Link href="/favorites">
            <span className="text-white hover:text-gray-300">Favoritos</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;