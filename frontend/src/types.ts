


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
  password: string
}

export interface Message {
  id: number,
  content: string,
  likes: number
}
