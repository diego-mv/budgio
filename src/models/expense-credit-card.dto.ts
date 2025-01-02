import { CreditCardDto } from './credit-card.dto'

export class ExpenseCreditCardDto {
	id: string
	creditCard: CreditCardDto
	name: string
	issueDate: Date
	totalInstallments: number
	installmentAmount: number
	totalCost: number
	createdAt: Date
	updatedAt: Date | null
}

export class CreateExpenseCreditCardDto {}
export class UpdateExpenseCreditCardDto {}
