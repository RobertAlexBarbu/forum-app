import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete, UseGuards, Req, Put,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import {AuthGuard} from "@nestjs/passport";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  // @UseGuards(JwtAuthGuard)
  // @Post()
  // create(@Body() createPostDto: CreatePostDto, @Req() req) {
  //   return this.postsService.create(createPostDto, req.user.id);
  // }

  @Get('forum/:id')
  findAllByForum(@Param('id') id: string) {
    return this.postsService.findAllByForum(+id);
  }
  //
  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.postsService.findOne(+id);
  // }
  //
  // @Put(':id')
  // @UseGuards(JwtAuthGuard)
  // update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
  //   return this.postsService.update(+id, updatePostDto);
  // }
  //
  //
  // @Post('likes/:id')
  // @UseGuards(JwtAuthGuard)
  // likePost(@Param('id') id: string, @Req() req) {
  //   console.log('HEEEY');
  //   return this.postsService.likePost(+id, req.user.id);
  // }
  //
  //
  // @Delete('likes/:id')
  // @UseGuards(JwtAuthGuard)
  // dislikePost(@Param('id') id: string, @Req() req) {
  //   return this.postsService.dislikePost(+id, req.user.id);
  // }
  //
  // @Delete(':id')
  // @UseGuards(JwtAuthGuard)
  // remove(@Param('id') id: string) {
  //   return this.postsService.remove(+id);
  // }
}
