import { HttpException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  createUser(data: Prisma.UserCreateInput) {
    return this.prisma.user.create({ data });
  }

  getManyUsers() {
    return this.prisma.user.findMany();
  }

  getOneUserById(id: number) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async updateOneUserById(id: number, data: Prisma.UserUpdateInput) {
    const user = await this.getOneUserById(id);
    if (!user) {
      throw new HttpException('User Not Found', 404);
    }

    const isUsernameInUse = await this.prisma.user.findUnique({
      where: { username: data.username as string },
    });

    if (isUsernameInUse) {
      throw new HttpException('Username is alreay in use', 400);
    }

    return this.prisma.user.update({ where: { id }, data });
  }
}
