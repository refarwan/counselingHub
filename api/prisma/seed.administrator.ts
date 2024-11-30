import { PrismaClient } from "@prisma/client";
import { hashSync } from "bcrypt";

const prisma = new PrismaClient();

async function seedAdministrator() {
	await prisma.account.upsert({
		where: {
			username: "administrator",
		},
		update: {},
		create: {
			username: "administrator",
			email: "administrator@tessera.id",
			password: hashSync("Administrator#2024", 10),
			role: "administrator",
			fullname: "Administrator",
			birthday: new Date("1998-08-17"),
			gender: "male",
			address: "Butuh Lor RT 04, Triwidadi, Pajangan",
			districtId: 3402,
			education: "SMK N 1 Bantul",
			profession: "Administrator Konseling Hub",
		},
	});
	console.log("Administrator Seeding Complete");
}

export default seedAdministrator;
