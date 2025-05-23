import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import helmet from 'helmet';
import { ConfigService } from '@nestjs/config';
import { AppConfig } from './config/app/config';
import { consoleLoggingConfig } from './tools/logger/logger-factory';

async function bootstrap() {
  /**
   * FastifyAdapter는 Fastify 애플리케이션을 생성하는데 사용됩니다.
   * 이는 NestJS 애플리케이션을 제공하는 Fastify 프레임워크의 래퍼입니다.
   */
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: consoleLoggingConfig() }),
  );

  /**
   * ConfigService는 애플리케이션 구성을 관리하는데 사용됩니다.
   * 이는 애플리케이션 구성을 로드하고 제공하는 서비스입니다.
   */
  const configService = app.get(ConfigService);
  const appConfig = configService.getOrThrow<AppConfig>('app');

  /**
   * Cross-Origin Resource Sharing (CORS) 설정
   * 허용도메인: * (모든 도메인)
   * 허용메서드: GET, PATCH, POST, PUT, DELETE, OPTIONS, HEAD
   * 허용헤더: Content-Type, Authorization, X-Requested-With, Accept
   * 자격증명: true
   */
  app.enableCors({
    origin: appConfig.cors.origin,
    methods: ['GET', 'PATCH', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'HEAD'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
    credentials: true,
  });

  /**
   * Helmet은 보안 헤더를 설정하는데 사용됩니다.
   * 이는 웹 애플리케이션의 보안을 강화하는데 도움이 됩니다.
   */
  app.use(
    helmet({
      contentSecurityPolicy: false,
    }),
  );

  /**
   * 서버 실행
   * 포트: 3000
   * 호스트: 0.0.0.0
   */
  await app.listen(appConfig.port, '0.0.0.0');
}
void bootstrap();
