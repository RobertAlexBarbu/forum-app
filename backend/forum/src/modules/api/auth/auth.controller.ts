import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { IsAuthGuard } from '../../../shared/guards/is-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Req() req) {
    return this.authService.login(req.body.id);
  }

  @Post('check')
  @UseGuards(IsAuthGuard)
  async check(@Req() req) {
    return req.user;
  }
}
