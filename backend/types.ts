
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


export interface NewUser {
  username: string,
  name: string,
  password: string,
  profileName: string,
  pictureUrl?: string

}

export interface NewMessage {
  content: string,
  reply?: number
}

export interface LikedMessagesSchema {
  message: MessageSchema,
  user: UserSchema
}

export interface FollowerSchema {
  userId: number,
  followerId: number
}

export interface UserSchema {
  id: number,
  username: string,
  name: string,
  profileName: string,
  pictureUrl?: string,
  createdAt: Date,
  updatedAt: Date,
  passwordHash: string,
  messages?: MessageSchema[],
  likedMessages?: LikedMessagesSchema[],
  followers?: FollowerSchema[],
  following?: FollowerSchema[]

}



export interface MessageSchema {
  id: number,
  content: string,
  likes: number
  createdAt: Date,
  updatedAt: Date,
  userId: number,
  user: UserSchema
  likedBy?: LikedMessagesSchema[]

  reply?: number
}
