import { gql } from '@apollo/client';
import { MESSAGE, USER } from './fragments';

export const SIGN_IN = gql`
mutation Mutation($username: String!, $password: String!) {
  login(username: $username, password: $password) {
    value
  }
}
`


export const ADD_MESSAGE = gql`
mutation Mutation($content: String!, $reply: Int) {
  addMessage(content: $content, reply: $reply) {
    ...Message
  }
}
${MESSAGE}
`

export const SIGN_UP = gql`
mutation AddUser($username: String!, $name: String!, $password: String!) {
  addUser(username: $username, name: $name, password: $password) {
    ...User
  }
}
${USER}
`

export const ADD_LIKE =gql`
mutation AddLike($messageId: Int!) {
  addLike(messageId: $messageId) {
    ...Message
  }
}
${MESSAGE}
`

export const EDIT_USER = gql`
mutation Mutation($profileName: String) {
  editUser(profileName: $profileName) {
    ...User
  }
  ${USER}
}
`

export const FOLLOW_USER = gql`
mutation Mutation($userId: Int!) {
  follow(userId: $userId) {
    followerId
    userId
  }
}
`