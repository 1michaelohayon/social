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
query Query($after: String) {
  allMessages(after: $after) {
    edges {
      node {
        id
        content
        likes
        likedBy {
          user {
            id
            name
          }
        }
        user {
          name
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

`


export const GET_LOGGED_USER = gql`
query Me {
  me {
    id
    name
    username
    profileName
    profilePicture
    likedMessages {
      message {
        id
      }
    }
  }
}
`

export const EDIT_USER = gql`
mutation Mutation($profileName: String) {
  editUser(profileName: $profileName) {
    profileName
    username
    profilePicture
    name
    id
  }
}
`


export const FIND_USER = gql`
query Query($profileName: String!) {
  findUser(profileName: $profileName) {
    id
    username
    name
    profileName
    profilePicture
    messages {
      content
      id
      likes
      likedBy {
        user {
          id
          name
          profileName
          profilePicture
        }
      }
    }
  }
}
`