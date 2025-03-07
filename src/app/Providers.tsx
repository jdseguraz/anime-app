'use client';
import { ApolloProvider } from '@apollo/client';
import client from './lib/apolloClient';
import { Provider } from 'react-redux';
import { store } from './store/store';
import FloatingButton from './components/FloattingButton'
import Navbar from './components/Navbar'

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <Navbar/>
        {children}
        <FloatingButton/>
      </Provider>
    </ApolloProvider>
  );
}