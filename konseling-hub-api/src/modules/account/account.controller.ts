import { AccountService } from "./account.service";
import { RegisterDto } from "./dto/register.dto";

import { Body, Controller, Post } from "@nestjs/common";

@Controller("account")
export class AccountController {
	constructor(private readonly accountService: AccountService) {}

	@Post("register")
	async register(@Body() body: RegisterDto): Promise<{ message: string }> {
		return { message: "Register Account" };
	}
}
