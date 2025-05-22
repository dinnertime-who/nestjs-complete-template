import { Injectable } from "@nestjs/common";
import { PrismaClient } from "./generated";
import { PrismaBetterSQLite3 } from "@prisma/adapter-better-sqlite3";
@Injectable()
export class PrismaService {
  private readonly prisma: PrismaClient;
  constructor() {
    this.prisma = new PrismaClient({ adapter: new PrismaBetterSQLite3({}) });
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
