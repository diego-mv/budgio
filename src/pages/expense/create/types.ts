export interface CreateExpenseProps {
	onClose: () => void
}

export class CreateExpenseForm {
	name: string
	dueDate: Date
	amount: number
	installmentAmount: number
	installments: number
	paid: boolean
}
