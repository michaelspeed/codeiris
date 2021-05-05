import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User, UserRole } from '../../../models/user.model';
import { UnauthorizedException, UseGuards } from '@nestjs/common';
import { GQLAuthGuard } from '../auth/guards/auth.guard';
import { UserConnection } from '../../../models/pagination/user-connection.model';
import { PaginationArgs } from '../../../common/pagination/pagination.args';
import { findManyCursorConnection } from '@devoxa/prisma-relay-cursor-connection';
import { PrismaService } from '../../../services/prisma.service';
import { UserOrder } from '../../../models/input/user-order.input';
import { Ctx } from '../../decorators/request-context.decorator';
import { RequestContext } from '../../common/request-context';
import { UpdateUserInput } from '../../../models/input/update-user.input';
import { UserService } from '../../../services/user.service';

@Resolver((of) => User)
@UseGuards(GQLAuthGuard)
export class UserResolver {
  constructor(
    private readonly prisma: PrismaService,
    private readonly userService: UserService,
  ) {}

  @Mutation(() => User)
  async updateUserProfileInfo(
    @Args('data') data: UpdateUserInput,
    @Ctx() context: RequestContext,
  ) {
    return this.userService.updateUser(data, context.user.id);
  }

  @Query((returns) => User, { nullable: true })
  async me(@Ctx() context: RequestContext): Promise<User> {
    return context.user;
  }

  @Query(() => UserConnection)
  async getUsers(
    @Ctx() context: RequestContext,
    @Args() { skip, after, before, first, last }: PaginationArgs,
    @Args({
      name: 'orderBy',
      type: () => UserOrder,
      nullable: true,
    })
    orderBy: UserOrder,
  ) {
    if (context.user.role === UserRole.user) {
      throw new UnauthorizedException(
        'Your are not authorized to access this function!',
      );
    }
    const userCursors = findManyCursorConnection(
      (args) =>
        this.prisma.user.findMany({
          orderBy: orderBy && { [orderBy.field]: orderBy.direction },
          ...args,
        }),
      () => this.prisma.user.count(),
      { first, last, before, after },
    );
    return userCursors;
  }
}
