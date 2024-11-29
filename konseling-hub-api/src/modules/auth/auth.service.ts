import { PrismaService } from "src/prisma.service";

import { LoginDto } from "./dto/login.dto";

import { CacheAccountDataType } from "../types/cache-account-data";

import {
	BadRequestException,
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
			profilePicture: account.profilePicture,
			role: account.role,
		};

		await this.cacheManager.set(`cacheAccountData:${username}`, accountData);
		return accountData;
	}

	private async createAccessToken(username: string): Promise<null | string> {
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
				expiresIn: "10m",
			},
		);
	}

	private createRefreshToken(username: string) {
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
		if (!accessToken)
			throw new BadRequestException({ message: "Gagal membuat access token" });

		const refreshToken = await this.createRefreshToken(accountData.username);

		const { exp } = this.jwtService.decode(refreshToken);
		const expires = DateTime.fromSeconds(exp).toJSDate();

		return { accessToken, refreshToken, expires };
	}
}
