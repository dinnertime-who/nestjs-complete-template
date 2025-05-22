import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './modules/prisma/prisma.module';
import { BetterAuthModule } from './modules/better-auth/better-auth.module';

@Module({
  imports: [PrismaModule, BetterAuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
