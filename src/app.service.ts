import { Injectable } from '@nestjs/common';
import { PrismaService } from './modules/prisma/prisma.service';

@Injectable()
export class AppService {
  constructor(private readonly prisma: PrismaService) {}

  async getHello() {
    const user = await this.prisma.db.user.findMany();
    return user;
  }
}
