import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete, UseGuards, Put, Req,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {AuthGuard} from "@nestjs/passport";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {UpdateToAdminDto} from "./dto/update-to-admin.dto";


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
  //
  // @Get('admins')
  // @UseGuards(JwtAuthGuard)
  // findAllAdmins() {
  //   return this.usersService.findAllAdmins()
  // }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  // @Post('admins')
  // updateToAdmin(@Body() updateToAdminDto: UpdateToAdminDto) {
  //   console.log(updateToAdminDto);
  //   return this.usersService.updateToAdmin(updateToAdminDto);
  // }
  // @Put('admins/:id')
  // demoteAdmin(@Param('id') id: string) {
  //   return this.usersService.demoteAdmin(id);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
