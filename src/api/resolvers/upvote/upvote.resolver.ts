import { BadRequestException, UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { RequestContext } from '../../common/request-context';
import { Ctx } from '../../decorators/request-context.decorator';
import { UpvoteInput } from '../../../models/input/upvote.input';
import { Vote } from '../../../models/vote.model';
import { PrismaService } from '../../../services/prisma.service';
import { UpvoteService } from '../../../services/upvote.service';
import { GQLAuthGuard } from '../auth/guards/auth.guard';

@Resolver()
@UseGuards(GQLAuthGuard)
export class UpvoteResolver {
  constructor(
    private readonly prisma: PrismaService,
    private readonly upvote: UpvoteService,
  ) {}

  @Mutation(() => Vote)
  async updateVote(
    @Args('input') input: UpvoteInput,
    @Ctx() context: RequestContext,
  ) {
    if (input.postId === undefined || context.user === undefined) {
      throw new BadRequestException();
    }
    if (input.type === 'upvotes')
      return this.upvote.upvotePost(input.postId, context.user.id);
    if (input.type === 'downvotes')
      return this.upvote.downvotePost(input.postId, context.user.id);
  }
}
