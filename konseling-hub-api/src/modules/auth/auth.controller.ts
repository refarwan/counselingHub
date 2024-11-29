import { Response } from "express";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";

import { Body, Controller, HttpCode, Post, Res } from "@nestjs/common";

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
}
