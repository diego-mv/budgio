import { UserDto } from './user.dto'

export class CreditCardDto {
	id: string
	creditLimit: number
	name: string
	color: string
	dueDate: Date
	user: UserDto
	createdAt: Date
	updatedAt: Date | null
}

export class CreditCardImportDto {
	date: string
	description: string
	holder: string
	amount: number
	pendingInstallments: number
	installmentAmount: number
}

export class CreateCreditCardDto {
	creditLimit: number
	dueDate: Date
	name: string
	color: string
}
export class UpdateCreditCardDto {}
