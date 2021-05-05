import { Field, InputType, registerEnumType } from '@nestjs/graphql';
import { Order } from '../../common/order/order';

export enum CommentOrderField {
  votes = 'votes',
  updatedAt = 'updatedAt',
  createdAt = 'createdAt',
}

registerEnumType(CommentOrderField, {
  name: 'CommentOrderField',
});

@InputType()
export class CommentOrder extends Order {
  @Field(() => CommentOrderField)
  field: CommentOrderField;
}
