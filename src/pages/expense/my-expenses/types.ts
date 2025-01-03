export interface ExpenseTable {
	id: string
	key: string
	dueDate: Date
	name: string
	installmentAmount: number
	paid: boolean
	installments: number
	amount: number
}
