import { AppModule } from "./app.module";

import { NestFactory } from "@nestjs/core";
import { BadRequestException, Logger, ValidationPipe } from "@nestjs/common";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true,
			disableErrorMessages: true,
			exceptionFactory: (errors) => {
				const message = {};
				errors.map((error) => {
					if (error.constraints) {
						message[error.property] = Object.keys(error.constraints).map(
							(item) => {
								if (error.constraints) return error.constraints[item];
							},
						);
					}
				});
				return new BadRequestException({ message });
			},
		}),
	);

	try {
		const allowedOrigin = JSON.parse(process.env.ALLOWED_ORIGIN);
		if (typeof allowedOrigin !== "object") throw new Error();
	} catch (error) {
		Logger.error(
			'wrong ALLOWED_ORIGIN value in environment variable (sample: ["https://www.frontend-1.com", "https://www.frontend-2.com"])',
		);
		process.exit(1);
	}

	await app.listen(9000);
}
bootstrap();
