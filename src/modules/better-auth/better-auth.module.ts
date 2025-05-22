import { Module } from '@nestjs/common';
import { BetterAuthService } from './better-auth.service';
import { BetterAuthController } from './better-auth.controller';

@Module({
  providers: [BetterAuthService],
  controllers: [BetterAuthController],
})
export class BetterAuthModule {}
