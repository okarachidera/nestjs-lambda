import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }

  // Type assertion to bypass the issue
  async enableShutdownHooks(app: any) {
    (this.$on as any)('beforeExit', async () => {
      // Use 'as any' for type assertion
      await app.close();
    });
  }
}
