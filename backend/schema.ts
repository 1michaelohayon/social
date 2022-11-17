import { gql } from "apollo-server";


const typeDefs = gql`
type User {
  id: ID!
  username: String!
  name: String!
}

type Message {
  id: ID!
  content: String!
  likes: Int!
  userId: Int!
}

type Token { 
  value: String!
}






type Query {
  usersCount: Int!
  messagesCount: Int!
  me: User
  allMessages: [Message!]
  allUsers: [User!]
}





type Mutation {
  addMessage(
    content: String!
    userId: Int!
  ): Message

  addUser(
    username: String!
    name: String!
    password: String!
  ): User

  login(
    username: String!
    password: String!
  ): Token

}

`
export default typeDefs