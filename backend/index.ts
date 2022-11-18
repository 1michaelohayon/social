import { ApolloServer } from 'apollo-server-express'
require('express-async-errors')
import { makeExecutableSchema } from '@graphql-tools/schema';
import express from "express";
import http from "http";

import config from './utils/config';
import User from './models/user';
import jwt from 'jsonwebtoken';


import typeDefs from "./schema";
import resolvers from "./resolvers"
import { connectToDatabase } from "./utils/db"
import { execute, subscribe } from 'graphql';
import { SubscriptionServer } from 'subscriptions-transport-ws'
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';


interface JwtPayload {
  id: number
}




const start = async () => {
  await connectToDatabase()

  const app = express()
  const httpServer = http.createServer(app);

  const schema = makeExecutableSchema({ typeDefs, resolvers })

  const subscribtionServer = SubscriptionServer.create(
    { schema, execute, subscribe },
    { server: httpServer, path: '' }
  )



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
            subscribtionServer.close();
          },
        };
      }
    }
    ],
  });
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