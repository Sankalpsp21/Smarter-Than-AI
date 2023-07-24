// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const RoundMode = {
  "PROMPT": "PROMPT",
  "PLAY": "PLAY",
  "VOTE": "VOTE",
  "MESSAGE": "MESSAGE",
  "WIN": "WIN",
  "LOSE": "LOSE"
};

const { UserPersistedData, UserSession, GameSession } = initSchema(schema);

export {
  UserPersistedData,
  UserSession,
  GameSession,
  RoundMode
};