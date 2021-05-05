import { VoteType } from '.prisma/client';
import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { BaseModel } from './base.model';
import { Post } from './post.model';
import { User } from './user.model';

registerEnumType(VoteType, { name: 'VoteType' });
@ObjectType()
export class Vote extends BaseModel {
  @Field(() => VoteType)
  type: 'upvotes' | 'downvotes';
  @Field(() => User)
  user: User;
  @Field(() => Post)
  post: Post;
}
