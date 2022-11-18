import { gql } from '@apollo/client';


export const GET_LOGGED_USER = gql`
query AllMessages {
  me {
    id
    name
    username
  }
}
`

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
query Query {
  allMessages {
    content
    id
    likes
    userId
  }
}
`
