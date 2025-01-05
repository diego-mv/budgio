import { UserDto } from './user.dto'

export class CheckingAccountDto {
	id: string
	balance: number
	name: string
	color: string
	user: UserDto
	createdAt: Date
	updatedAt: Date | null
}

export class CreateCheckingAccountDto {
	name: string
	balance: number
	color: string
}
export class UpdateCheckingAccountDto {
	id: string
	name: string
	color: string
}
