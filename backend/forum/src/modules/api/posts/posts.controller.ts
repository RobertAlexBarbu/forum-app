import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Req,
  Put,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { IsAuthGuard } from '../../../shared/guards/is-auth.guard';
import { IsAdminGuard } from '../../../shared/guards/is-admin.guard';
import {CanEditPostGuard} from "../../../shared/guards/can-edit-post.guard";

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @UseGuards(IsAuthGuard)
  create(@Body() createPostDto: CreatePostDto, @Req() req) {
    return this.postsService.create(createPostDto, req.user.id);
  }

  @Get('forum/:id')
  findAllByForum(@Param('id') id: string) {
    return this.postsService.findAllByForum(+id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(+id);
  }

  @Put(':id')
  @UseGuards(IsAuthGuard, CanEditPostGuard)
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update(+id, updatePostDto);
  }

  @Delete(':id')
  @UseGuards(IsAuthGuard, IsAdminGuard)
  remove(@Param('id') id: string) {
    return this.postsService.remove(+id);
  }

  @Post('likes/:id')
  @UseGuards(IsAuthGuard)
  likePost(@Param('id') id: string, @Req() req) {
    return this.postsService.likePost(+id, req.user.id);
  }

  @Delete('likes/:id')
  @UseGuards(IsAuthGuard)
  dislikePost(@Param('id') id: string, @Req() req) {
    return this.postsService.dislikePost(+id, req.user.id);
  }


}
