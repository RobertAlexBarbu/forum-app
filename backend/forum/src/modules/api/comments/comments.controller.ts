import {
  Controller,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { IsAuthGuard } from '../../../shared/guards/is-auth.guard';
import { IsAdminGuard } from '../../../shared/guards/is-admin.guard';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @UseGuards(IsAuthGuard)
  @Post()
  create(@Body() createCommentDto: CreateCommentDto, @Req() req) {
    return this.commentsService.create(
      createCommentDto,
      req.user.id,
      req.user.username,
    );
  }

  @Delete(':id')
  @UseGuards(IsAuthGuard, IsAdminGuard)
  remove(@Param('id') id: string) {
    return this.commentsService.remove(+id);
  }
}
