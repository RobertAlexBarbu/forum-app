import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ForumsService } from './forums.service';
import { CreateForumDto } from './dto/create-forum.dto';
import { UpdateForumDto } from './dto/update-forum.dto';
import { IsAdminGuard } from '../../../shared/guards/is-admin.guard';
import { IsAuthGuard } from '../../../shared/guards/is-auth.guard';

@Controller('forums')
export class ForumsController {
  constructor(private readonly forumsService: ForumsService) {}

  @Post()
  @UseGuards(IsAuthGuard, IsAdminGuard)
  create(@Body() createForumDto: CreateForumDto) {
    return this.forumsService.create(createForumDto);
  }

  @Get()
  findAll() {
    return this.forumsService.findAll();
  }

  @Get('trending')
  findTrending() {
    return this.forumsService.findTrending();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.forumsService.findOne(+id);
  }

  @Get('edit/:id')
  findOneForEdit(@Param('id') id: string) {
    return this.forumsService.findOneForEdit(+id);
  }

  @Put(':id')
  @UseGuards(IsAuthGuard, IsAdminGuard)
  update(@Param('id') id: string, @Body() updateForumDto: UpdateForumDto) {
    return this.forumsService.update(+id, updateForumDto);
  }

  @Delete(':id')
  @UseGuards(IsAuthGuard, IsAdminGuard)
  remove(@Param('id') id: string) {
    return this.forumsService.remove(+id);
  }
}
