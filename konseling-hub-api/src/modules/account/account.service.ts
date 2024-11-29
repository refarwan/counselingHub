import { PrismaService } from "src/prisma.service";
import { RegisterDto } from "./dto/register.dto";

import { CacheAccountDataType } from "../types/cache-account-data";

import {
	BadRequestException,
	ConflictException,
	Inject,
	Injectable,
	InternalServerErrorException,
} from "@nestjs/common";
import { CACHE_MANAGER, Cache } from "@nestjs/cache-manager";

import { hashSync } from "bcrypt";
import { randomBytes } from "crypto";

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
			role: account.role,
		};

		this.cacheManager.set(`cacheAccountData:${account.username}`, accountData);

		return { message: "Berhasil membuat akun" };
	}
}
