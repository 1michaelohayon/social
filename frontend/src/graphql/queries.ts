import { gql } from '@apollo/client';



export const MESSAGE_ADDED = gql`
subscription Subscription {
  messageAdd {
    content
    id
    likes
    userId
  }
}
`

export const GET_MESSAGES = gql`
query AllMessages {
  allMessages {
    content
    id
    likes
    user {
      id
    }
  }
}
`


export const GET_LOGGED_USER = gql`
query Me {
  me {
    id
    name
    username
    likedMessages {
      message {
        id
      }
    }
  }
}
`

export const GET_USER_LIKED_MESSAGES = gql`
query Me {
  me {
    likedMessages {
      messageId
    }
  }
}
`