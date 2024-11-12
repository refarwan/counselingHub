import { AccountService } from "./account.service";
import { AccountController } from "./account.controller";
import { PrismaService } from "src/prisma.service";

import { Module } from "@nestjs/common";

@Module({
	controllers: [AccountController],
	providers: [AccountService, PrismaService],
})
export class AccountModule {}
