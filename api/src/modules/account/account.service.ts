import { PrismaService } from "src/prisma.service";
import { RegisterDto } from "./dto/register.dto";
import { CacheAccountDataType } from "../types/cache-account-data";

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
import AccountData from "./types/account-data";

@Injectable()
export class AccountService {
	constructor(
		private prismaService: PrismaService,
		@Inject(CACHE_MANAGER) private cacheManager: Cache,
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
}
