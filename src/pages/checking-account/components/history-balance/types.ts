export interface HistoryBalanceProps {
	checkingAccountId: string
	color?: string
	onLoading?: (loading: boolean) => void
	balance: number
}
