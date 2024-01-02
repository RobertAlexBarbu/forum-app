import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { IsAuthGuard } from '../../../shared/guards/is-auth.guard';
import { UpdateToAdminDto } from './dto/update-to-admin.dto';
import { IsAdminGuard } from '../../../shared/guards/is-admin.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get('admins')
  @UseGuards(IsAuthGuard, IsAdminGuard)
  findAllAdmins() {
    return this.usersService.findAllAdmins();
  }

  @Post('admins')
  @UseGuards(IsAuthGuard, IsAdminGuard)
  updateToAdmin(@Body() updateToAdminDto: UpdateToAdminDto) {
    return this.usersService.updateToAdmin(updateToAdminDto);
  }
  @Put('admins/:id')
  @UseGuards(IsAuthGuard, IsAdminGuard)
  demoteAdmin(@Param('id') id: string) {
    return this.usersService.demoteAdmin(id);
  }
}
