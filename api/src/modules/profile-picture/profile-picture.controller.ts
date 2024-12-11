import { Controller, Get, Param, Res } from "@nestjs/common";
import { ProfilePictureService } from "./profile-picture.service";
import { Response } from "express";

@Controller("profile-picture")
export class ProfilePictureController {
	constructor(private readonly profilePictureService: ProfilePictureService) {}

	@Get("small/:fileName")
	smallProfilePicture(
		@Param() { fileName }: { fileName: string },
		@Res() response: Response,
	) {
		const imagePath = this.profilePictureService.getImagePath(
			"small",
			fileName,
		);
		response.sendFile(imagePath);
	}

	@Get("medium/:fileName")
	mediumProfilePicture(
		@Param() { fileName }: { fileName: string },
		@Res() response: Response,
	) {
		const imagePath = this.profilePictureService.getImagePath(
			"medium",
			fileName,
		);
		response.sendFile(imagePath);
	}

	@Get("large/:fileName")
	largeProfilePicture(
		@Param() { fileName }: { fileName: string },
		@Res() response: Response,
	) {
		const imagePath = this.profilePictureService.getImagePath(
			"large",
			fileName,
		);
		response.sendFile(imagePath);
	}
}
