import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Query,
  Redirect,
  Render,
} from '@nestjs/common';
import { PostService } from './services/post.service';

@Controller()
export class AppController {
  constructor(private readonly post: PostService) {}

  @Get('')
  @Render('home')
  async getHome(@Query('type') postType: string) {
    let orderBy = {};
    switch (postType) {
      case 'job':
        orderBy = { updatedAt: 'desc' };
        break;
      case 'ask':
        orderBy = {
          votes: {
            count: 'desc',
          },
        };
        break;
      case 'link':
        orderBy = { updatedAt: 'desc' };
        break;
      default:
        orderBy = { updatedAt: 'desc' };
        break;
    }
    const include = {
      user: {
        select: {
          firstName: true,
          lastName: true,
          image: true,
        },
      },
      _count: {
        select: {
          votes: true,
          comments: true,
        },
      },
    };
    const initialPosts = await this.post.getTopPost(
      postType as 'job' | 'ask' | 'link',
      orderBy,
      include,
      10,
    );
    return {
      initialPosts: JSON.stringify(initialPosts),
    };
  }

  @Get('/login')
  @Render('login')
  async Login() {
    return {};
  }
}
