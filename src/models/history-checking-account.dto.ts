export class HistoryCheckingAccountDto {
	id: string
	checkingAccountId: string
	description: string
	balance: number
	date: Date
}

export class BalanceDifferenceDto {
	difference: number
	date?: Date
}
