import { AuthService } from "./auth.service";
import { AuthGuard } from "src/guards/auth.guard";

import { LoginDto } from "./dto/login.dto";

import {
	Body,
	Controller,
	Delete,
	ForbiddenException,
	Get,
	HttpCode,
	InternalServerErrorException,
	Post,
	Req,
	Res,
	UnauthorizedException,
	UseGuards,
} from "@nestjs/common";

import { Request, Response } from "express";

@Controller("auth")
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post("login")
	@HttpCode(200)
	async login(
		@Body() data: LoginDto,
		@Res({ passthrough: true }) response: Response,
	): Promise<{ accessToken: string }> {
		const { accessToken, refreshToken, expires } =
			await this.authService.login(data);

		const secure: boolean = JSON.parse(process.env.IS_HTTPS);

		response.cookie("refreshToken", refreshToken, {
			expires,
			secure,
			httpOnly: true,
		});
		return { accessToken };
	}

	@Get("access-token")
	async getNewAccessToken(
		@Req() request: Request,
		@Res({ passthrough: true }) response: Response,
	): Promise<{ accessToken: string }> {
		const refreshToken = request.cookies["refreshToken"] as undefined | string;
		if (!refreshToken)
			throw new UnauthorizedException({
				message: "Refresh token tidak ditemukan",
			});
		const result = await this.authService.getNewAccessToken(refreshToken);

		if (result.status === "serverError")
			throw new InternalServerErrorException({ message: result.message });

		if (result.status === "forbidden") {
			response.clearCookie("refreshToken");
			throw new ForbiddenException({ message: result.message });
		}

		return { accessToken: result.message };
	}

	@Delete("logout")
	@UseGuards(AuthGuard)
	async logout(
		@Req() request: Request,
		@Res({ passthrough: true }) response: Response,
	) {
		let accessToken = undefined;
		const authorization = request.headers["authorization"];
		if (authorization && authorization.startsWith("Bearer ")) {
			const token = authorization.split(" ")[1];
			accessToken = token;
		}
		const refreshToken = request.cookies["refreshToken"] as undefined | string;
		await this.authService.logout(refreshToken, accessToken);
		response.clearCookie("refreshToken");
		return { message: "Berhasil mengeluarkan akun" };
	}
}
