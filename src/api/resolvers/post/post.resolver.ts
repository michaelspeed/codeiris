import { findManyCursorConnection } from '@devoxa/prisma-relay-cursor-connection';
import {
  Resolver,
  Query,
  Args,
  ResolveField,
  Parent,
  Int,
  Mutation,
} from '@nestjs/graphql';
import { User } from '../../../models/user.model';
import { PaginationArgs } from '../../../common/pagination/pagination.args';
import { PostOrder } from '../../../models/input/post-order.input';
import { PostConnection } from '../../../models/pagination/post-connection.model';
import { Post } from '../../../models/post.model';
import { PrismaService } from '../../../services/prisma.service';
import { Ctx } from '../../decorators/request-context.decorator';
import { RequestContext } from '../../common/request-context';
import { PostCreateInput } from '../../../models/input/post-create-input';
import slugify from 'slugify';
import { PostService } from '../../../services/post.service';
import { UnauthorizedException } from '@nestjs/common';

@Resolver((of) => Post)
export class PostResolver {
  constructor(
    private readonly prisma: PrismaService,
    private readonly post: PostService,
  ) {}

  @Mutation(() => Post)
  async addPost(
    @Args('post') input: PostCreateInput,
    @Ctx() context: RequestContext,
  ) {
    if (context.user === undefined) {
      throw new UnauthorizedException();
    }
    return this.post.createPost({
      type: input.type,
      title: input.title,
      body: input.body,
      slug: input.title,
      url: input.url,
      userId: context.user.id,
    });
  }

  @Query((returns) => PostConnection)
  async getPosts(
    @Args() { skip, after, before, first, last }: PaginationArgs,
    @Args({
      name: 'orderBy',
      type: () => PostOrder,
      nullable: true,
    })
    orderBy: PostOrder,
  ) {
    const postCursors = findManyCursorConnection(
      (args) =>
        this.prisma.post.findMany({
          orderBy: orderBy && { [orderBy.field]: orderBy.direction },
          ...args,
        }),
      () => this.prisma.post.count(),
      { first, last, before, after },
    );
    return postCursors;
  }

  @Query((returns) => PostConnection)
  async getMePosts(
    @Args() { skip, after, before, first, last }: PaginationArgs,
    @Ctx() context: RequestContext,
    @Args({
      name: 'orderBy',
      type: () => PostOrder,
      nullable: true,
    })
    orderBy: PostOrder,
  ) {
    const postCursors = findManyCursorConnection(
      (args) =>
        this.prisma.post.findMany({
          where: {
            user: {
              id: context.user.id,
            },
          },
          orderBy: orderBy && { [orderBy.field]: orderBy.direction },
          ...args,
        }),
      () =>
        this.prisma.post.count({
          where: {
            user: {
              id: context.user.id,
            },
          },
        }),
      { first, last, before, after },
    );
    return postCursors;
  }

  @ResolveField('user', (returns) => User)
  async user(@Parent() post: Post) {
    const { userId } = post;
    return this.prisma.user.findUnique({ where: { id: userId } });
  }

  @ResolveField('totalComments', (returns) => Int)
  async totalComments(@Parent() post: Post) {
    const { id } = post;
    const totalComments = await this.prisma.comment.count({
      where: { postId: id },
    });
    return totalComments;
  }

  @ResolveField('upvoteState', (returns) => String)
  async upvoteState(@Ctx() context: RequestContext, @Parent() post: Post) {
    if (context.session.type === 'AUTHENTICATED') {
      const { id } = post;
      const vote = await this.prisma.vote.findFirst({
        where: { postId: id, userId: context.user.id },
      });
      if (vote) return vote.type;
      return 'notvoted';
    }
    return 'disabled';
  }

  @ResolveField('totalVotes', (returns) => Int)
  async totalVotes(@Parent() post: Post) {
    const { id } = post;
    const votes = await this.prisma.vote.findMany({ where: { postId: id } });
    return votes.reduce((prev, current) => {
      if ((current.type = 'upvotes')) return (prev += 1);
      return (prev -= 1);
    }, 0);
  }
}
