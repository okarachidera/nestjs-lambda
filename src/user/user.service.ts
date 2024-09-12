import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  // Create a new user
  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({
      data,
    });
  }

  // Get all users
  async getAllUsers(): Promise<User[]> {
    return this.prisma.user.findMany();
  }
  async testDatabaseConnection(): Promise<string> {
    try {
      await this.prisma.$connect();
      return 'Database connection successful!';
    } catch (error) {
      return `Database connection failed: ${error.message}`;
    }
  }
}
