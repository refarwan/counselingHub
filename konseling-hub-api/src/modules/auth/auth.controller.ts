import { Request, Response } from "express";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";

import {
	Body,
	Controller,
	Get,
	HttpCode,
	Post,
	Req,
	Res,
} from "@nestjs/common";

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
	): Promise<{ accessToken: string }> {
		const refreshToken = request.cookies["refreshToken"] as undefined | string;
		return await this.authService.getNewAccessToken(refreshToken);
	}
}
