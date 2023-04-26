import { gql } from '@apollo/client';

export const MESSAGE = gql`
  fragment Message on Message {
    id
    content
    likes
    reply
  }
`

export const USER = gql`
  fragment User on User {
    id
    name
    username
    profileName
    pictureUrl
  }
`