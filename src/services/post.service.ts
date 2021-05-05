import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import slugify from 'slugify';
import { EventBus } from '../event-bus/event-bus';
import { Post } from '../models/post.model';
import uniqid from 'uniqid';
import { UpdatePostEvent, CreatePostEvents } from '../event-bus/events/post.events';

@Injectable()
export class PostService {
  constructor(
    private readonly prisma: PrismaService,
    private eventBus: EventBus,
  ) {}

  async getSinglePost(id: string) {
    return this.prisma.post.findUnique({
      where: { id },
      include: {
        user: true,
        tags: true,
        flag: true,
        _count: {
          select: {
            comments: true,
          },
        },
      },
    });
  }

  async getTopPost(
    type: 'link' | 'job' | 'ask',
    orderBy = {},
    include = {},
    take = 10,
  ) {
    const topPosts = await this.prisma.post.findMany({
      take: take,
      where: {
        type: type,
      },
      orderBy: orderBy,
      include: include,
    });
    return topPosts;
  }
async createPost({ type, title, body, slug, url, userId }) {
    const slugNew = slugify(slug) + '-' + uniqid();
    const post = await this.prisma.post.create({
      data: {
        type,
        title,
        body,
        slug: slugNew,
        url,
        userId,
      },
    });
    this.eventBus.publish(new CreatePostEvents(post as Post));
    return post;
  }

  async updatePost({ id, title, body, url }) {
    const updatedPost = await this.prisma.post.update({
      where: {
        id,
      },
      data: {
        title,
        body,
        url,
      },
    });
    this.eventBus.publish(new UpdatePostEvent(updatedPost as Post));
    return updatedPost;
  }
}
