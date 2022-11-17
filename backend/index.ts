import { ApolloServer } from 'apollo-server'
require('express-async-errors')
import { makeExecutableSchema } from '@graphql-tools/schema';

import config from './utils/config';
import User from './models/user';
import jwt from 'jsonwebtoken';


import typeDefs from "./schema";
import resolvers from "./resolvers"
import { connectToDatabase } from "./utils/db"


interface JwtPayload {
  id: number
}


const start = async () => {
  await connectToDatabase()
  
  const schema = makeExecutableSchema({ typeDefs, resolvers })
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
    }
  })

  server.listen().then(({ url }) => {
    console.log(`Server ready at ${url}`)
  })
}

start()