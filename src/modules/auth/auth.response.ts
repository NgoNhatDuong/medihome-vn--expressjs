import { Exclude, Expose, Type } from 'class-transformer'

@Exclude()
class UserInfo {
	@Expose()
	userId: number

	@Expose()
	username: string

	@Expose()
	email: string
}
@Exclude()
export class AuthResponse {
	@Expose()
	accessToken: string

	@Expose()
	refreshToken: string

	@Expose()
	@Type(() => UserInfo)
	userInfo: UserInfo
}
