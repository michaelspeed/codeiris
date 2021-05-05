import { Field, InputType, ObjectType } from '@nestjs/graphql';

@InputType()
export class CommentCreateInput {
  @Field()
  body: string;

  @Field({ nullable: true })
  postId?: string;

  @Field({ nullable: true })
  parentId?: string;
}
