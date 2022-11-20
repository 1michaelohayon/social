import { gql } from '@apollo/client';


export const SIGN_IN = gql`
mutation Mutation($username: String!, $password: String!) {
  login(username: $username, password: $password) {
    value
  }
}
`


export const ADD_MESSAGE = gql`
mutation Mutation($content: String!) {
  addMessage(content: $content) {
    id
    content
    likes
    userId
  }
}
`

export const SIGN_UP = gql`
mutation AddUser($username: String!, $name: String!, $password: String!) {
  addUser(username: $username, name: $name, password: $password) {
    id
    username
    name
  }
}
`

export const ADD_LIKE =gql`
mutation AddLike($messageId: Int!) {
  addLike(messageId: $messageId) {
    id
    content
    likes
    userId
  }
}
`