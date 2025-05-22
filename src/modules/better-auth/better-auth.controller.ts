import { All, Controller, Req, Res } from '@nestjs/common';
import { BetterAuthService } from './better-auth.service';
import { FastifyReply, FastifyRequest } from 'fastify';

@Controller()
export class BetterAuthController {
  constructor(private readonly betterAuthService: BetterAuthService) {}

  @All('api/auth/*')
  async auth(@Req() req: FastifyRequest, @Res() res: FastifyReply) {
    const response = await this.betterAuthService.handler(req);
    res.status(response.status);
    response.headers.forEach((value, key) => res.header(key, value));
    res.send(response.body ? await response.text() : null);
  }
}
