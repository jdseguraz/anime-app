import React from 'react';
import { render, screen } from '@testing-library/react';
import FloatingButton from './FloatingButton'; // Ajusta la ruta según tu estructura
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import favoritesReducer from '@/app/store/slices/favoritesSlices'; // Asegúrate de ajustar la ruta de importación

// Mock para Next.js Link component
jest.mock('next/link', () => {
    const MockLink = ({ children, href }: { children: React.ReactNode; href: string }) => {
      return <a href={href}>{children}</a>;
    };
    
    // Asignar un displayName al componente
    MockLink.displayName = 'MockLink';
    
    return MockLink;
});

// Mock para localStorage
const mockLocalStorage = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    clear: () => {
      store = {};
    }
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage
});

// Función para crear una tienda de prueba
const createTestStore = (initialFavorites: number[] = []) => {
  return configureStore({
    reducer: {
      favorites: favoritesReducer
    },
    preloadedState: {
      favorites: {
        favorites: initialFavorites
      }
    }
  });
};

describe('FloatingButton Component', () => {
  beforeEach(() => {
    // Limpiar localStorage antes de cada prueba
    mockLocalStorage.clear();
  });

  it('renders with correct number of favorites', () => {
    // Crear una tienda con 3 favoritos
    const store = createTestStore([1, 2, 3]);

    render(
      <Provider store={store}>
        <FloatingButton />
      </Provider>
    );

    // Verificar que el botón muestra el texto correcto
    expect(screen.getByText(/All Favorites \(3\)/)).toBeInTheDocument();
  });

  it('renders with zero favorites initially before mounting', () => {
    // Crear una tienda sin favoritos
    const store = createTestStore([]);

    render(
      <Provider store={store}>
        <FloatingButton />
      </Provider>
    );

    // Verificar que el botón muestra 0 favoritos
    expect(screen.getByText(/All Favorites \(0\)/)).toBeInTheDocument();
  });

  it('links to the favorites page', () => {
    const store = createTestStore([]);

    render(
      <Provider store={store}>
        <FloatingButton />
      </Provider>
    );

    // Verificar que el enlace apunta a la página de favoritos
    const button = screen.getByRole('button');
    const link = button.closest('a');
    expect(link).toHaveAttribute('href', '/favorites');
  });
});