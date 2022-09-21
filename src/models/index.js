// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { VideoPost, User, Video, Videos } = initSchema(schema);

export {
  VideoPost,
  User,
  Video,
  Videos
};