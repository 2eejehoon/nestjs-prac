import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}

  createPost(userId: number, data: Prisma.PostCreateWithoutUserInput) {
    return this.prisma.post.create({
      data: {
        ...data,
        userId,
      },
    });
  }

  createGroupPost(
    userIds: number[],
    data: Prisma.GroupPostCreateWithoutUserInput,
  ) {
    this.prisma.groupPost.create({
      data: {
        ...data,
        user: {
          create: userIds.map((userId) => ({ userId: userId })),
        },
      },
    });
  }
}
