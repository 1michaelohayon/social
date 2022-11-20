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
query Query {
  allMessages {
    content
    id
    likes
    userId
  }
}
`


export const GET_LOGGED_USER = gql`
query
  me {
  me {
    id
    name
    username
  }
}
`
