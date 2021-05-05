import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { BaseModel } from './base.model';
import { DeepPartial } from '../common';

export enum UserStatus {
  active = 'active',
  blocked = 'blocked',
  inactive = 'inactive',
}

export enum UserRole {
  admin = 'admin',
  moderator = 'moderator',
  user = 'user',
}

registerEnumType(UserStatus, {
  name: 'UserStatus',
});

registerEnumType(UserRole, {
  name: 'UserRole',
});

@ObjectType()
export class User extends BaseModel {
  constructor(input?: DeepPartial<User>) {
    super(input);
  }

  @Field()
  email: string;
  @Field()
  firstName: string;
  @Field({ nullable: true })
  middleName?: string;
  @Field({ nullable: true })
  lastName?: string;
  @Field(() => UserStatus)
  status?: 'active' | 'blocked' | 'inactive';
  @Field(() => UserRole)
  role: 'admin' | 'moderator' | 'user';
}
