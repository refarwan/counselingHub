import {
	IsEmail,
	IsNotEmpty,
	IsString,
	IsStrongPassword,
} from "class-validator";

export class RegisterDto {
	@IsNotEmpty({ message: "Nama lengkap tidak boleh kosong" })
	@IsString({ message: "Nama lengkap harus string" })
	fullname: string;

	@IsNotEmpty({ message: "Email tidak boleh kosong" })
	@IsEmail(undefined, { message: "Format email salah" })
	@IsString({ message: "Email harus string" })
	email: string;

	@IsNotEmpty({ message: "Password tidak boleh kosong" })
	@IsStrongPassword(
		{ minLength: 8 },
		{ message: "Password kurang aman (contoh: TemanDengar#2024)" },
	)
	password: string;

	@IsNotEmpty({ message: "Konfirmasi password tidak boleh kosong" })
	@IsString({ message: "Konfirmasi password harus string" })
	confirmPassword: string;
}
