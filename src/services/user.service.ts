import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { UpdateUserInput } from '../models/input/update-user.input';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  updateUser(data: UpdateUserInput, user: string) {
    return this.prisma.user.update({
      where: {
        id: user,
      },
      data: {
        ...data,
      },
    });
  }
}
