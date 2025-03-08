'use client';
import Image from 'next/image';

const NoResults = ({ text }: { text: string }) => {
  return (
    <div className="flex flex-col items-center justify-center bg-transparent">
      <Image
        src="/noresults.gif"  // Asegúrate de que la imagen esté en la carpeta `public`
        alt="Loading..."
        width={150}
        height={150}
      />
      <p className="mt-4 text-lg font-semibold text-gray-900">{text}</p>
    </div>
  );
};

export default NoResults;