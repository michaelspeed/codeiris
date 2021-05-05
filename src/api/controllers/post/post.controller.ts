import { Controller, Get, Param, Render } from '@nestjs/common';
import { PostService } from '../../../services/post.service';
import superjson from 'superjson';

@Controller('posts')
export class PostController {
  constructor(private readonly post: PostService) {}

  @Get('save')
  @Render('savePost')
  async SavePost() {
    return {};
  }

  @Get(':id')
  @Render('postPage')
  async getPost(@Param('id') id: string) {
    const post = await this.post.getSinglePost(id);
    return {
      data: superjson.stringify(post),
    };
  }
}
