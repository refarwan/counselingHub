import * as path from "path";
import { writeFileSync, unlinkSync, existsSync } from "fs";

import { PrismaService } from "src/prisma.service";
import { AuthService } from "../auth/auth.service";
import { JwtService } from "@nestjs/jwt";

import { CacheAccountDataType } from "../types/cache-account-data";
import AccountData from "./types/account-data";
import { AllProvince } from "./types/all-province";
import { EditAccountResponse } from "./types/edit-account-response";

import { RegisterDto } from "./dto/register.dto";
import { EditAccountDto } from "./dto/edit-account.dto";

import {
	BadRequestException,
	ConflictException,
	Inject,
	Injectable,
	InternalServerErrorException,
	NotFoundException,
} from "@nestjs/common";
import { CACHE_MANAGER, Cache } from "@nestjs/cache-manager";

import { hashSync } from "bcrypt";
import { randomBytes } from "crypto";
import { DateTime } from "luxon";
import * as sharp from "sharp";

@Injectable()
export class AccountService {
	constructor(
		private prismaService: PrismaService,
		@Inject(CACHE_MANAGER) private cacheManager: Cache,
		private authService: AuthService,
		private jwtService: JwtService,
	) {}

	private async availabilityEmailCheck(email: string): Promise<boolean> {
		const accountCount = await this.prismaService.account.count({
			where: {
				email,
			},
		});

		return !accountCount ? true : false;
	}

	async register(data: RegisterDto): Promise<{ message: string }> {
		if (data.password !== data.confirmPassword)
			throw new BadRequestException({
				message: { confirmPassword: ["Konfirmasi password tidak sama"] },
			});

		type ErrorParams = {
			email?: string[];
		};
		const errorParams: ErrorParams = {};

		if (!(await this.availabilityEmailCheck(data.email)))
			errorParams.email = ["email tidak tersedia"];

		if (Object.keys(errorParams).length)
			throw new ConflictException({ message: errorParams });

		const account = await this.prismaService.account.create({
			data: {
				username: randomBytes(16).toString("hex"),
				email: data.email,
				fullname: data.fullname,
				password: hashSync(data.password, 10),
			},
		});

		if (!account)
			throw new InternalServerErrorException({
				message: "Server gagal membuat akun",
			});

		const accountData: CacheAccountDataType = {
			id: account.id,
			fullname: data.fullname,
			profilePicture: null,
			role: account.role,
		};

		this.cacheManager.set(`cacheAccountData:${account.username}`, accountData);

		return { message: "Berhasil membuat akun" };
	}

	async getAccoutData(id: number): Promise<AccountData> {
		const accountData = await this.prismaService.account.findFirst({
			select: {
				profilePicture: true,
				username: true,
				email: true,
				phoneNumber: true,
				fullname: true,
				birthday: true,
				gender: true,
				address: true,
				Regency: {
					select: {
						id: true,
						name: true,
						Province: {
							select: {
								id: true,
								name: true,
							},
						},
					},
				},
				education: true,
				profession: true,
			},
			where: {
				id,
			},
		});

		if (!accountData)
			throw new NotFoundException({ message: "Akun tidak ditemukan" });
		return {
			profilePicture: null,
			username: accountData.username,
			email: accountData.email,
			phoneNumber: accountData.phoneNumber,
			fullname: accountData.fullname,
			birthday: accountData.birthday
				? DateTime.fromJSDate(accountData.birthday).toISODate()
				: null,
			gender: accountData.gender,
			address: accountData.address,
			regency: accountData.Regency,
			province: accountData.Regency ? accountData.Regency.Province : null,
			education: accountData.education,
			profession: accountData.profession,
		};
	}

	async getAllProvince(): Promise<AllProvince> {
		const allProvince = await this.prismaService.province.findMany({
			select: {
				id: true,
				name: true,
				Regency: {
					select: {
						id: true,
						name: true,
					},
				},
			},
		});

		return allProvince;
	}

