import { gql } from "apollo-server";

const typeDefs = gql`

type Query {
  usersCount: Int!
  messagesCount: Int!
}

`
export default typeDefs