import { IsNotEmpty, IsString } from "class-validator";

export class LoginDto {
	@IsNotEmpty({
		message: "Username / email / nomor telepon tidak boleh kosong",
	})
	@IsString({ message: "Username / email / nomor telepon harus string" })
	username: string;

	@IsNotEmpty({ message: "Kata sandi tidak boleh kosong" })
	@IsString({ message: "Kata sandi harus string" })
	password: string;
}
