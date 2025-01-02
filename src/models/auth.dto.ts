import { UserDto } from './user.dto'

export class LoginResponseDto {
	user: UserDto
	accessToken: string
	refreshToken: string
}

export class RefreshTokenDto {
	refreshToken: string
}
