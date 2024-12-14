import * as path from "path";
import { writeFileSync, unlinkSync, existsSync } from "fs";

import { PrismaService } from "src/prisma.service";

import { CacheAccountDataType } from "./types/cache-account-data";
import AccountData from "./types/account-data";
import { AllProvince } from "./types/all-province";

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
import { Gender } from "@prisma/client";

@Injectable()
export class AccountService {
	constructor(
		private prismaService: PrismaService,
		@Inject(CACHE_MANAGER) private cacheManager: Cache,
	) {}

	async register(data: RegisterDto): Promise<{ message: string }> {
		if (data.password !== data.confirmPassword)
			throw new BadRequestException({
				message: { confirmPassword: ["Konfirmasi password tidak sama"] },
			});

		const emailCount = await this.prismaService.account.count({
			where: {
				email: data.email,
			},
		});

		if (emailCount)
			throw new ConflictException({
				message: {
					email: ["email tidak tersedia"],
				},
			});

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

	async getMyProfile(id: number): Promise<AccountData> {
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
			profilePicture: accountData.profilePicture
				? {
						small: `${process.env.APP_ORIGIN}profile-picture/small/${accountData.profilePicture}`,
						medium: `${process.env.APP_ORIGIN}profile-picture/medium/${accountData.profilePicture}`,
						large: `${process.env.APP_ORIGIN}profile-picture/large/${accountData.profilePicture}`,
					}
				: null,
			username: accountData.username,
			email: accountData.email,
			phoneNumber: accountData.phoneNumber,
			fullname: accountData.fullname,
			birthday: accountData.birthday
				? DateTime.fromJSDate(accountData.birthday).toISODate()
				: null,
			gender: accountData.gender,
			address: accountData.address,
			regency: accountData.Regency
				? { name: accountData.Regency.name, id: accountData.Regency.id }
				: null,
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
		data,
		files,
	}: {
		accountId: number;
		data: EditAccountDto;
		files?: { profilePicture?: Express.Multer.File[] };
	}): Promise<{ reAuthenticate: boolean }> {
		const currentAccountData = await this.prismaService.account.findUnique({
			select: {
				username: true,
				email: true,
				phoneNumber: true,
				role: true,
				fullname: true,
				birthday: true,
				gender: true,
				address: true,
				regencyId: true,
				education: true,
				profession: true,
				profilePicture: true,
			},
			where: {
				id: accountId,
			},
		});

		type DataEdit = {
			username?: string;
			email?: string;
			phoneNumber?: string;
			fullname?: string;
			birthday?: string;
			gender?: Gender;
			address?: string;
			regencyId?: number;
			education?: string;
			profession?: string;
			profilePicture?: string;
		};

		const dataEdit: DataEdit = {};

		if (data.username && data.username !== currentAccountData.username) {
			const usernameCount = await this.prismaService.account.count({
				where: { username: data.username },
			});

			if (usernameCount)
				throw new BadRequestException({
					message: { username: ["Username tidak tersedia"] },
				});
			dataEdit.username = data.username;
		}

		if (data.email && data.email !== currentAccountData.email) {
			const emailCount = await this.prismaService.account.count({
				where: { email: data.email },
			});

			if (emailCount)
				throw new BadRequestException({
					message: { email: ["Email tidak tersedia"] },
				});

			dataEdit.email = data.email;
		}

		if (
			data.phoneNumber &&
			data.phoneNumber !== currentAccountData.phoneNumber
		) {
			const phoneNumberCount = await this.prismaService.account.count({
				where: { phoneNumber: data.phoneNumber },
			});

			if (phoneNumberCount)
				throw new BadRequestException({
					message: { phoneNumber: ["Nomor telepon tidak tersedia"] },
				});

			dataEdit.phoneNumber = data.phoneNumber;
		}

		if (data.fullname && data.fullname !== currentAccountData.fullname)
			dataEdit.fullname = data.fullname;
		if (
			data.birthday &&
			data.birthday !==
				DateTime.fromJSDate(currentAccountData.birthday).toFormat("yyyy-mm-dd")
		)
			dataEdit.birthday = data.birthday;
		if (data.gender && data.gender !== currentAccountData.gender)
			dataEdit.gender = data.gender;
		if (data.address && data.address !== currentAccountData.address)
			dataEdit.address = data.address;
		if (data.regencyId && data.regencyId !== currentAccountData.regencyId)
			dataEdit.regencyId = data.regencyId;
		if (data.education && data.education !== currentAccountData.education)
			dataEdit.education = data.education;
		if (data.profession && data.profession !== currentAccountData.profession)
			dataEdit.profession = data.profession;

		if (!files.profilePicture && !Object.keys(dataEdit).length)
			throw new BadRequestException({ message: "Tidak ada data yang dirubah" });

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
		const editAccount = await this.prismaService.account.update({
			data: { ...dataEdit, profilePicture },
			where: {
				id: accountId,
			},
		});

		if (!editAccount)
			throw new InternalServerErrorException({
				message: "Server gagal mengedit akun",
			});

		if (dataEdit.username) {
			this.cacheManager.del(`cacheAccountData:currentAccountData.username`);

			const accountData: CacheAccountDataType = {
				id: accountId,
				fullname: data.fullname,
				profilePicture: profilePicture
					? {
							small: `${process.env.APP_ORIGIN}/profile-picture/small/${profilePicture}`,
							medium: `${process.env.APP_ORIGIN}/profile-picture/medium/${profilePicture}`,
							large: `${process.env.APP_ORIGIN}/profile-picture/large/${profilePicture}`,
						}
					: null,
				role: currentAccountData.role,
			};

			await this.cacheManager.set(
				`cacheAccountData:${data.username}`,
				accountData,
			);

			return { reAuthenticate: true };
		}

		if (data.fullname || profilePicture) {
			const accountData: CacheAccountDataType = {
				id: accountId,
				fullname: data.fullname,
				profilePicture: profilePicture
					? {
							small: `${process.env.APP_ORIGIN}/profile-picture/small/${profilePicture}`,
							medium: `${process.env.APP_ORIGIN}/profile-picture/medium/${profilePicture}`,
							large: `${process.env.APP_ORIGIN}/profile-picture/large/${profilePicture}`,
						}
					: null,
				role: currentAccountData.role,
			};

			await this.cacheManager.set(
				`cacheAccountData:${currentAccountData.username}`,
				accountData,
			);
		}
		return { reAuthenticate: false };
	}
}
