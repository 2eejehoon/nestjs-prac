import { HttpException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  createUser(data: Prisma.UserCreateInput) {
    return this.prisma.user.create({
      data: {
        ...data,
        userSetting: {
          create: {
            smsEnabled: true,
            notificationsOn: true,
          },
        },
      },
    });
  }

  getManyUsers() {
    return this.prisma.user.findMany({ include: { userSetting: true } });
  }

  getOneUserById(id: number) {
    return this.prisma.user.findUnique({
      where: { id },
      include: {
        userSetting: {
          select: {
            smsEnabled: true,
            notificationsOn: true,
          },
        },
        posts: true,
      },
    });
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

  async deleteOneUserById(id: number) {
    const user = await this.getOneUserById(id);
    if (!user) {
      throw new HttpException('User Not Found', 404);
    }

    return this.prisma.user.delete({ where: { id } });
  }

  async updateOneUserSettingById(
    userId: number,
    data: Prisma.UserSettingUpdateInput,
  ) {
    const user = await this.getOneUserById(userId);
    if (!user) {
      throw new HttpException('User Not Found', 404);
    }

    if (!user.userSetting) {
      throw new HttpException('User Has No UserSetting', 400);
    }

    return this.prisma.userSetting.update({ where: { userId }, data });
  }
}
