import { PostStatus, PostType } from '.prisma/client';
import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
import { BaseModel } from './base.model';
import { User } from './user.model';
import { Vote } from './vote.model';
import { DeepPartial } from '../common';
import { Comment } from './comment.model';
import { Tag } from './tag.model';

registerEnumType(PostStatus, { name: 'PostStatus' });
registerEnumType(PostType, { name: 'PostType' });

@ObjectType()
export class Post extends BaseModel {
  constructor(input?: DeepPartial<Post>) {
    super(input);
  }

  @Field()
  slug: string;
  @Field({nullable :  true})
  body?: string;
  @Field()
  url?: string;
  @Field()
  title: string;
  @Field(() => User)
  user: User;
  @Field()
  userId: string;
  @Field()
  deleted: boolean;
  @Field(() => PostStatus)
  status: 'draft' | 'published' | 'hidden' | 'blocked';
  @Field(() => PostType)
  type: 'link' | 'ask' | 'job';
  @Field(() => [Vote], {nullable: true})
  votes: Vote[];
  @Field(() => [Comment], { nullable: true })
  comments: Comment[];
  @Field(() => [Tag], { nullable: true })
  tag: Tag[];
}
