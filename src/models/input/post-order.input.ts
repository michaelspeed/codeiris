import { Field, InputType, registerEnumType } from '@nestjs/graphql';
import { Order } from '../../common/order/order';

export enum PostOrderFeild {
  votes = 'votes',
  updatedAt = 'updatedAt',
}

registerEnumType(PostOrderFeild, {
  name: 'PostOrderFeild',
});

@InputType()
export class PostOrder extends Order {
  @Field(() => PostOrderFeild)
  field: PostOrderFeild;
}
