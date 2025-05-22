import { Injectable } from '@nestjs/common';
import { betterAuth } from 'better-auth';
import { FastifyRequest } from 'fastify';
import { PrismaService } from '../prisma/prisma.service';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { jwt, openAPI } from 'better-auth/plugins';

@Injectable()
export class BetterAuthService {
  public readonly auth: ReturnType<typeof betterAuth>;

  constructor(readonly prisma: PrismaService) {
    this.auth = betterAuth({
      database: prismaAdapter(prisma.db, { provider: 'sqlite' }),
      trustedOrigins: ['http://localhost:3000'],
      plugins: [openAPI(), jwt()],
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
