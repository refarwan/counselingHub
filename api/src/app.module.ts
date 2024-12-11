import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AccountModule } from "./modules/account/account.module";
import { AuthModule } from "./modules/auth/auth.module";

import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { CacheModule } from "@nestjs/cache-manager";
import { JwtModule } from "@nestjs/jwt";

import { redisStore } from "cache-manager-ioredis-yet";
import { ProfilePictureModule } from './modules/profile-picture/profile-picture.module';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
		}),
		AccountModule,
		AuthModule,
		CacheModule.register({
			isGlobal: true,
			store: redisStore,
			host: process.env.REDIS_HOST,
			port: +process.env.REDIS_PORT,
			username: process.env.REDIS_USERNAME,
			password: process.env.REDIS_PASSWORD,
			ttl: 24 * 3600 * 1000,
		}),
		JwtModule.register({ global: true }),
		ProfilePictureModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
