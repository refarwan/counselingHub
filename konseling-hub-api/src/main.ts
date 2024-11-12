import { AppModule } from "./app.module";

import { NestFactory } from "@nestjs/core";
import { BadRequestException, ValidationPipe } from "@nestjs/common";

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

	await app.listen(9000);
}
bootstrap();
