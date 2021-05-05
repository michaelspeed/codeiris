import { Controller, Get, Render } from '@nestjs/common';

@Controller('user')
export class UserController {
  @Get('profile')
  @Render('profile')
  async getProfile() {}

  @Get('account')
  @Render('account')
  async getAccount() {}
}
