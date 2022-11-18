import Message from "./models/message"
import User from "./models/user"
import { AuthenticationError, UserInputError } from "apollo-server-core"
import jwt from "jsonwebtoken"
import config from "./utils/config"
import bcrypt from "bcrypt"
import { NewUser, NewMessage, Credentials, UserContext } from "./types"
import { PubSub } from "graphql-subscriptions"

const pubsub = new PubSub()


const resolvers = {
  Query: {
    me: (_root: undefined, _args: undefined, context: UserContext) => {
      return context.currentUser
    },
    usersCount: async () => User.count(),
    messagesCount: async () => Message.count(),

    allMessages: async () => {
      return Message.findAll()

    },
    allUsers: async () => {
      return User.findAll()
    }
  },


  Mutation: {
    login: async (_root: undefined, args: Credentials) => {
      const user = await User.findOne({ where: { username: args.username } })
      if (!user) {
        throw new UserInputError("User not found")
      }

      const password = await bcrypt.compare(args.password, user.dataValues.passwordHash)
      if (!password) {
        throw new UserInputError("Incorrect Password")
      }

      const userForToken = {
        id: user.dataValues.id,
        username: user.dataValues.username,
        name: user.dataValues.name
      }
      return { value: jwt.sign(userForToken, config.SECRET) }
    },


    addMessage: async (_root: undefined, args: NewMessage, context: UserContext) => {
      if (!context.currentUser) {
        throw new AuthenticationError("Not logged in")
      }
      const newMessage = {
        content: args.content,
        userId: context.currentUser.id,
        createdAt: new Date(),
        updatedAt: new Date()
      }
      const message = await Message.create(newMessage)
      await pubsub.publish("MESSAGE_ADDED", { messageAdd: message })
      return message
    },

    addUser: async (_root: undefined, args: NewUser) => {

      const passwordHash = await bcrypt.hash(args.password, 10)
      const newUser = {
        username: args.username,
        name: args.name,
        passwordHash: passwordHash,
        createdAt: new Date(),
        updatedAt: new Date()
      }
      return await User.create(newUser)
    },
  },
  Subscription: {
    messageAdd: {
      subscribe: () => pubsub.asyncIterator(['MESSAGE_ADDED']),
    },
  },
}


export default resolvers