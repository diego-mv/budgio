import { format } from 'date-fns'
import { LineChartData } from '../models'
import { HistoryCheckingAccountDto } from '../models/history-checking-account.dto'

export const Recharts = {
	mapHistoryToData: (history: HistoryCheckingAccountDto[]): LineChartData[] => {
		const data: LineChartData[] = history
			.map((item) => ({
				name: format(item.date, 'dd/MM/yyyy'),
				value: isNaN(Number(item.balance)) ? 0 : Number(item.balance),
				data: {
					description: item?.description || ''
				}
			}))
			.filter((item) => !isNaN(item.value))

		return data
	}
}
