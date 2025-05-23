export const appConfig = () => ({
  app: {
    port: parseInt(process.env.APP_PORT || '3000', 10),
    cors: {
      origin: process.env.CORS_ORIGIN?.split(',').map((origin) => origin.trim()) || ['*'],
    },
  },
});

export type AppConfig = ReturnType<typeof appConfig>['app'];
