import { PinoLoggerOptions } from 'fastify/types/logger';

export function consoleLoggingConfig(): PinoLoggerOptions {
  return {
    messageKey: 'msg',
    transport: {
      target: 'pino-pretty',
      options: {
        singleLine: true,
        ignore: 'req.id,req.headers,req.remoteAddress,req.remotePort,res.headers',
      },
    },
  };
}
