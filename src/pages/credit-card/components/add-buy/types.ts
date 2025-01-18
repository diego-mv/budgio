import { ExpenseCreditCardDto } from '../../../../models/expense-credit-card.dto'

export interface AddBuyProps {
	creditCardId: string
	handleAddBuy: (expense: ExpenseCreditCardDto) => void
}

export interface AddBuyForm {
	name: string
	issueDate: Date
	totalInstallments: number
	installmentAmount: number
	totalCost: number
}
