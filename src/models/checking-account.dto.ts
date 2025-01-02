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

export class CreateCheckingAccountDto {}
export class UpdateCheckingAccountDto {}
