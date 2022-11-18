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