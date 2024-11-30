import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { PrismaService } from "src/prisma.service";

import { Module } from "@nestjs/common";

@Module({
	controllers: [AuthController],
	providers: [AuthService, PrismaService],
})
export class AuthModule {}
