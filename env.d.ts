declare namespace NodeJS {
	interface ProcessEnv {
		DATABASE_URL: string;
		ALLOWED_ORIGIN: string;

		REDIS_HOST: string;
		REDIS_PORT: string;
		REDIS_USERNAME: string;
		REDIS_PASSWORD: string;

		ACCESS_TOKEN_SECRET: string;
		REFRESH_TOKEN_SECRET: string;
		IS_HTTPS: string;

		APP_ORIGIN: string;
	}
}
