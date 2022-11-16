import { ApolloServer } from 'apollo-server'
require('express-async-errors')

import typeDefs from "./schema";
import resolvers from "./resolvers"
import { connectToDatabase } from "./utils/db"







const start = async () => {
  await connectToDatabase()
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  })

  server.listen().then(({ url }) => {
    console.log(`Server ready at ${url}`)
  })
}

start()