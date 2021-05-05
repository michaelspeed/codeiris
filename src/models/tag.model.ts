import { BaseModel } from './base.model';
import { Field, ObjectType } from '@nestjs/graphql';
import { DeepPartial } from '../common';
import { User } from './user.model';
import { Post } from './post.model';

@ObjectType()
export class Tag extends BaseModel {
  constructor(input?: DeepPartial<Tag>) {
    super(input);
  }
  @Field()
  name: string;
  @Field(() => [Post], { nullable: true })
  post: Post[];
}
