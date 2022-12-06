"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
const typeDefs = (0, apollo_server_1.gql) `
type User {
  id: ID!
  username: String!
  name: String!
  messages: [Message!]
  likedMessages: [LikedMessages!]
  profileName: String!
  pictureUrl: String
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
  reply: Int
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

  users(
    ids: [Int!]!
  ): [User!]

  findUser(
    profileName: String!
  ): User

  findReplies(
    messageId: Int!
  ): [Message!]

  searchMessages(
    search: String!
  ): [Message!]
}





type Mutation {
  addMessage(
    content: String!
    reply: Int
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
    pictureUrl: String
  ): User

  addLike(
     messageId: Int!
  ): Message

  follow(
    userId: Int!
  ): Followers
  
}

`;
exports.default = typeDefs;
