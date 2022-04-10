declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: string;
    PORT: string;
  }

  interface IDatabase {
    DATABASE_URL: string;
  }

  interface IAuth {
    JWT: {
      AUTH_JWT_SECRET: string;
      AUTH_ACCESS_TOKEN_LIFETIME: string;
      AUTH_REFRESH_TOKEN_LIFETIME: string;
    };
  }
}
