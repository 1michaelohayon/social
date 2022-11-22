import models from "./models"
import { AuthenticationError, UserInputError } from "apollo-server-core"
import jwt from "jsonwebtoken"
import config from "./utils/config"
import bcrypt from "bcrypt"
import { NewUser, NewMessage, Credentials, UserContext } from "./types"
import { PubSub } from "graphql-subscriptions"
const pubsub = new PubSub()

const { User, Message, likedMessages } = models;

const resolvers = {
  Query: {
    me: (_root: undefined, _args: undefined, context: UserContext) => {
      return context.currentUser
    },
    usersCount: async () => User.count(),
    messagesCount: async () => Message.count(),


    allMessages: async (_root: undefined, args: { after: string }) => {
      const messages = await Message.paginate({
        include: [
          { model: User, as: "user" },
          { model: likedMessages, as: "likedBy", include: [{ model: User, as: "user" }] },
        ],
        limit: 5,
        after: args.after,
      })
      return messages
    },


    allUsers: async () => {
      const users = await User.findAll({
        include: [
          { model: Message},
          { model: likedMessages, include: [{ model: Message, as: "message" }] },
        ]
      })

      return users
    },

    findUser: async (_root: undefined, args: { profileName: string }) => {
      const user = await User.findOne({
        where: { profileName: args.profileName },
        include: [
          { model: Message},
        ]
      })
      if (!user) {
        throw new UserInputError("User not found")
      }
      return user
    },
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

    addLike: async (_root: undefined, args: { messageId: number }, context: UserContext) => {

      if (!context.currentUser) {
        throw new AuthenticationError("Not logged in")

      }
      const message: any = await Message.findByPk(args.messageId)
      if (!message) {
        throw new UserInputError("Message not found")
      }
      try {
        await likedMessages.create({ messageId: args.messageId, userId: context.currentUser.id })
        message.likes = message.likes + 1
        const saved = message.save()

        return await saved
      } catch (error) {
        console.log(error);
      }
    },

    addUser: async (_root: undefined, args: NewUser) => {
      const passwordHash = await bcrypt.hash(args.password, 10)
      const profileName = args.profileName ? args.profileName : args.username
      const newUser = {
        username: args.username,
        name: args.name,
        passwordHash: passwordHash,
        profileName: profileName,
        createdAt: new Date(),
        updatedAt: new Date()
      }
      return await User.create(newUser)
    },

    editUser: async (_root: undefined, args: {profileName: string, pictureUrl: string}, context: UserContext) => {
      if (!context.currentUser) {
        throw new AuthenticationError("Not logged in")
      }
      const user = await User.findByPk(context.currentUser.id)
      if (!user) {
        throw new UserInputError("User not found")
      }
      
      const updatedUser = {
        profileName: args.profileName,
        pictureUrl: args.pictureUrl,
        updatedAt: new Date()
      }
      return await user.update(updatedUser)
    }
  },
  Subscription: {
    messageAdd: {
      subscribe: () => pubsub.asyncIterator(['MESSAGE_ADDED']),
    },
  },
}


export default resolvers