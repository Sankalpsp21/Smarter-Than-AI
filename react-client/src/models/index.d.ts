import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled, AsyncCollection } from "@aws-amplify/datastore";





type EagerUserPersistedData = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<UserPersistedData, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly totalScore: number;
  readonly totalGames: number;
  readonly wins: number;
  readonly losses: number;
  readonly rank: number;
  readonly UserSessions?: (UserSession | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyUserPersistedData = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<UserPersistedData, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly totalScore: number;
  readonly totalGames: number;
  readonly wins: number;
  readonly losses: number;
  readonly rank: number;
  readonly UserSessions: AsyncCollection<UserSession>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type UserPersistedData = LazyLoading extends LazyLoadingDisabled ? EagerUserPersistedData : LazyUserPersistedData

export declare const UserPersistedData: (new (init: ModelInit<UserPersistedData>) => UserPersistedData) & {
  copyOf(source: UserPersistedData, mutator: (draft: MutableModel<UserPersistedData>) => MutableModel<UserPersistedData> | void): UserPersistedData;
}

type EagerUserSession = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<UserSession, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly websocketSessionID: string;
  readonly eliminated: boolean;
  readonly currentRoundResponse: string;
  readonly totalScore: number;
  readonly totalGames: number;
  readonly wins: number;
  readonly losses: number;
  readonly gameSessionID: string;
  readonly userPersistedDataID?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyUserSession = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<UserSession, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly websocketSessionID: string;
  readonly eliminated: boolean;
  readonly currentRoundResponse: string;
  readonly totalScore: number;
  readonly totalGames: number;
  readonly wins: number;
  readonly losses: number;
  readonly gameSessionID: string;
  readonly userPersistedDataID?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type UserSession = LazyLoading extends LazyLoadingDisabled ? EagerUserSession : LazyUserSession

export declare const UserSession: (new (init: ModelInit<UserSession>) => UserSession) & {
  copyOf(source: UserSession, mutator: (draft: MutableModel<UserSession>) => MutableModel<UserSession> | void): UserSession;
}

type EagerGameSession = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<GameSession, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly pinCode: number;
  readonly playerCount: number;
  readonly roundNumber: number;
  readonly roundPrompt: string;
  readonly currentRoundExpiration: string;
  readonly UserSessions?: (UserSession | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyGameSession = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<GameSession, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly pinCode: number;
  readonly playerCount: number;
  readonly roundNumber: number;
  readonly roundPrompt: string;
  readonly currentRoundExpiration: string;
  readonly UserSessions: AsyncCollection<UserSession>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type GameSession = LazyLoading extends LazyLoadingDisabled ? EagerGameSession : LazyGameSession

export declare const GameSession: (new (init: ModelInit<GameSession>) => GameSession) & {
  copyOf(source: GameSession, mutator: (draft: MutableModel<GameSession>) => MutableModel<GameSession> | void): GameSession;
}