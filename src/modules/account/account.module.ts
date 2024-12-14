import { AccountService } from "./account.service";
import { AccountController } from "./account.controller";
import { PrismaService } from "src/prisma.service";

import { Module } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AuthService } from "../auth/auth.service";

@Module({
	controllers: [AccountController],
	providers: [AccountService, PrismaService, JwtService, AuthService],
})
export class AccountModule {}
