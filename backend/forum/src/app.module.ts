import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { UsersModule } from './modules/users/users.module';
import { defineConfig } from '@mikro-orm/postgresql';
import { Posts } from './modules/posts/entities/Posts';
import { AppUser } from './modules/users/entities/AppUser';
import { Role } from './modules/users/entities/Role';
import { CryptoService } from './services/crypto/crypto.service';
import { AuthModule } from './modules/auth/auth.module';
import { ForumsModule } from './modules/forums/forums.module';
import { Categories } from './modules/forums/entities/Categories';
import { Forums } from './modules/forums/entities/Forums';
import { PostsModule } from './modules/posts/posts.module';
import { CommentsModule } from './modules/comments/comments.module';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [
    ConfigModule.forRoot(),
    MikroOrmModule.forRoot(
      defineConfig({
        entities: [Posts, AppUser, Role, Categories, Forums],
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
