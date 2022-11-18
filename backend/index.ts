import { ApolloServer } from 'apollo-server-express'
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import { makeExecutableSchema } from '@graphql-tools/schema';
import express from "express";
import http from "http";

import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';

import config from './utils/config';
import jwt from 'jsonwebtoken';
import User from './models/user';


import typeDefs from "./schema";
import resolvers from "./resolvers"
import { connectToDatabase } from "./utils/db"


interface JwtPayload {
  id: number
}




const start = async () => {
  await connectToDatabase()

  const app = express()
  const httpServer = http.createServer(app);

  const schema = makeExecutableSchema({ typeDefs, resolvers })

  const wsServer = new WebSocketServer({
    server: httpServer,
    path: '/',
  });

  const serverCleanup = useServer({ schema }, wsServer);


  const server = new ApolloServer({
    schema,
    context: async ({ req }) => {
      const auth = req ? req.headers.authorization : null
      if (auth && auth.toLowerCase().startsWith('bearer ')) {
        const decodedToken = jwt.verify(
          auth.substring(7), config.SECRET
        ) as JwtPayload

        const currentUser = await User.findByPk(decodedToken.id)

        return { currentUser }
      } else return null
    },
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer }),
    {
      async serverWillStart() {
        return {
          async drainServer() {
            await serverCleanup.dispose()
          },
        }
      },
     },
    ],
  })

  await server.start()
  server.applyMiddleware({
    app,
    path: '/'
  })

  httpServer.listen(config.PORT, () =>
    console.log(`Server is now running on http://localhost:${config.PORT}`)
  )
}

start()