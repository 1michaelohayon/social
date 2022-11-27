import { gql } from '@apollo/client';
import { MESSAGE, USER } from './fragments';


export const MESSAGE_ADDED = gql`
subscription Subscription {
  messageAdd {
    ...Message
    user {
      ...User
    }
  }
}
${MESSAGE}
${USER}
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
      user {
        ...User
      }
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

export const FIND_REPLIES = gql`
query Query($messageId: Int!) {
  findReplies(messageId: $messageId) {
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
}
${USER}
${MESSAGE}
`

export const SEARCH_MESSAGES = gql`
query Query($search: String!) {
  searchMessages(search: $search) {
    ...Message
    user {
      ...User
    }
    likedBy {
      user {
        ...User
      }
    }
  }
}
${MESSAGE}
${USER}
`