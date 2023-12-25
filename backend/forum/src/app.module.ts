import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { UsersModule } from './modules/api/users/users.module';
import { defineConfig } from '@mikro-orm/postgresql';
import { Post } from './modules/api/posts/entities/Post';
import { User } from './modules/api/users/entities/User';
import { Role } from './modules/api/users/entities/Role';
import { CryptoService } from './modules/global/crypto/crypto.service';
import { AuthModule } from './modules/api/auth/auth.module';
import { ForumsModule } from './modules/api/forums/forums.module';
import { Category } from './modules/api/forums/entities/Category';
import { Forum } from './modules/api/forums/entities/Forum';
import { PostsModule } from './modules/api/posts/posts.module';
import { CommentsModule } from './modules/api/comments/comments.module';
import { ConfigModule } from '@nestjs/config';
import {FirebaseModule} from "./modules/global/firebase/firebase.module";


@Module({
  imports: [
    ConfigModule.forRoot(),
    MikroOrmModule.forRoot(
      defineConfig({
        entities: [Post, User, Role, Category, Forum],
        dbName: 'forum',
        forceUtcTimezone: true,
      }),
    ),
    UsersModule,
    AuthModule,
    ForumsModule,
    PostsModule,
    CommentsModule,
    FirebaseModule
  ],
  controllers: [AppController],
  providers: [AppService, CryptoService],
})
export class AppModule {}
