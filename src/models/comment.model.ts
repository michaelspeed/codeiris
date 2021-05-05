import { BaseModel } from './base.model';
import { Field, ObjectType } from '@nestjs/graphql';
import { DeepPartial } from '../common';
import { User } from './user.model';
import { Post } from './post.model';

@ObjectType()
export class Comment extends BaseModel {
  constructor(input?: DeepPartial<Comment>) {
    super(input);
  }

  @Field()
  body: string;
  @Field(() => [Comment], { nullable: true })
  children: Comment[];
  @Field(() => Comment, { nullable: true })
  parent: Comment;
  @Field()
  userId: string;
  @Field(() => User, { nullable: true })
  user: User;
  @Field()
  postId: string;
  @Field(() => Post, { nullable: true })
  post: Post;
}
