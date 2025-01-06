export interface UpdateAmountProps {
	checkingAccountId: string
	onUpdateAmount: (amount: number) => void
	amount: number
	open: boolean
	onClose: () => void
}

export interface UpdateBalanceForm {
	amount: number
	type: 'balance' | 'expense' | 'income'
	description?: string
}
