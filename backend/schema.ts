import { gql } from "apollo-server";



const typeDefs = gql`
type User {
  id: ID!
  username: String!
  name: String!
  messages: [Message!]
  likedMessages: [LikedMessages!]
  profileName: String!
  profilePicture: String
  followers: [Followers!]
  following: [Followers!]
}

type Followers {
  userId: Int!
  followerId: Int!
}

type LikedMessages {
  user: User
  message: Message
}

type Message {
  id: ID!
  content: String!
  likes: Int!
  userId: Int!
  user: User!
  likedBy: [LikedMessages!]
}

type Token { 
  value: String!
}

type Subscription {
  messageAdd: Message!
}

type PageInfo {
  hasNextPage: Boolean!
  hasPreviousPage: Boolean!
  startCursor: String!
  endCursor: String!
}

type Edge {
  cursor: String!
  node: Message!
}

type MessageConnection {
  edges: [Edge!]!
  pageInfo: PageInfo!
  totalCount: Int!
}


type Query {
  usersCount: Int!

  messagesCount: Int!

  me: User

  allMessages(
    after: String
  ): MessageConnection!

  allUsers: [User!]

  findUser(
    profileName: String!
  ): User
}





type Mutation {
  addMessage(
    content: String!
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

 editUser(
    profileName: String
    profilePicture: String
  ): User

  addLike(
     messageId: Int!
  ): Message

  follow(
    userId: Int!
  ): Followers
  
}

`
export default typeDefs