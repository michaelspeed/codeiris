import { Field, InputType } from '@nestjs/graphql';
import { Post } from '../post.model';

@InputType()
export class UpvoteInput {
  @Field()
  type: 'upvotes' | 'downvotes';
  @Field()
  postId: string;
}
