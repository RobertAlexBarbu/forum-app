"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const nestjs_1 = require("@mikro-orm/nestjs");
const users_module_1 = require("./modules/api/users/users.module");
const postgresql_1 = require("@mikro-orm/postgresql");
const Post_1 = require("./modules/api/posts/entities/Post");
const User_1 = require("./modules/api/users/entities/User");
const Role_1 = require("./modules/api/users/entities/Role");
const crypto_service_1 = require("./modules/global/crypto/crypto.service");
const auth_module_1 = require("./modules/api/auth/auth.module");
const forums_module_1 = require("./modules/api/forums/forums.module");
const Category_1 = require("./modules/api/forums/entities/Category");
const Forum_1 = require("./modules/api/forums/entities/Forum");
const posts_module_1 = require("./modules/api/posts/posts.module");
const comments_module_1 = require("./modules/api/comments/comments.module");
const config_1 = require("@nestjs/config");
const firebase_module_1 = require("./modules/global/firebase/firebase.module");
const profile_module_1 = require("./modules/api/profile/profile.module");
const email_module_1 = require("./modules/global/email/email.module");
const PostLike_1 = require("./modules/api/posts/entities/PostLike");
const Comment_1 = require("./modules/api/comments/entities/Comment");
const process = require("process");
const serve_static_1 = require("@nestjs/serve-static");
const path = require("path");
const fs = require("fs");
let AppModule = class AppModule {
    constructor() {
        console.log('aaa');
        const cs = fs.readFileSync('/Users/robertbarbu/Downloads/ca-certificate.crt').toString();
        console.log(cs);
        console.log('hey');
    }
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot(),
            nestjs_1.MikroOrmModule.forRoot((0, postgresql_1.defineConfig)({
                entities: [Post_1.Post, PostLike_1.PostLike, User_1.User, Role_1.Role, Category_1.Category, Forum_1.Forum, Comment_1.Comment],
                clientUrl: process.env.DATABASE_URL,
                forceUtcTimezone: true,
                driverOptions: {
                    ssl: {
                        ca: fs.readFileSync('/Users/robertbarbu/Downloads/ca-certificate.crt').toString()
                    }
                }
            })),
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: path.join(__dirname, '..', '..', '..', '..', 'frontend', 'dist', 'forum-app/'),
            }),
            users_module_1.UsersModule,
            auth_module_1.AuthModule,
            forums_module_1.ForumsModule,
            posts_module_1.PostsModule,
            profile_module_1.ProfileModule,
            comments_module_1.CommentsModule,
            firebase_module_1.FirebaseModule,
            email_module_1.EmailModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService, crypto_service_1.CryptoService],
    }),
    __metadata("design:paramtypes", [])
], AppModule);
//# sourceMappingURL=app.module.js.map