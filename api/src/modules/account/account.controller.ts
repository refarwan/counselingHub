import { AuthGuard } from "src/guards/auth.guard";
import { AccountService } from "./account.service";
import { RegisterDto } from "./dto/register.dto";
import AccountData from "./types/account-data";

import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { AllProvince } from "./types/all-province";

@Controller("account")
export class AccountController {
	constructor(private readonly accountService: AccountService) {}

	@Post("register")
	async register(@Body() body: RegisterDto): Promise<{ message: string }> {
		return await this.accountService.register(body);
	}

	@Get("my-profile")
	@UseGuards(AuthGuard)
	async getMyProfile(@Req() request: Request): Promise<AccountData> {
		return await this.accountService.getAccoutData(request["accountId"]);
	}

	@Get("all-province")
	@UseGuards(AuthGuard)
	async getAllProvince(): Promise<AllProvince> {
		return await this.accountService.getAllProvince();
	}
}
