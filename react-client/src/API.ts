/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateUserPersistedDataInput = {
  id?: string | null,
  username: string,
  totalScore: number,
  totalGames: number,
  wins: number,
  losses: number,
  rank: number,
  _version?: number | null,
};

export type ModelUserPersistedDataConditionInput = {
  username?: ModelStringInput | null,
  totalScore?: ModelIntInput | null,
  totalGames?: ModelIntInput | null,
  wins?: ModelIntInput | null,
  losses?: ModelIntInput | null,
  rank?: ModelIntInput | null,
  and?: Array< ModelUserPersistedDataConditionInput | null > | null,
  or?: Array< ModelUserPersistedDataConditionInput | null > | null,
  not?: ModelUserPersistedDataConditionInput | null,
  _deleted?: ModelBooleanInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type ModelIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type ModelBooleanInput = {
  ne?: boolean | null,
  eq?: boolean | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type UserPersistedData = {
  __typename: "UserPersistedData",
  id: string,
  username: string,
  totalScore: number,
  totalGames: number,
  wins: number,
  losses: number,
  rank: number,
  UserSessions?: ModelUserSessionConnection | null,
  createdAt: string,
  updatedAt: string,
  _version: number,
  _deleted?: boolean | null,
  _lastChangedAt: number,
  owner?: string | null,
};

export type ModelUserSessionConnection = {
  __typename: "ModelUserSessionConnection",
  items:  Array<UserSession | null >,
  nextToken?: string | null,
  startedAt?: number | null,
};

export type UserSession = {
  __typename: "UserSession",
  id: string,
  eliminated: boolean,
  currentRoundResponse: string,
  totalScore: number,
  totalGames: number,
  wins: number,
  losses: number,
  gameSessionID: string,
  userPersistedDataID?: string | null,
  createdAt: string,
  updatedAt: string,
  _version: number,
  _deleted?: boolean | null,
  _lastChangedAt: number,
};

export type UpdateUserPersistedDataInput = {
  id: string,
  username?: string | null,
  totalScore?: number | null,
  totalGames?: number | null,
  wins?: number | null,
  losses?: number | null,
  rank?: number | null,
  _version?: number | null,
};

export type DeleteUserPersistedDataInput = {
  id: string,
  _version?: number | null,
};

export type CreateUserSessionInput = {
  id?: string | null,
  eliminated: boolean,
  currentRoundResponse: string,
  totalScore: number,
  totalGames: number,
  wins: number,
  losses: number,
  gameSessionID: string,
  userPersistedDataID?: string | null,
  _version?: number | null,
};

export type ModelUserSessionConditionInput = {
  eliminated?: ModelBooleanInput | null,
  currentRoundResponse?: ModelStringInput | null,
  totalScore?: ModelIntInput | null,
  totalGames?: ModelIntInput | null,
  wins?: ModelIntInput | null,
  losses?: ModelIntInput | null,
  gameSessionID?: ModelIDInput | null,
  userPersistedDataID?: ModelIDInput | null,
  and?: Array< ModelUserSessionConditionInput | null > | null,
  or?: Array< ModelUserSessionConditionInput | null > | null,
  not?: ModelUserSessionConditionInput | null,
  _deleted?: ModelBooleanInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type UpdateUserSessionInput = {
  id: string,
  eliminated?: boolean | null,
  currentRoundResponse?: string | null,
  totalScore?: number | null,
  totalGames?: number | null,
  wins?: number | null,
  losses?: number | null,
  gameSessionID?: string | null,
  userPersistedDataID?: string | null,
  _version?: number | null,
};

export type DeleteUserSessionInput = {
  id: string,
  _version?: number | null,
};

export type CreateGameSessionInput = {
  id?: string | null,
  pinCode: number,
  playerCount: number,
  roundNumber: number,
  roundPrompt: string,
  currentRoundExpiration: string,
  playersResponded: number,
  roundMode: RoundMode,
  aiResponse: string,
  _version?: number | null,
};

export enum RoundMode {
  PROMPT = "PROMPT",
  PLAY = "PLAY",
  VOTE = "VOTE",
  MESSAGE = "MESSAGE",
  WIN = "WIN",
  LOSE = "LOSE",
}


export type ModelGameSessionConditionInput = {
  pinCode?: ModelIntInput | null,
  playerCount?: ModelIntInput | null,
  roundNumber?: ModelIntInput | null,
  roundPrompt?: ModelStringInput | null,
  currentRoundExpiration?: ModelStringInput | null,
  playersResponded?: ModelIntInput | null,
  roundMode?: ModelRoundModeInput | null,
  aiResponse?: ModelStringInput | null,
  and?: Array< ModelGameSessionConditionInput | null > | null,
  or?: Array< ModelGameSessionConditionInput | null > | null,
  not?: ModelGameSessionConditionInput | null,
  _deleted?: ModelBooleanInput | null,
};

export type ModelRoundModeInput = {
  eq?: RoundMode | null,
  ne?: RoundMode | null,
};

export type GameSession = {
  __typename: "GameSession",
  id: string,
  pinCode: number,
  playerCount: number,
  roundNumber: number,
  roundPrompt: string,
  currentRoundExpiration: string,
  UserSessions?: ModelUserSessionConnection | null,
  playersResponded: number,
  roundMode: RoundMode,
  aiResponse: string,
  createdAt: string,
  updatedAt: string,
  _version: number,
  _deleted?: boolean | null,
  _lastChangedAt: number,
};

export type UpdateGameSessionInput = {
  id: string,
  pinCode?: number | null,
  playerCount?: number | null,
  roundNumber?: number | null,
  roundPrompt?: string | null,
  currentRoundExpiration?: string | null,
  playersResponded?: number | null,
  roundMode?: RoundMode | null,
  aiResponse?: string | null,
  _version?: number | null,
};

export type DeleteGameSessionInput = {
  id: string,
  _version?: number | null,
};

export type ModelUserPersistedDataFilterInput = {
  id?: ModelIDInput | null,
  username?: ModelStringInput | null,
  totalScore?: ModelIntInput | null,
  totalGames?: ModelIntInput | null,
  wins?: ModelIntInput | null,
  losses?: ModelIntInput | null,
  rank?: ModelIntInput | null,
  and?: Array< ModelUserPersistedDataFilterInput | null > | null,
  or?: Array< ModelUserPersistedDataFilterInput | null > | null,
  not?: ModelUserPersistedDataFilterInput | null,
  _deleted?: ModelBooleanInput | null,
};

export type ModelUserPersistedDataConnection = {
  __typename: "ModelUserPersistedDataConnection",
  items:  Array<UserPersistedData | null >,
  nextToken?: string | null,
  startedAt?: number | null,
};

export type ModelUserSessionFilterInput = {
  id?: ModelIDInput | null,
  eliminated?: ModelBooleanInput | null,
  currentRoundResponse?: ModelStringInput | null,
  totalScore?: ModelIntInput | null,
  totalGames?: ModelIntInput | null,
  wins?: ModelIntInput | null,
  losses?: ModelIntInput | null,
  gameSessionID?: ModelIDInput | null,
  userPersistedDataID?: ModelIDInput | null,
  and?: Array< ModelUserSessionFilterInput | null > | null,
  or?: Array< ModelUserSessionFilterInput | null > | null,
  not?: ModelUserSessionFilterInput | null,
  _deleted?: ModelBooleanInput | null,
};

export enum ModelSortDirection {
  ASC = "ASC",
  DESC = "DESC",
}


export type ModelGameSessionFilterInput = {
  id?: ModelIDInput | null,
  pinCode?: ModelIntInput | null,
  playerCount?: ModelIntInput | null,
  roundNumber?: ModelIntInput | null,
  roundPrompt?: ModelStringInput | null,
  currentRoundExpiration?: ModelStringInput | null,
  playersResponded?: ModelIntInput | null,
  roundMode?: ModelRoundModeInput | null,
  aiResponse?: ModelStringInput | null,
  and?: Array< ModelGameSessionFilterInput | null > | null,
  or?: Array< ModelGameSessionFilterInput | null > | null,
  not?: ModelGameSessionFilterInput | null,
  _deleted?: ModelBooleanInput | null,
};

export type ModelGameSessionConnection = {
  __typename: "ModelGameSessionConnection",
  items:  Array<GameSession | null >,
  nextToken?: string | null,
  startedAt?: number | null,
};

export type ModelSubscriptionUserPersistedDataFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  username?: ModelSubscriptionStringInput | null,
  totalScore?: ModelSubscriptionIntInput | null,
  totalGames?: ModelSubscriptionIntInput | null,
  wins?: ModelSubscriptionIntInput | null,
  losses?: ModelSubscriptionIntInput | null,
  rank?: ModelSubscriptionIntInput | null,
  and?: Array< ModelSubscriptionUserPersistedDataFilterInput | null > | null,
  or?: Array< ModelSubscriptionUserPersistedDataFilterInput | null > | null,
  _deleted?: ModelBooleanInput | null,
};

export type ModelSubscriptionIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  in?: Array< number | null > | null,
  notIn?: Array< number | null > | null,
};

export type ModelSubscriptionUserSessionFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  eliminated?: ModelSubscriptionBooleanInput | null,
  currentRoundResponse?: ModelSubscriptionStringInput | null,
  totalScore?: ModelSubscriptionIntInput | null,
  totalGames?: ModelSubscriptionIntInput | null,
  wins?: ModelSubscriptionIntInput | null,
  losses?: ModelSubscriptionIntInput | null,
  gameSessionID?: ModelSubscriptionIDInput | null,
  userPersistedDataID?: ModelSubscriptionIDInput | null,
  and?: Array< ModelSubscriptionUserSessionFilterInput | null > | null,
  or?: Array< ModelSubscriptionUserSessionFilterInput | null > | null,
  _deleted?: ModelBooleanInput | null,
};

