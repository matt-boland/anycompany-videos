/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createVideoPost = /* GraphQL */ `
  mutation CreateVideoPost(
    $input: CreateVideoPostInput!
    $condition: ModelVideoPostConditionInput
  ) {
    createVideoPost(input: $input, condition: $condition) {
      id
      description
      title
      thumbnailUrl
      authorName
      authorProfilePicUr
      videoUrl
      postDateTime
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const updateVideoPost = /* GraphQL */ `
  mutation UpdateVideoPost(
    $input: UpdateVideoPostInput!
    $condition: ModelVideoPostConditionInput
  ) {
    updateVideoPost(input: $input, condition: $condition) {
      id
      description
      title
      thumbnailUrl
      authorName
      authorProfilePicUr
      videoUrl
      postDateTime
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const deleteVideoPost = /* GraphQL */ `
  mutation DeleteVideoPost(
    $input: DeleteVideoPostInput!
    $condition: ModelVideoPostConditionInput
  ) {
    deleteVideoPost(input: $input, condition: $condition) {
      id
      description
      title
      thumbnailUrl
      authorName
      authorProfilePicUr
      videoUrl
      postDateTime
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
      id
      firstName
      lastName
      profilePicUrl
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
      id
      firstName
      lastName
      profilePicUrl
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
      id
      firstName
      lastName
      profilePicUrl
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
