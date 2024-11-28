import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

import seedProvince from "./seed.province";
import seedDustrict from "./seed.district";
import seedAdministrator from "./seed.administrator";

async function main() {
	console.log("Seeding data...");

	await seedProvince();
	await seedDustrict();
	await seedAdministrator();

	console.log("Seeding completed!");
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
