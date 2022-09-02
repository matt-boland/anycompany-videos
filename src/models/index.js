// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { VideoPost, User } = initSchema(schema);

export {
  VideoPost,
  User
};