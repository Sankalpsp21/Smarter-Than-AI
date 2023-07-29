/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUserPersistedData = /* GraphQL */ `
  subscription OnCreateUserPersistedData(
    $filter: ModelSubscriptionUserPersistedDataFilterInput
    $owner: String
  ) {
    onCreateUserPersistedData(filter: $filter, owner: $owner) {
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
export const onUpdateUserPersistedData = /* GraphQL */ `
  subscription OnUpdateUserPersistedData(
    $filter: ModelSubscriptionUserPersistedDataFilterInput
    $owner: String
  ) {
    onUpdateUserPersistedData(filter: $filter, owner: $owner) {
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
export const onDeleteUserPersistedData = /* GraphQL */ `
  subscription OnDeleteUserPersistedData(
    $filter: ModelSubscriptionUserPersistedDataFilterInput
    $owner: String
  ) {
    onDeleteUserPersistedData(filter: $filter, owner: $owner) {
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
export const onCreateUserSession = /* GraphQL */ `
  subscription OnCreateUserSession(
    $filter: ModelSubscriptionUserSessionFilterInput
    $owner: String
  ) {
    onCreateUserSession(filter: $filter, owner: $owner) {
      id
      _ttl
      eliminated
      currentRoundResponse
      currentVoteResponse
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
      owner
      __typename
    }
  }
`;
export const onUpdateUserSession = /* GraphQL */ `
  subscription OnUpdateUserSession(
    $filter: ModelSubscriptionUserSessionFilterInput
    $owner: String
  ) {
    onUpdateUserSession(filter: $filter, owner: $owner) {
      id
      _ttl
      eliminated
      currentRoundResponse
      currentVoteResponse
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
      owner
      __typename
    }
  }
`;
export const onDeleteUserSession = /* GraphQL */ `
  subscription OnDeleteUserSession(
    $filter: ModelSubscriptionUserSessionFilterInput
    $owner: String
  ) {
    onDeleteUserSession(filter: $filter, owner: $owner) {
      id
      _ttl
      eliminated
      currentRoundResponse
      currentVoteResponse
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
      owner
      __typename
    }
  }
`;
export const onCreateGameSession = /* GraphQL */ `
  subscription OnCreateGameSession(
    $filter: ModelSubscriptionGameSessionFilterInput
    $owner: String
  ) {
    onCreateGameSession(filter: $filter, owner: $owner) {
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
      owner
      __typename
    }
  }
`;
export const onUpdateGameSession = /* GraphQL */ `
  subscription OnUpdateGameSession(
    $filter: ModelSubscriptionGameSessionFilterInput
    $owner: String
  ) {
    onUpdateGameSession(filter: $filter, owner: $owner) {
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
      owner
      __typename
    }
  }
`;
export const onDeleteGameSession = /* GraphQL */ `
  subscription OnDeleteGameSession(
    $filter: ModelSubscriptionGameSessionFilterInput
    $owner: String
  ) {
    onDeleteGameSession(filter: $filter, owner: $owner) {
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
      owner
      __typename
    }
  }
`;
