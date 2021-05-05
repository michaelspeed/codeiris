import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Injectable()
export class UpvoteService {
  constructor(private readonly prisma: PrismaService) {}

  async upvotePost(postId: string, userId: string) {
    const vote = await this.prisma.vote.findFirst({
      where: { userId, postId },
    });
    if (vote) {
      return await this.prisma.vote.update({
        where: { id: vote.id },
        data: { type: 'upvotes', userId, postId },
      });
    } else {
      return this.prisma.vote.create({
        data: { type: 'upvotes', userId, postId },
      });
    }
  }
  async downvotePost(postId: string, userId: string) {
    const vote = await this.prisma.vote.findFirst({
      where: { userId, postId },
    });
    if (vote) {
      return await this.prisma.vote.update({
        where: { id: vote.id },
        data: { type: 'downvotes', userId, postId },
      });
    } else {
      return this.prisma.vote.create({
        data: { type: 'downvotes', userId, postId },
      });
    }
  }

  async getUpvoteState(postId: string, userId: string) {
    const vote = await this.prisma.vote.findFirst({
      where: { userId, postId },
    });
    if (vote) return vote.type;
    return 'notvoted';
  }
}
