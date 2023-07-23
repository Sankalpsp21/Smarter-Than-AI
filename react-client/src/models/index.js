// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { UserPersistedData, UserSession, GameSession } = initSchema(schema);

export {
  UserPersistedData,
  UserSession,
  GameSession
};