import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';
import { PostService } from './post/post.service';
import { PostController } from './post/post.controller';
import { PostModule } from './post/post.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [PostModule, UserModule],
  controllers: [AppController, UserController, PostController],
  providers: [AppService, UserService, PostService],
})
export class AppModule {}
