'use client';
const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="w-full py-6 px-4 mt-auto bg-gray-800 text-white">
      <div className="container mx-auto flex flex-col md:flex-row justify-center items-center">
        <div className="mb-4 md:mb-0 mr-10">
          <p className="text-sm">© {currentYear} - Todos los derechos reservados</p>
        </div>
        
        <div className="flex items-center">
          <p className="text-sm">Desarrollado con ❤️ por <span className="font-bold">Juan David Segura Zabala</span></p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;