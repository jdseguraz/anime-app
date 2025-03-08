'use client';
import Image from 'next/image';

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center bg-transparent p-30">
      <Image
        src="/loading.gif"  // Asegúrate de que la imagen esté en la carpeta `public`
        alt="Loading..."
        width={200}
        height={200}
      />
      <p className="mt-4 text-lg font-semibold text-gray-900">Loading...</p>
    </div>
  );
};

export default Loading;