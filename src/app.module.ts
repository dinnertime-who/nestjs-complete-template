import { Module } from '@nestjs/common';
import { PrismaModule } from './modules/prisma/prisma.module';
import { BetterAuthModule } from './modules/better-auth/better-auth.module';
import { ConfigModule } from './config';

@Module({
  imports: [PrismaModule, BetterAuthModule, ConfigModule],
})
export class AppModule {}
