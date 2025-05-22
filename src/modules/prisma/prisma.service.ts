import { Injectable } from '@nestjs/common';
import { PrismaClient } from './generated';

@Injectable()
export class PrismaService {
  private readonly prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async onModuleInit() {
    await this.prisma.$connect();
  }

  async onModuleDestroy() {
    await this.prisma.$disconnect();
  }

  get db() {
    return this.prisma;
  }
}
