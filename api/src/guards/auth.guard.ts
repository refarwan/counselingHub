import { AuthService } from "src/modules/auth/auth.service";

import {
	CanActivate,
	ExecutionContext,
	ForbiddenException,
	Injectable,
	UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

import { Request } from "express";
import { Role } from "@prisma/client";

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(
		private jwtService: JwtService,
		private authService: AuthService,
	) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context.switchToHttp().getRequest();
		const token = this.extractTokenFromHeader(request);
		if (!token) {
			throw new UnauthorizedException({ message: "Access token diperlukan" });
		}

		type Payload = {
			username: string;
			profilePicture: null | string;
			fullname: string;
			role: Role;
			iat: number;
			exp: number;
		};

		let payload: null | Payload = null;

		try {
			payload = this.jwtService.verify(token, {
				secret: process.env.ACCESS_TOKEN_SECRET,
			}) as Payload;
		} catch {
			throw new UnauthorizedException({
				message: "Access token tidak dapat diverifikasi",
			});
		}

		const cacheAccountData = await this.authService.getCacheAccountData(
			payload.username,
		);
		if (!cacheAccountData)
			throw new ForbiddenException({
				message:
					"Access token sudah tidak relevan, silahkan lakukan otentikasi ulang",
			});

		request["accountId"] = cacheAccountData.id;
		return true;
	}

	private extractTokenFromHeader(request: Request): string | undefined {
		const [type, token] = request.headers.authorization?.split(" ") ?? [];
		return type === "Bearer" ? token : undefined;
	}
}
