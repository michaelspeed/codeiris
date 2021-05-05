import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class MagicLinkDto {
  @Field((type) => Boolean)
  status: boolean;

  @Field()
  listener: string;
}
