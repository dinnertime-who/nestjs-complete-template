export const appConfig = () => ({
  app: {
    port: parseInt(process.env.PORT || '3000', 10),
    cors: {
      origin: process.env.CORS_ORIGIN || '*',
    },
  },
});

export type AppConfig = ReturnType<typeof appConfig>['app'];
