import {
  Body,
  Controller,
  Get,
  HttpException,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/CreateUserDto';
import { UpdateUserDto } from './dto/UpdateUserDto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  @UsePipes(ValidationPipe)
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Get()
  getManyUsers() {
    return this.userService.getManyUsers();
  }

  @Get(':id')
  async getOneUserById(@Param('id', ParseIntPipe) id: number) {
    const user = await this.userService.getOneUserById(id);
    if (!user) {
      throw new HttpException('User Not Found', 404);
    }

    return user;
  }

  @Put(':id')
  async updateOneUserById(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.updateOneUserById(id, updateUserDto);
  }
}