export type ModelSubscriptionBooleanInput = {
  ne?: boolean | null,
  eq?: boolean | null,
};

export type ModelSubscriptionGameSessionFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  pinCode?: ModelSubscriptionIntInput | null,
  playerCount?: ModelSubscriptionIntInput | null,
  roundNumber?: ModelSubscriptionIntInput | null,
  roundPrompt?: ModelSubscriptionStringInput | null,
  currentRoundExpiration?: ModelSubscriptionStringInput | null,
  playersResponded?: ModelSubscriptionIntInput | null,
  roundMode?: ModelSubscriptionStringInput | null,
  aiResponse?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionGameSessionFilterInput | null > | null,
  or?: Array< ModelSubscriptionGameSessionFilterInput | null > | null,
  _deleted?: ModelBooleanInput | null,
};

export type CreateUserPersistedDataMutationVariables = {
  input: CreateUserPersistedDataInput,
  condition?: ModelUserPersistedDataConditionInput | null,
};

export type CreateUserPersistedDataMutation = {
  createUserPersistedData?:  {
    __typename: "UserPersistedData",
    id: string,
    username: string,
    totalScore: number,
    totalGames: number,
    wins: number,
    losses: number,
    rank: number,
    UserSessions?:  {
      __typename: "ModelUserSessionConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    owner?: string | null,
  } | null,
};

export type UpdateUserPersistedDataMutationVariables = {
  input: UpdateUserPersistedDataInput,
  condition?: ModelUserPersistedDataConditionInput | null,
};

export type UpdateUserPersistedDataMutation = {
  updateUserPersistedData?:  {
    __typename: "UserPersistedData",
    id: string,
    username: string,
    totalScore: number,
    totalGames: number,
    wins: number,
    losses: number,
    rank: number,
    UserSessions?:  {
      __typename: "ModelUserSessionConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    owner?: string | null,
  } | null,
};

export type DeleteUserPersistedDataMutationVariables = {
  input: DeleteUserPersistedDataInput,
  condition?: ModelUserPersistedDataConditionInput | null,
};

export type DeleteUserPersistedDataMutation = {
  deleteUserPersistedData?:  {
    __typename: "UserPersistedData",
    id: string,
    username: string,
    totalScore: number,
    totalGames: number,
    wins: number,
    losses: number,
    rank: number,
    UserSessions?:  {
      __typename: "ModelUserSessionConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    owner?: string | null,
  } | null,
};

export type CreateUserSessionMutationVariables = {
  input: CreateUserSessionInput,
  condition?: ModelUserSessionConditionInput | null,
};

export type CreateUserSessionMutation = {
  createUserSession?:  {
    __typename: "UserSession",
    id: string,
    eliminated: boolean,
    currentRoundResponse: string,
    totalScore: number,
    totalGames: number,
    wins: number,
    losses: number,
    gameSessionID: string,
    userPersistedDataID?: string | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type UpdateUserSessionMutationVariables = {
  input: UpdateUserSessionInput,
  condition?: ModelUserSessionConditionInput | null,
};

export type UpdateUserSessionMutation = {
  updateUserSession?:  {
    __typename: "UserSession",
    id: string,
    eliminated: boolean,
    currentRoundResponse: string,
    totalScore: number,
    totalGames: number,
    wins: number,
    losses: number,
    gameSessionID: string,
    userPersistedDataID?: string | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type DeleteUserSessionMutationVariables = {
  input: DeleteUserSessionInput,
  condition?: ModelUserSessionConditionInput | null,
};

export type DeleteUserSessionMutation = {
  deleteUserSession?:  {
    __typename: "UserSession",
    id: string,
    eliminated: boolean,
    currentRoundResponse: string,
    totalScore: number,
    totalGames: number,
    wins: number,
    losses: number,
    gameSessionID: string,
    userPersistedDataID?: string | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type CreateGameSessionMutationVariables = {
  input: CreateGameSessionInput,
  condition?: ModelGameSessionConditionInput | null,
};

export type CreateGameSessionMutation = {
  createGameSession?:  {
    __typename: "GameSession",
    id: string,
    pinCode: number,
    playerCount: number,
    roundNumber: number,
    roundPrompt: string,
    currentRoundExpiration: string,
    UserSessions?:  {
      __typename: "ModelUserSessionConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    playersResponded: number,
    roundMode: RoundMode,
    aiResponse: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type UpdateGameSessionMutationVariables = {
  input: UpdateGameSessionInput,
  condition?: ModelGameSessionConditionInput | null,
};

export type UpdateGameSessionMutation = {
  updateGameSession?:  {
    __typename: "GameSession",
    id: string,
    pinCode: number,
    playerCount: number,
    roundNumber: number,
    roundPrompt: string,
    currentRoundExpiration: string,
    UserSessions?:  {
      __typename: "ModelUserSessionConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    playersResponded: number,
    roundMode: RoundMode,
    aiResponse: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type DeleteGameSessionMutationVariables = {
  input: DeleteGameSessionInput,
  condition?: ModelGameSessionConditionInput | null,
};

export type DeleteGameSessionMutation = {
  deleteGameSession?:  {
    __typename: "GameSession",
    id: string,
    pinCode: number,
    playerCount: number,
    roundNumber: number,
    roundPrompt: string,
    currentRoundExpiration: string,
    UserSessions?:  {
      __typename: "ModelUserSessionConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    playersResponded: number,
    roundMode: RoundMode,
    aiResponse: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type GetUserPersistedDataQueryVariables = {
  id: string,
};

export type GetUserPersistedDataQuery = {
  getUserPersistedData?:  {
    __typename: "UserPersistedData",
    id: string,
    username: string,
    totalScore: number,
    totalGames: number,
    wins: number,
    losses: number,
    rank: number,
    UserSessions?:  {
      __typename: "ModelUserSessionConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    owner?: string | null,
  } | null,
};

export type ListUserPersistedDataQueryVariables = {
  filter?: ModelUserPersistedDataFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListUserPersistedDataQuery = {
  listUserPersistedData?:  {
    __typename: "ModelUserPersistedDataConnection",
    items:  Array< {
      __typename: "UserPersistedData",
      id: string,
      username: string,
      totalScore: number,
      totalGames: number,
      wins: number,
      losses: number,
      rank: number,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type SyncUserPersistedDataQueryVariables = {
  filter?: ModelUserPersistedDataFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  lastSync?: number | null,
};

export type SyncUserPersistedDataQuery = {
  syncUserPersistedData?:  {
    __typename: "ModelUserPersistedDataConnection",
    items:  Array< {
      __typename: "UserPersistedData",
      id: string,
      username: string,
      totalScore: number,
      totalGames: number,
      wins: number,
      losses: number,
      rank: number,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type GetUserSessionQueryVariables = {
  id: string,
};

export type GetUserSessionQuery = {
  getUserSession?:  {
    __typename: "UserSession",
    id: string,
    eliminated: boolean,
    currentRoundResponse: string,
    totalScore: number,
    totalGames: number,
    wins: number,
    losses: number,
    gameSessionID: string,
    userPersistedDataID?: string | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type ListUserSessionsQueryVariables = {
  filter?: ModelUserSessionFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListUserSessionsQuery = {
  listUserSessions?:  {
    __typename: "ModelUserSessionConnection",
    items:  Array< {
      __typename: "UserSession",
      id: string,
      eliminated: boolean,
      currentRoundResponse: string,
      totalScore: number,
      totalGames: number,
      wins: number,
      losses: number,
      gameSessionID: string,
      userPersistedDataID?: string | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type SyncUserSessionsQueryVariables = {
  filter?: ModelUserSessionFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  lastSync?: number | null,
};

export type SyncUserSessionsQuery = {
  syncUserSessions?:  {
    __typename: "ModelUserSessionConnection",
    items:  Array< {
      __typename: "UserSession",
      id: string,
      eliminated: boolean,
      currentRoundResponse: string,
      totalScore: number,
      totalGames: number,
      wins: number,
      losses: number,
      gameSessionID: string,
      userPersistedDataID?: string | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type UserSessionsByGameSessionIDQueryVariables = {
  gameSessionID: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelUserSessionFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type UserSessionsByGameSessionIDQuery = {
  userSessionsByGameSessionID?:  {
    __typename: "ModelUserSessionConnection",
    items:  Array< {
      __typename: "UserSession",
      id: string,
      eliminated: boolean,
      currentRoundResponse: string,
      totalScore: number,
      totalGames: number,
      wins: number,
      losses: number,
      gameSessionID: string,
      userPersistedDataID?: string | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type UserSessionsByUserPersistedDataIDQueryVariables = {
  userPersistedDataID: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelUserSessionFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type UserSessionsByUserPersistedDataIDQuery = {
  userSessionsByUserPersistedDataID?:  {
    __typename: "ModelUserSessionConnection",
    items:  Array< {
      __typename: "UserSession",
      id: string,
      eliminated: boolean,
      currentRoundResponse: string,
      totalScore: number,
      totalGames: number,
      wins: number,
      losses: number,
      gameSessionID: string,
      userPersistedDataID?: string | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type GetGameSessionQueryVariables = {
  id: string,
};

export type GetGameSessionQuery = {
  getGameSession?:  {
    __typename: "GameSession",
    id: string,
    pinCode: number,
    playerCount: number,
    roundNumber: number,
    roundPrompt: string,
    currentRoundExpiration: string,
    UserSessions?:  {
      __typename: "ModelUserSessionConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    playersResponded: number,
    roundMode: RoundMode,
    aiResponse: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type ListGameSessionsQueryVariables = {
  filter?: ModelGameSessionFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListGameSessionsQuery = {
  listGameSessions?:  {
    __typename: "ModelGameSessionConnection",
    items:  Array< {
      __typename: "GameSession",
      id: string,
      pinCode: number,
      playerCount: number,
      roundNumber: number,
      roundPrompt: string,
      currentRoundExpiration: string,
      playersResponded: number,
      roundMode: RoundMode,
      aiResponse: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type SyncGameSessionsQueryVariables = {
  filter?: ModelGameSessionFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  lastSync?: number | null,
};

export type SyncGameSessionsQuery = {
  syncGameSessions?:  {
    __typename: "ModelGameSessionConnection",
    items:  Array< {
      __typename: "GameSession",
      id: string,
      pinCode: number,
      playerCount: number,
      roundNumber: number,
      roundPrompt: string,
      currentRoundExpiration: string,
      playersResponded: number,
      roundMode: RoundMode,
      aiResponse: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type OnCreateUserPersistedDataSubscriptionVariables = {
  filter?: ModelSubscriptionUserPersistedDataFilterInput | null,
  owner?: string | null,
};

export type OnCreateUserPersistedDataSubscription = {
  onCreateUserPersistedData?:  {
    __typename: "UserPersistedData",
    id: string,
    username: string,
    totalScore: number,
    totalGames: number,
    wins: number,
    losses: number,
    rank: number,
    UserSessions?:  {
      __typename: "ModelUserSessionConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    owner?: string | null,
  } | null,
};

export type OnUpdateUserPersistedDataSubscriptionVariables = {
  filter?: ModelSubscriptionUserPersistedDataFilterInput | null,
  owner?: string | null,
};

export type OnUpdateUserPersistedDataSubscription = {
  onUpdateUserPersistedData?:  {
    __typename: "UserPersistedData",
    id: string,
    username: string,
    totalScore: number,
    totalGames: number,
    wins: number,
    losses: number,
    rank: number,
    UserSessions?:  {
      __typename: "ModelUserSessionConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    owner?: string | null,
  } | null,
};

export type OnDeleteUserPersistedDataSubscriptionVariables = {
  filter?: ModelSubscriptionUserPersistedDataFilterInput | null,
  owner?: string | null,
};

export type OnDeleteUserPersistedDataSubscription = {
  onDeleteUserPersistedData?:  {
    __typename: "UserPersistedData",
    id: string,
    username: string,
    totalScore: number,
    totalGames: number,
    wins: number,
    losses: number,
    rank: number,
    UserSessions?:  {
      __typename: "ModelUserSessionConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    owner?: string | null,
  } | null,
};

export type OnCreateUserSessionSubscriptionVariables = {
  filter?: ModelSubscriptionUserSessionFilterInput | null,
};

export type OnCreateUserSessionSubscription = {
  onCreateUserSession?:  {
    __typename: "UserSession",
    id: string,
    eliminated: boolean,
    currentRoundResponse: string,
    totalScore: number,
    totalGames: number,
    wins: number,
    losses: number,
    gameSessionID: string,
    userPersistedDataID?: string | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnUpdateUserSessionSubscriptionVariables = {
  filter?: ModelSubscriptionUserSessionFilterInput | null,
};

export type OnUpdateUserSessionSubscription = {
  onUpdateUserSession?:  {
    __typename: "UserSession",
    id: string,
    eliminated: boolean,
    currentRoundResponse: string,
    totalScore: number,
    totalGames: number,
    wins: number,
    losses: number,
    gameSessionID: string,
    userPersistedDataID?: string | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnDeleteUserSessionSubscriptionVariables = {
  filter?: ModelSubscriptionUserSessionFilterInput | null,
};

export type OnDeleteUserSessionSubscription = {
  onDeleteUserSession?:  {
    __typename: "UserSession",
    id: string,
    eliminated: boolean,
    currentRoundResponse: string,
    totalScore: number,
    totalGames: number,
    wins: number,
    losses: number,
    gameSessionID: string,
    userPersistedDataID?: string | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnCreateGameSessionSubscriptionVariables = {
  filter?: ModelSubscriptionGameSessionFilterInput | null,
};

export type OnCreateGameSessionSubscription = {
  onCreateGameSession?:  {
    __typename: "GameSession",
    id: string,
    pinCode: number,
    playerCount: number,
    roundNumber: number,
    roundPrompt: string,
    currentRoundExpiration: string,
    UserSessions?:  {
      __typename: "ModelUserSessionConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    playersResponded: number,
    roundMode: RoundMode,
    aiResponse: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnUpdateGameSessionSubscriptionVariables = {
  filter?: ModelSubscriptionGameSessionFilterInput | null,
};

export type OnUpdateGameSessionSubscription = {
  onUpdateGameSession?:  {
    __typename: "GameSession",
    id: string,
    pinCode: number,
    playerCount: number,
    roundNumber: number,
    roundPrompt: string,
    currentRoundExpiration: string,
    UserSessions?:  {
      __typename: "ModelUserSessionConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    playersResponded: number,
    roundMode: RoundMode,
    aiResponse: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnDeleteGameSessionSubscriptionVariables = {
  filter?: ModelSubscriptionGameSessionFilterInput | null,
};

export type OnDeleteGameSessionSubscription = {
  onDeleteGameSession?:  {
    __typename: "GameSession",
    id: string,
    pinCode: number,
    playerCount: number,
    roundNumber: number,
    roundPrompt: string,
    currentRoundExpiration: string,
    UserSessions?:  {
      __typename: "ModelUserSessionConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    playersResponded: number,
    roundMode: RoundMode,
    aiResponse: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};
