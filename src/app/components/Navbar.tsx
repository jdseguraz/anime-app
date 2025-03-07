'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Navbar = () => {
  const pathname = usePathname(); // Obtener la ruta actual

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/">
          <div className="flex items-center">
            <span className="text-white text-xl font-bold ml-2">Aninex</span>
          </div>
        </Link>

        {/* Enlaces de navegación */}
        <div className="flex space-x-4">
          <Link href="/">
            <span
              className={`text-white hover:text-gray-300 ${
                pathname === '/' ? 'font-bold underline' : ''
              }`}
            >
              Home
            </span>
          </Link>
          <Link href="/favorites">
            <span
              className={`text-white hover:text-gray-300 ${
                pathname === '/favorites' ? 'font-bold underline' : ''
              }`}
            >
              Favorites
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;