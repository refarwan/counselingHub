import { PrismaService } from "src/prisma.service";

import { LoginDto } from "./dto/login.dto";

import { CacheAccountDataType } from "../account/types/cache-account-data";

import {
	Inject,
	Injectable,
	NotFoundException,
	UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Cache, CACHE_MANAGER } from "@nestjs/cache-manager";

import { compareSync } from "bcrypt";
import { DateTime } from "luxon";

@Injectable()
export class AuthService {
	constructor(
		private prismaService: PrismaService,
		private jwtService: JwtService,
		@Inject(CACHE_MANAGER) private cacheManager: Cache,
	) {}

	async getCacheAccountData(
		username: string,
	): Promise<undefined | CacheAccountDataType> {
		const cacheAccountData: undefined | CacheAccountDataType =
			await this.cacheManager.get(`cacheAccountData:${username}`);
		if (cacheAccountData) return cacheAccountData;

		const account = await this.prismaService.account.findUnique({
			select: {
				id: true,
				fullname: true,
				profilePicture: true,
				role: true,
			},
			where: { username },
		});

		if (!account) return undefined;

		const accountData: CacheAccountDataType = {
			id: account.id,
			fullname: account.fullname,
			profilePicture: account.profilePicture
				? {
						small: `${process.env.APP_ORIGIN}/profile-picture/small/${account.profilePicture}`,
						medium: `${process.env.APP_ORIGIN}/profile-picture/medium/${account.profilePicture}`,
						large: `${process.env.APP_ORIGIN}/profile-picture/large/${account.profilePicture}`,
					}
				: null,
			role: account.role,
		};

		await this.cacheManager.set(`cacheAccountData:${username}`, accountData);
		return accountData;
	}

	private async createAccessToken(username: string): Promise<string> {
		const cacheAccountData = await this.getCacheAccountData(username);
		if (!cacheAccountData) return null;
		return this.jwtService.sign(
			{
				username,
				profilePicture: cacheAccountData.profilePicture,
				fullname: cacheAccountData.fullname,
				role: cacheAccountData.role,
			},
			{
				secret: process.env.ACCESS_TOKEN_SECRET,
				expiresIn: "5m",
			},
		);
	}

	private createRefreshToken(username: string): Promise<string> {
		return this.jwtService.signAsync(
			{
				username,
			},
			{
				secret: process.env.REFRESH_TOKEN_SECRET,
				expiresIn: "30d",
			},
		);
	}

	async login(
		data: LoginDto,
	): Promise<{ accessToken: string; refreshToken: string; expires: Date }> {
		const accountData = await this.prismaService.account.findFirst({
			select: {
				username: true,
				password: true,
			},
			where: {
				OR: [
					{ username: data.username },
					{ email: data.username },
					{ phoneNumber: data.username },
				],
			},
		});

		if (!accountData)
			throw new NotFoundException({
				message: {
					username: ["Username / email / nomor telepon tidak ditemukan"],
				},
			});

		const correctPassword = compareSync(data.password, accountData.password);
		if (!correctPassword)
			throw new UnauthorizedException({
				message: { password: ["Password salah"] },
			});

		const accessToken = await this.createAccessToken(accountData.username);
		const refreshToken = await this.createRefreshToken(accountData.username);

		const { exp } = this.jwtService.decode(refreshToken);
		const expires = DateTime.fromSeconds(exp).toJSDate();

		return { accessToken, refreshToken, expires };
	}

	async getNewAccessToken(
		refreshToken: string,
	): Promise<{ success: false } | { success: true; accessToken: string }> {
		const blacklistedRefreshToken = await this.cacheManager.get(
			`blacklistedRefreshToken:${refreshToken}`,
		);
		if (blacklistedRefreshToken) return { success: false };

		const payload: { username: string; iat: number; exp: number } | null =
			await this.jwtService
				.verifyAsync(refreshToken, {
					secret: process.env.REFRESH_TOKEN_SECRET,
				})
				.then((result) => result)
				.catch(() => null);

		if (!payload) return { success: false };

		const accessToken = await this.createAccessToken(payload.username);
		return { success: true, accessToken };
	}

	async logout(refreshToken: undefined | string): Promise<void> {
		if (!refreshToken)
			throw new UnauthorizedException({
				message: "Refresh token tidak ditemukan",
			});

		interface DecodedToken {
			username: string;
			iat: number;
			exp: number;
		}

		// try {
		const data: DecodedToken = this.jwtService.decode(refreshToken);

		const ttl = DateTime.fromSeconds(data.exp).diff(
			DateTime.now(),
		).milliseconds;

		await this.cacheManager.set(
			`blacklistedRefreshToken:${refreshToken}`,
			true,
			ttl,
		);
		// } catch {}

		// try {
		// 	interface DecodedAccessToken extends DecodedToken {
		// 		profilePicture: null | string;
		// 		fullname: string;
		// 		role: Role;
		// 	}
		// 	const data: DecodedAccessToken = this.jwtService.decode(accessToken);

		// 	const ttl = DateTime.fromSeconds(data.exp).diff(
		// 		DateTime.now(),
		// 	).milliseconds;

		// 	if (ttl > 0)
		// 		await this.cacheManager.set(
		// 			`blacklistedAccessToken:${accessToken}`,
		// 			true,
		// 			ttl,
		// 		);
		// } catch {}
	}
}
