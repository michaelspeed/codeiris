import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Comment } from '../../../models/comment.model';
import { PrismaService } from '../../../services/prisma.service';
import { CommentConnection } from '../../../models/pagination/comment-connection.model';
import { PaginationArgs } from '../../../common/pagination/pagination.args';
import { findManyCursorConnection } from '@devoxa/prisma-relay-cursor-connection';
import { Ctx } from '../../decorators/request-context.decorator';
import { RequestContext } from '../../common/request-context';
import { CommentOrder } from '../../../models/input/comment-order.input';
import { CommentCreateInput } from '../../../models/input/comment-create.input';
import { BadRequestException } from '@nestjs/common';

@Resolver(() => Comment)
export class CommentResolver {
  constructor(private readonly prisma: PrismaService) {}

  @Query(() => CommentConnection)
  async getMeComments(
    @Args() { skip, after, before, first, last }: PaginationArgs,
    @Ctx() context: RequestContext,
    @Args({
      name: 'orderBy',
      type: () => CommentOrder,
      nullable: true,
    })
    orderBy: CommentOrder,
  ) {
    const commentCursor = findManyCursorConnection(
      (args) =>
        this.prisma.comment.findMany({
          where: {
            user: {
              id: {
                equals: context.user.id,
              },
            },
          },
          orderBy: orderBy && { [orderBy.field]: orderBy.direction },
          ...args,
        }),
      () =>
        this.prisma.comment.count({
          where: {
            user: {
              id: {
                equals: context.user.id,
              },
            },
          },
        }),
      { first, last, before, after },
    );
    return commentCursor;
  }

  @Query(() => CommentConnection)
  async getComments(
    @Args() { skip, after, before, first, last }: PaginationArgs,
    @Args('postId', { nullable: true, type: () => String }) postId: string,
    @Args({
      name: 'orderBy',
      type: () => CommentOrder,
      nullable: true,
    })
    orderBy: CommentOrder,
  ) {
    const commentCursor = findManyCursorConnection(
      (args) =>
        this.prisma.comment.findMany({
          where: {
            post: {
              id: {
                contains: postId ? postId : '',
              },
            },
          },
          include: {
            user: true,
          },
          orderBy: orderBy && { [orderBy.field]: orderBy.direction },
          ...args,
        }),
      () =>
        this.prisma.comment.count({
          where: {
            post: {
              id: {
                contains: postId ? postId : '',
              },
            },
          },
        }),
      { first, last, before, after },
    );
    return commentCursor;
  }

  @Query(() => CommentConnection)
  async getCommentsChildren(
    @Args() { skip, after, before, first, last }: PaginationArgs,
    @Args('commentId', { nullable: true, type: () => String })
    commentId: string,
    @Args({
      name: 'orderBy',
      type: () => CommentOrder,
      nullable: true,
    })
    orderBy: CommentOrder,
  ) {
    const commentCursor = findManyCursorConnection(
      (args) =>
        this.prisma.comment.findMany({
          where: {
            parent: {
              id: {
                contains: commentId,
              },
            },
          },
          include: {
            user: true,
          },
          orderBy: orderBy && { [orderBy.field]: orderBy.direction },
          ...args,
        }),
      () =>
        this.prisma.comment.count({
          where: {
            parent: {
              id: {
                contains: commentId,
              },
            },
          },
        }),
      { first, last, before, after },
    );
    return commentCursor;
  }

  @Mutation(() => Comment)
  async CreateComment(
    @Args('input') input: CommentCreateInput,
    @Ctx() context: RequestContext,
  ) {
    if (input.parentId === undefined && input.postId === undefined) {
      throw new BadRequestException();
    }
    return this.prisma.comment.create({
      data: {
        parentId: input.parentId,
        postId: input.postId,
        body: input.body,
        userId: context.user ? context.user.id : undefined,
      },
      include: {
        post: true,
        parent: true,
        children: true,
      },
    });
  }

  @ResolveField('children', (returns) => [Comment])
  async children(@Parent() comment: Comment) {
    return this.prisma.comment.findMany({
      where: { parent: { id: { equals: comment.id } } },
    });
  }

  @ResolveField('parent', (returns) => Comment, { nullable: true })
  async parent(@Parent() comment: Comment) {
    return this.prisma.comment.findFirst({
      where: { children: { some: { id: comment.id } } },
    });
  }
}