	async editMyAccount({
		accountId,
		newValue,
		files,
		refreshToken,
	}: {
		accountId: number;
		newValue: EditAccountDto;
		files?: { profilePicture?: Express.Multer.File[] };
		refreshToken: undefined | string;
	}): Promise<EditAccountResponse> {
		if (!files && !Object.keys(newValue).length)
			throw new BadRequestException({ message: "Tidak ada data yang dirubah" });

		if (newValue.username) {
			const usernameCount = await this.prismaService.account.count({
				where: {
					username: newValue.username,
					id: {
						not: accountId,
					},
				},
			});

			if (usernameCount)
				throw new BadRequestException({ message: "Username tidak tersedia" });
		}

		if (newValue.email) {
			const emailCount = await this.prismaService.account.count({
				where: {
					email: newValue.email,
					id: {
						not: accountId,
					},
				},
			});

			if (emailCount)
				throw new BadRequestException({ message: "Email tidak tersedia" });
		}

		if (newValue.phoneNumber) {
			const phoneNumberCount = await this.prismaService.account.count({
				where: {
					phoneNumber: newValue.phoneNumber,
					id: {
						not: accountId,
					},
				},
			});

			if (phoneNumberCount)
				throw new BadRequestException({
					message: "Nomor telepon tidak tersedia",
				});
		}

		const currentAccountData = await this.prismaService.account.findUnique({
			select: {
				profilePicture: true,
				role: true,
				username: true,
			},
			where: {
				id: accountId,
			},
		});

		let profilePicture: undefined | null | string = undefined;

		if (files.profilePicture) {
			if (
				files.profilePicture[0].mimetype !== "image/jpeg" &&
				files.profilePicture[0].mimetype !== "image/png"
			)
				throw new BadRequestException({
					message: {
						profilePicture: [
							"Hanya file dengan ekstensi JPEG atau PNG yang diijinkan",
						],
					},
				});

			const filename = randomBytes(16).toString("hex");
			const extension = path.extname(files.profilePicture[0].originalname);
			profilePicture = filename + extension;

			const pathname = "./user-files/profile-picture";

			const small = await sharp(files.profilePicture[0].buffer)
				.resize({ fit: "cover", width: 180, height: 180 })
				.toBuffer();

			writeFileSync(`${pathname}/small/${profilePicture}`, small);

			const medium = await sharp(files.profilePicture[0].buffer)
				.resize({ fit: "cover", width: 300, height: 300 })
				.toBuffer();

			writeFileSync(`${pathname}/medium/${profilePicture}`, medium);

			const large = await sharp(files.profilePicture[0].buffer)
				.resize({ fit: "cover", width: 500, height: 500 })
				.toBuffer();

			writeFileSync(`${pathname}/large/${profilePicture}`, large);

			if (currentAccountData.profilePicture) {
				const oldSmall = `./user-files/profile-picture/small/${currentAccountData.profilePicture}`;
				if (existsSync(oldSmall)) unlinkSync(oldSmall);

				const oldMedium = `./user-files/profile-picture/medium/${currentAccountData.profilePicture}`;
				if (existsSync(oldMedium)) unlinkSync(oldMedium);

				const oldLarge = `./user-files/profile-picture/large/${currentAccountData.profilePicture}`;
				if (existsSync(oldLarge)) unlinkSync(oldLarge);
			}
		}

		let data = { ...newValue, profilePicture };
		const editAccount = await this.prismaService.account.update({
			data,
			where: {
				id: accountId,
			},
		});

		if (!editAccount)
			throw new InternalServerErrorException({
				message: "Server gagal mengedit akun",
			});

		if (newValue.username) {
			this.cacheManager.del(`cacheAccountData:currentAccountData.username`);

			const accountData: CacheAccountDataType = {
				id: accountId,
				fullname: newValue.fullname,
				profilePicture: profilePicture,
				role: currentAccountData.role,
			};

			await this.cacheManager.set(
				`cacheAccountData:${newValue.username}`,
				accountData,
			);

			try {
				type DecodedType = { username: string; iat: number; exp: number };
				const data: DecodedType = this.jwtService.decode(refreshToken);

				const ttl = DateTime.fromSeconds(data.exp).diff(
					DateTime.now(),
				).milliseconds;

				await this.cacheManager.set(
					`blacklistedRefreshToken:${refreshToken}`,
					true,
					ttl,
				);
			} catch {}

			return { reAuthenticate: "all" };
		}

		if (newValue.fullname || profilePicture) {
			const accountData: CacheAccountDataType = {
				id: accountId,
				fullname: newValue.fullname,
				profilePicture: profilePicture,
				role: currentAccountData.role,
			};

			await this.cacheManager.set(
				`cacheAccountData:${currentAccountData.username}`,
				accountData,
			);

			const accessToken = await this.authService.createAccessToken(
				currentAccountData.username,
			);

			return { reAuthenticate: "accessToken", accessToken };
		}
		return { reAuthenticate: false };
	}
}
