import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





type VideoPostMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type UserMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class VideoPost {
  readonly id: string;
  readonly description?: string | null;
  readonly title?: string | null;
  readonly thumbnailUrl?: string | null;
  readonly authorName?: string | null;
  readonly authorProfilePicUr?: string | null;
  readonly videoUrl?: string | null;
  readonly postDateTime?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<VideoPost, VideoPostMetaData>);
  static copyOf(source: VideoPost, mutator: (draft: MutableModel<VideoPost, VideoPostMetaData>) => MutableModel<VideoPost, VideoPostMetaData> | void): VideoPost;
}

export declare class User {
  readonly id: string;
  readonly firstName?: string | null;
  readonly lastName?: string | null;
  readonly profilePicUrl?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<User, UserMetaData>);
  static copyOf(source: User, mutator: (draft: MutableModel<User, UserMetaData>) => MutableModel<User, UserMetaData> | void): User;
}