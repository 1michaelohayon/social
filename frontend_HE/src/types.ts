


export interface Credentials {
  username: string,
  password: string
}



export interface UserContext {
  currentUser: {
    id: number,
    username: string,
    name: string
  }
}
export interface Edge {cursor: string, node: Message}



export interface NewUser {
  username: string,
  name: string,
  password: string
}

export interface Message { 
   id: string,
  content: string,
  likes: number
  createdAt: Date,
  updatedAt: Date,
  userId: number,
  user: User
  likedBy?: likedMessage[]
  reply?: number

}



export interface likedMessage {
  message?: Message;
  user?: User;
}
export interface Follower {
  userId?: number,
  followerId?: number
}

export interface User {
  id: number,
  username: string,
  name: string,
  profileName: string,
  pictureUrl?: string,
  createdAt: Date,
  updatedAt: Date,
  passwordHash: string,
  messages?: Message[],
  likedMessages?: likedMessage[],
  followers?: Follower[],
  following?: Follower[]

}