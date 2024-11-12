import { PrismaService } from "src/prisma.service";
import { RegisterDto } from "./dto/register.dto";

import {
	BadRequestException,
	ConflictException,
	Injectable,
	InternalServerErrorException,
} from "@nestjs/common";
import { hashSync } from "bcrypt";

@Injectable()
export class AccountService {
	constructor(private prismaService: PrismaService) {}

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
				email: data.email,
				fullname: data.fullname,
				password: hashSync(data.password, 10),
			},
		});

		if (!account)
			throw new InternalServerErrorException({
				message: "Server gagal membuat akun",
			});

		return { message: "Berhasil membuat akun" };
	}
}
