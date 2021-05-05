import { findManyCursorConnection } from '@devoxa/prisma-relay-cursor-connection';
import { Resolver, Query, Args } from '@nestjs/graphql';
import { PaginationArgs } from '../../../common/pagination/pagination.args';
import { PrismaService } from '../../../services/prisma.service';
import { Tag } from '../../../models/tag.model';
import { TagConnection } from '../../../models/pagination/tag-connection.model';

@Resolver((of) => Tag)
export class TagResolver {
  constructor(private readonly prisma: PrismaService) {}
  @Query((returns) => TagConnection)
  async getTags(
    @Args() { skip, after, before, first, last }: PaginationArgs,
    @Args({
      name: 'contain',
      type: () => String,
      nullable: true,
    })
    filterString: string,
  ) {
    const tagCursors = findManyCursorConnection(
      (args) =>
        this.prisma.tag.findMany({
          where: {
            name: {
              contains: filterString,
            },
          },
          ...args,
        }),
      () => this.prisma.post.count(),
      { first, last, before, after },
    );
    return tagCursors;
  }
}
