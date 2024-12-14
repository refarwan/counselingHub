import { AuthService } from "./auth.service";

import { LoginDto } from "./dto/login.dto";

import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Post,
	Req,
	Res,
	UnauthorizedException,
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

		if (!result.success) {
			response.clearCookie("refreshToken");
			throw new UnauthorizedException({ message: "Refresh token tidak valid" });
		}

		return { accessToken: result.accessToken };
	}

	@Delete("logout")
	async logout(
		@Req() request: Request,
		@Res({ passthrough: true }) response: Response,
	) {
		const refreshToken = request.cookies["refreshToken"] as undefined | string;
		await this.authService.logout(refreshToken);
		response.clearCookie("refreshToken");
		return { message: "Berhasil mengeluarkan akun" };
	}
}
