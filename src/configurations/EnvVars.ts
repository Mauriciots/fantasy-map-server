/* eslint-disable node/no-process-env */

export default {
  nodeEnv: process.env.NODE_ENV ?? '',
  port: process.env.PORT ?? 0,
  cookieProps: {
    key: 'AccessToken',
    secret: process.env.COOKIE_SECRET ?? '',
    options: {
      httpOnly: true,
      signed: true,
      path: process.env.COOKIE_PATH ?? '',
      maxAge: Number(process.env.COOKIE_EXP ?? 0),
      domain: process.env.COOKIE_DOMAIN ?? '',
      secure: process.env.SECURE_COOKIE === 'true',
    },
  },
  jwt: {
    secret: process.env.JWT_SECRET ?? '',
    exp: process.env.COOKIE_EXP ?? '', // exp at the same time as the cookie
  },
  dbDialect: process.env.DB_DIALECT ?? '',
  dbHost: process.env.DB_HOST ?? '',
  dbUser: process.env.DB_USER ?? '',
  dbPassword: process.env.DB_PASSWORD ?? '',
  dbName: process.env.DB_NAME ?? '',
  sbProjectUrl: process.env.SB_PROJECT_URL ?? '',
  sbApiKey: process.env.SB_API_KEY ?? '',
  sbUploadsBucket: process.env.SB_UPLOADS_BUCKET ?? '',
} as const;
