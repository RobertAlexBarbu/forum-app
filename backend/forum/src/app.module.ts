import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { UsersModule } from './modules/api/users/users.module';
import { defineConfig } from '@mikro-orm/postgresql';
import { Posts } from './modules/api/posts/entities/Posts';
import { User } from './modules/api/users/entities/User';
import { Role } from './modules/api/users/entities/Role';
import { CryptoService } from './modules/global/crypto/crypto.service';
import { AuthModule } from './modules/api/auth/auth.module';
import { ForumsModule } from './modules/api/forums/forums.module';
import { Categories } from './modules/api/forums/entities/Categories';
import { Forums } from './modules/api/forums/entities/Forums';
import { PostsModule } from './modules/api/posts/posts.module';
import { CommentsModule } from './modules/api/comments/comments.module';
import { ConfigModule } from '@nestjs/config';
import {FirebaseService} from "./modules/global/firebase/firebase.service";


@Module({
  imports: [
    ConfigModule.forRoot(),
    MikroOrmModule.forRoot(
      defineConfig({
        entities: [Posts, User, Role, Categories, Forums],
        dbName: 'forum',
        forceUtcTimezone: true,
      }),
    ),
    UsersModule,
    AuthModule,
    ForumsModule,
    PostsModule,
    CommentsModule,
  ],
  controllers: [AppController],
  providers: [AppService, CryptoService],
})
export class AppModule {}
