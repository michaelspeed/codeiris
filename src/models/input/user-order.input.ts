import { Field, InputType, registerEnumType } from '@nestjs/graphql';
import { Order } from '../../common/order/order';

export enum UserOrderField {
  email = 'email',
  firstName = 'firstName',
  lastName = 'lastName',
  middleName = 'middleName',
}

registerEnumType(UserOrderField, {
  name: 'UserOrderField',
});

@InputType()
export class UserOrder extends Order {
  @Field(() => UserOrderField)
  field: UserOrderField;
}
