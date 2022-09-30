/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getVideoByGuid = /* GraphQL */ `
  query GetVideoByGuid($guid: String!) {
    getVideoByGuid(guid: $guid) {
      guid
      hlsUrl
    }
  }
`;
export const getVideoPost = /* GraphQL */ `
  query GetVideoPost($id: ID!) {
    getVideoPost(id: $id) {
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
export const listVideoPosts = /* GraphQL */ `
  query ListVideoPosts(
    $filter: ModelVideoPostFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listVideoPosts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const syncVideoPosts = /* GraphQL */ `
  query SyncVideoPosts(
    $filter: ModelVideoPostFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncVideoPosts(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
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
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const syncUsers = /* GraphQL */ `
  query SyncUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncUsers(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const listVideoOnDemands = /* GraphQL */ `
  query ListVideoOnDemands(
    $filter: TableVideoOnDemandFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listVideoOnDemands(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        guid
        hlsUrl
        srcVideo
        startTime
        endTime
        thumbNailsUrls
        srcMediainfo
      }
      nextToken
    }
  }
`;
