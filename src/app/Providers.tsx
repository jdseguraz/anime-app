'use client';
import { ApolloProvider } from '@apollo/client';
import client from './lib/apolloClient';
import { Provider } from 'react-redux';
import { store } from './store/store';
import FloatingButton from './components/FloattingButton'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <Navbar/>
          <main className="flex-grow px-8 lg:px-40 py-10 min-h-screen">
            {children}
            <FloatingButton />
          </main>
        <Footer />
      </Provider>
    </ApolloProvider>
  );
}