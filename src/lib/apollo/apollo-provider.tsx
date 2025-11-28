'use client';

import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import { ApolloProvider } from '@apollo/client/react';
import { PropsWithChildren, useMemo } from 'react';

export function ApolloClientProvider({ children }: PropsWithChildren) {
  const client = useMemo(() => {
    return new ApolloClient({
      cache: new InMemoryCache(),
      link: new HttpLink({
        uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
      }),
    });
  }, []);

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
