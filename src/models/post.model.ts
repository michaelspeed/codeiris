import { PostStatus, PostType } from '.prisma/client';
import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { BaseModel } from './base.model';
import { User } from './user.model';

registerEnumType(PostStatus, { name: 'PostStatus' });
registerEnumType(PostType, { name: 'PostType' });

@ObjectType()
export class Post extends BaseModel {
  @Field()
  slug: string;
  @Field()
  body: string;
  @Field()
  url?: string;
  @Field()
  title: string;
  @Field()
  user?: User;
  @Field()
  deleted: boolean;
  @Field(() => PostStatus)
  status: 'draft' | 'published' | 'hidden' | 'blocked';
  @Field(() => PostType)
  type: 'link' | 'ask' | 'job';
}