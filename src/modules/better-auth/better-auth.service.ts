import { Injectable } from '@nestjs/common';
import { betterAuth } from 'better-auth';
import { FastifyRequest } from 'fastify';
import { PrismaService } from '../prisma/prisma.service';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { jwt, openAPI } from 'better-auth/plugins';
import { ConfigService } from '@nestjs/config';
import { AuthConfig } from '@/config/auth/config';
import { AppConfig } from '@/config/app/config';

@Injectable()
export class BetterAuthService {
  public readonly auth: ReturnType<typeof betterAuth>;

  constructor(
    readonly prisma: PrismaService,
    private readonly configService: ConfigService,
  ) {
    const { secret, url } = this.configService.getOrThrow<AuthConfig>('auth');
    const { cors } = this.configService.getOrThrow<AppConfig>('app');

    this.auth = betterAuth({
      database: prismaAdapter(prisma.db, { provider: 'sqlite' }),
      trustedOrigins: cors.origin,
      plugins: [openAPI(), jwt()],
      baseURL: url,
      secret,
    });
  }

  async handler(req: FastifyRequest) {
    const headers = new Headers();
    Object.entries(req.headers).forEach(([key, value]) => {
      if (value) headers.append(key, value instanceof Array ? value.toString() : value);
    });

    const url = new URL(req.url, `http://${req.headers.host}`);

    const request = new Request(url, {
      method: req.method,
      headers,
      body: req.body ? JSON.stringify(req.body) : undefined,
    });

    return await this.auth.handler(request);
  }
}
