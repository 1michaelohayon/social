import { gql } from '@apollo/client';
import { MESSAGE, USER } from './fragments';


export const MESSAGE_ADDED = gql`
subscription Subscription {
  messageAdd {
    ...Message
  }
}
${MESSAGE}
`

export const GET_MESSAGES = gql`
query Query($after: String) {
  allMessages(after: $after) {
    edges {
      node {
        ...Message
        likedBy {
          user {
            ...User
          }
        }
        user {
         ...User
        }
      }
      cursor
    }
    totalCount
    pageInfo {
      endCursor
      hasNextPage
      hasPreviousPage
      startCursor
    }
  }
}
${MESSAGE}
${USER}
`


export const GET_LOGGED_USER = gql`
query Me {
  me {
    ...User
    likedMessages {
      message {
        ...Message
      }
    }
  }
}
${USER}
${MESSAGE}
`




export const FIND_USER = gql`
query Query($profileName: String!) {
  findUser(profileName: $profileName) {
    ...User
    messages {
      ...Message
    }
    followers {
      followerId
    }
    following {
      userId
    }
  }
}
${USER}
${MESSAGE}
`