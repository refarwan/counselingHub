import * as path from "path";
import { existsSync } from "fs";

import { Injectable, NotFoundException } from "@nestjs/common";

@Injectable()
export class ProfilePictureService {
	getImagePath(size: "small" | "medium" | "large", fileName: string): string {
		const imagePath = path.resolve(
			`user-files/profile-picture/${size}/${fileName}`,
		);

		if (!existsSync(imagePath))
			throw new NotFoundException({ message: "Foto profil tidak ditemukan" });
		return imagePath;
	}
}
