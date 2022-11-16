import Message from "./models/message"
import User from "./models/user"

const resolvers = {
  Query :{
    usersCount: async () => User.count(),
    messagesCount: async () => Message.count()
  }
}


export default resolvers