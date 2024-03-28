import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  createUser(createUserData: Prisma.UserCreateInput) {
    return this.prisma.user.create({ data: createUserData });
  }
}
