import Link from 'next/link';

const FloatingButton = () => {
  return (
    <Link href="/favorites">
      <button className="fixed bottom-4 right-4 bg-blue-500 text-white p-4 rounded-full">
        Favoritos
      </button>
    </Link>
  );
};

export default FloatingButton;