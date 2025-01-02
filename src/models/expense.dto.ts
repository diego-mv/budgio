import { UserDto } from './user.dto'

export class ExpenseDto {
	id: string
	name: string
	installmentAmount: number
	dueDate: Date
	user: UserDto
	createdAt: Date
	updatedAt: Date | null
}

export class CreateExpenseDto {}
export class UpdateExpenseDto {}
