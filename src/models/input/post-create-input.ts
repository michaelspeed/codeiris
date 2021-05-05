import { PostType } from '.prisma/client';
import { Field, InputType, ObjectType } from '@nestjs/graphql';

@InputType()
export class PostCreateInput {
  @Field()
  title: string;

  @Field({ nullable: true })
  body: string;

  @Field({ nullable: true })
  url: string;

  @Field({ nullable: true })
  image: string;

  @Field(() => PostType, { nullable: true, defaultValue: 'link' })
  type: 'link' | 'ask' | 'job';
}
