export const authConfig = () => ({
  auth: {
    secret: process.env.BETTER_AUTH_SECRET,
    url: process.env.BETTER_AUTH_URL,
  },
});

export type AuthConfig = ReturnType<typeof authConfig>['auth'];
