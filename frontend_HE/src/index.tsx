import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { setContext } from '@apollo/client/link/context'
import { getMainDefinition } from '@apollo/client/utilities'

import { relayStylePagination } from '@apollo/client/utilities';
import { createClient } from 'graphql-ws';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
  split
} from '@apollo/client'


const server = process.env.REACT_APP_SERVER || "https://small-wood-4274.fly.dev/"
const websocket = process.env.REACT_APP_WEBSOCKET || "=wss://small-wood-4274.fly.dev/"



const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('socialPlatformUserToken')
  return {
    headers: {
      ...headers,
      authorization: token ? `bearer ${token}` : null
    }
  }
})
const httpLink = new HttpLink({ uri: server })

const wsLink = new GraphQLWsLink(
  createClient({ url: websocket, })
)
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query)
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    )
  },
  wsLink,
  authLink.concat(httpLink)
)

const client = new ApolloClient({
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          allMessages: relayStylePagination()
        }
      }
    }
  }),
  link: splitLink
})


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);

