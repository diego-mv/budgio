export interface MetricCardsCheckingAccountProps {
	checkingAccountId: string
	balance: number
	loadingCheckingAccount: boolean
	onLoading?: (loading: boolean) => void
}
