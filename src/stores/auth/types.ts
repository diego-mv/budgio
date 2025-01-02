import { UserDto } from '../../models/user.dto'

export interface AuthState {
	user: UserDto | null
	token: string | null
	refresh_token: string | null
	isAuthenticated: boolean
	login: (user: UserDto, token: string, refreshToken: string) => void
	logout: () => void
}
