/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUserPersistedData = /* GraphQL */ `
  query GetUserPersistedData($id: ID!) {
    getUserPersistedData(id: $id) {
      id
      _ttl
      username
      totalScore
      totalGames
      wins
      losses
      rank
      UserSessions {
        nextToken
        startedAt
        __typename
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
      __typename
    }
  }
`;
export const listUserPersistedData = /* GraphQL */ `
  query ListUserPersistedData(
    $filter: ModelUserPersistedDataFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUserPersistedData(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        _ttl
        username
        totalScore
        totalGames
        wins
        losses
        rank
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        owner
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const syncUserPersistedData = /* GraphQL */ `
  query SyncUserPersistedData(
    $filter: ModelUserPersistedDataFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncUserPersistedData(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        _ttl
        username
        totalScore
        totalGames
        wins
        losses
        rank
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        owner
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const getUserSession = /* GraphQL */ `
  query GetUserSession($id: ID!) {
    getUserSession(id: $id) {
      id
      _ttl
      eliminated
      currentRoundResponse
      totalScore
      totalGames
      wins
      losses
      gameSessionID
      userPersistedDataID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const listUserSessions = /* GraphQL */ `
  query ListUserSessions(
    $filter: ModelUserSessionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUserSessions(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        _ttl
        eliminated
        currentRoundResponse
        totalScore
        totalGames
        wins
        losses
        gameSessionID
        userPersistedDataID
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const syncUserSessions = /* GraphQL */ `
  query SyncUserSessions(
    $filter: ModelUserSessionFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncUserSessions(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        _ttl
        eliminated
        currentRoundResponse
        totalScore
        totalGames
        wins
        losses
        gameSessionID
        userPersistedDataID
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const userSessionsByGameSessionID = /* GraphQL */ `
  query UserSessionsByGameSessionID(
    $gameSessionID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelUserSessionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    userSessionsByGameSessionID(
      gameSessionID: $gameSessionID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        _ttl
        eliminated
        currentRoundResponse
        totalScore
        totalGames
        wins
        losses
        gameSessionID
        userPersistedDataID
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const userSessionsByUserPersistedDataID = /* GraphQL */ `
  query UserSessionsByUserPersistedDataID(
    $userPersistedDataID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelUserSessionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    userSessionsByUserPersistedDataID(
      userPersistedDataID: $userPersistedDataID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        _ttl
        eliminated
        currentRoundResponse
        totalScore
        totalGames
        wins
        losses
        gameSessionID
        userPersistedDataID
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const getGameSession = /* GraphQL */ `
  query GetGameSession($id: ID!) {
    getGameSession(id: $id) {
      id
      _ttl
      pinCode
      playerCount
      roundNumber
      roundPrompt
      currentRoundExpiration
      UserSessions {
        nextToken
        startedAt
        __typename
      }
      playersResponded
      roundMode
      aiResponse
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const listGameSessions = /* GraphQL */ `
  query ListGameSessions(
    $filter: ModelGameSessionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listGameSessions(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        _ttl
        pinCode
        playerCount
        roundNumber
        roundPrompt
        currentRoundExpiration
        playersResponded
        roundMode
        aiResponse
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const syncGameSessions = /* GraphQL */ `
  query SyncGameSessions(
    $filter: ModelGameSessionFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncGameSessions(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        _ttl
        pinCode
        playerCount
        roundNumber
        roundPrompt
        currentRoundExpiration
        playersResponded
        roundMode
        aiResponse
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
