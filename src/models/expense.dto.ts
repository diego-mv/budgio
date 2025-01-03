import { UserDto } from './user.dto'

export class ExpenseDto {
	id: string
	name: string
	installmentAmount: number
	dueDate: Date
	user: UserDto
	createdAt: Date
	updatedAt: Date | null
	paid: boolean
	installments: number
	amount: number
}

export class CreateExpenseDto {
	installmentAmount: number
	name: string
	dueDate: Date
	paid: boolean
	amount: number
	installments: number
}

export class UpdateExpenseDto {
	id: string
	installmentAmount: number
	name: string
	dueDate: Date
	paid: boolean
	amount: number
	installments: number
}
