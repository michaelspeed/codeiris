import { Field, ID, ObjectType } from '@nestjs/graphql';
import { DeepPartial } from '../common';

@ObjectType({ isAbstract: true })
export abstract class BaseModel {
  protected constructor(input?: DeepPartial<BaseModel>) {
    if (input) {
      for (const [key, value] of Object.entries(input)) {
        (this as any)[key] = value;
      }
    }
  }

  @Field((type) => ID)
  id: string;

  @Field({
    description: 'Identifies the date and time when the object was created.',
  })
  createdAt: Date;

  @Field({
    description:
      'Identifies the date and time when the object was last updated.',
  })
  updatedAt: Date;
}
