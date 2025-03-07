'use client';
import { ApolloProvider } from '@apollo/client';
import client from './lib/apolloClient';
import { Provider } from 'react-redux';
import { store } from './store/store';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ApolloProvider client={client}>
      <Provider store={store}>{children}</Provider>
    </ApolloProvider>
  );
}