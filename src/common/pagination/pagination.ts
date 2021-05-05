import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Type } from '@nestjs/common';
import { PageInfo } from './page-info.model';

// @ts-ignore
export default function Paginated<T>(TClass: Type<T>): any {
  @ObjectType(`${TClass.name}Edge`)
  abstract class EdgeType {
    @Field()
    cursor: string;
    @Field(() => TClass)
    node: T;
  }

  @ObjectType({ isAbstract: true })
  abstract class PaginatedType {
    @Field(() => [EdgeType], { nullable: true })
    edges: Array<EdgeType>;
    @Field(() => PageInfo)
    pageInfo: PageInfo;
    @Field(() => Int)
    totalCount: number;
  }
  return PaginatedType;
}
