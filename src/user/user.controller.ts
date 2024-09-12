import { Controller, Get, Post, Body } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() data: Prisma.UserCreateInput) {
    console.log('Received POST request data:', data); // Add logging
    return this.userService.createUser(data);
  }

  @Get('test')
  getTest() {
    return { message: 'Test route is working' };
  }
}
