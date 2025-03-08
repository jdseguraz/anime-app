'use client';
import Link from 'next/link';
import { FaHeart } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store/store';
import { useEffect, useState } from 'react';

const FloatingButton = () => {
  const [isMounted, setIsMounted] = useState(false);
  const favorites = useSelector((state: RootState) => state.favorites.favorites);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <Link href="/favorites">
        <button className="flex justify-center items-center fixed bottom-4 right-4 bg-blue-950 text-white p-4 rounded-full">
          <FaHeart className="text-red-500 text-xl mr-3" />
          All Favorites (0)
        </button>
      </Link>
    );
  }

  return (
    <Link href="/favorites">
      <button className="flex justify-center items-center fixed bottom-4 right-4 bg-blue-950 text-white p-4 rounded-full">
        <FaHeart className="text-red-500 text-xl mr-3" />
        All Favorites ({favorites.length})
      </button>
    </Link>
  );
};

export default FloatingButton;