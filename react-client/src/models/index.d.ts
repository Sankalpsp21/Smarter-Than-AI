import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled } from "@aws-amplify/datastore";





type EagerGameSessio = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<GameSessio, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyGameSessio = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<GameSessio, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type GameSessio = LazyLoading extends LazyLoadingDisabled ? EagerGameSessio : LazyGameSessio

export declare const GameSessio: (new (init: ModelInit<GameSessio>) => GameSessio) & {
  copyOf(source: GameSessio, mutator: (draft: MutableModel<GameSessio>) => MutableModel<GameSessio> | void): GameSessio;
}