/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUserPersistedData = /* GraphQL */ `
  subscription OnCreateUserPersistedData(
    $filter: ModelSubscriptionUserPersistedDataFilterInput
  ) {
    onCreateUserPersistedData(filter: $filter) {
      id
      totalScore
      totalGames
      wins
      losses
      rank
      UserSessions {
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onUpdateUserPersistedData = /* GraphQL */ `
  subscription OnUpdateUserPersistedData(
    $filter: ModelSubscriptionUserPersistedDataFilterInput
  ) {
    onUpdateUserPersistedData(filter: $filter) {
      id
      totalScore
      totalGames
      wins
      losses
      rank
      UserSessions {
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onDeleteUserPersistedData = /* GraphQL */ `
  subscription OnDeleteUserPersistedData(
    $filter: ModelSubscriptionUserPersistedDataFilterInput
  ) {
    onDeleteUserPersistedData(filter: $filter) {
      id
      totalScore
      totalGames
      wins
      losses
      rank
      UserSessions {
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onCreateUserSession = /* GraphQL */ `
  subscription OnCreateUserSession(
    $filter: ModelSubscriptionUserSessionFilterInput
  ) {
    onCreateUserSession(filter: $filter) {
      id
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
    }
  }
`;
export const onUpdateUserSession = /* GraphQL */ `
  subscription OnUpdateUserSession(
    $filter: ModelSubscriptionUserSessionFilterInput
  ) {
    onUpdateUserSession(filter: $filter) {
      id
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
    }
  }
`;
export const onDeleteUserSession = /* GraphQL */ `
  subscription OnDeleteUserSession(
    $filter: ModelSubscriptionUserSessionFilterInput
  ) {
    onDeleteUserSession(filter: $filter) {
      id
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
    }
  }
`;
export const onCreateGameSession = /* GraphQL */ `
  subscription OnCreateGameSession(
    $filter: ModelSubscriptionGameSessionFilterInput
  ) {
    onCreateGameSession(filter: $filter) {
      id
      pinCode
      playerCount
      roundNumber
      roundPrompt
      currentRoundExpiration
      UserSessions {
        nextToken
        startedAt
      }
      playersResponded
      roundMode
      aiResponse
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onUpdateGameSession = /* GraphQL */ `
  subscription OnUpdateGameSession(
    $filter: ModelSubscriptionGameSessionFilterInput
  ) {
    onUpdateGameSession(filter: $filter) {
      id
      pinCode
      playerCount
      roundNumber
      roundPrompt
      currentRoundExpiration
      UserSessions {
        nextToken
        startedAt
      }
      playersResponded
      roundMode
      aiResponse
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onDeleteGameSession = /* GraphQL */ `
  subscription OnDeleteGameSession(
    $filter: ModelSubscriptionGameSessionFilterInput
  ) {
    onDeleteGameSession(filter: $filter) {
      id
      pinCode
      playerCount
      roundNumber
      roundPrompt
      currentRoundExpiration
      UserSessions {
        nextToken
        startedAt
      }
      playersResponded
      roundMode
      aiResponse
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
