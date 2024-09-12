import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './prisma/prisma.service';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // This makes the .env available globally
    }),
    UserModule,
  ],
  providers: [PrismaService],
})
export class AppModule {}
