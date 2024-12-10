import {
	IsEnum,
	IsOptional,
	Matches,
	IsEmail,
	IsNotEmpty,
} from "class-validator";

enum Gender {
	MALE = "male",
	FEMALE = "female",
}

export class EditAccountDto {
	@IsOptional()
	@IsNotEmpty({ message: "Username tidak boleh kosong" })
	username?: string;

	@IsOptional()
	@IsNotEmpty({ message: "Email tidak boleh kosong" })
	@IsEmail({}, { message: "Format email salah" })
	email?: string;

	@IsOptional()
	phoneNumber?: string;

	@IsOptional()
	@IsNotEmpty({ message: "Nama lengkap tidak boleh kosong" })
	fullname?: string;

	@IsOptional()
	@Matches(
		/^(\d{4}-([1-9]|0[1-9]|1[0-2])-([1-9]|0[1-9]|1[0-9]|2[0-9]|3[0-1]))$|^$/,
		{
			message: 'Format tanggal harus "yyyy-mm-dd" (contoh : 2012-12-12)',
		},
	)
	birthday?: string;

	@IsOptional()
	@IsEnum(Gender, {
		message: 'Gender hanya boleh diisi dengan "male" atau "female"',
	})
	gender?: Gender;

	@IsOptional()
	address?: string;

	@IsOptional()
	regencyId?: number;

	@IsOptional()
	education?: string;

	@IsOptional()
	profession?: string;
}
