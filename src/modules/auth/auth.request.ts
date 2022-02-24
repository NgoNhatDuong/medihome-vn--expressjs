import { Exclude, Expose } from 'class-transformer'
import { IsArray, IsEmail, Length, MinLength, ValidateIf } from 'class-validator'

@Exclude()
export class RegisterRequest {
	@Expose()
	username: string

	@Expose()
	@MinLength(6, { message: 'Password is too short' })
	password: string

	@Expose()
	@IsEmail({ message: 'Email is invalid' })
	email: string

	@Expose()
	@Length(10, 10, { message: 'Phone number requires 10 characters' })
	phone: string
}

export class LoginRequest {
	@Expose()
	username: string

	@Expose()
	@MinLength(6, { message: 'Password is too short' })
	password: string
}

@Exclude()
export class LogoutRequest {
	@Expose()
	accessToken: string

	@Expose()
	@ValidateIf(o => o.refreshToken !== undefined)
	@IsArray({ message: 'RefreshToken is array' })
	refreshToken?: string[]
}
@Exclude()
export class RefreshTokenRequest {
	@Expose()
	refreshToken: string
}
