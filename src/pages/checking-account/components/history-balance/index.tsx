import React, { useEffect, useState } from 'react'
import { useAlertContext } from '../../../../contexts/alert/AlertContext'
import useHistoryCheckingAccountClient from '../../../../hook/useHistoryCheckingAccountClient'
import { Utils } from '../../../../utils'
import { HistoryBalanceProps } from './types'
import {
	LineChart,
	Line,
	ResponsiveContainer,
	CartesianGrid,
	XAxis,
	YAxis,
	Legend,
	Dot,
	Tooltip
} from 'recharts'
import { LineChartData } from '../../../../models'
import { useTranslation } from 'react-i18next'
import HistoryTooltipChart from '../tooltip-history'

const HistoryBalance: React.FC<HistoryBalanceProps> = ({
	checkingAccountId,
	onLoading,
	color,
	balance
}) => {
	const { showError } = useAlertContext()
	const [history, setHistory] = useState<LineChartData[]>([])
	const { getByCheckingAccount } = useHistoryCheckingAccountClient()
	const [loading, setLoading] = useState(true)
	const { t } = useTranslation()

	const fetchData = async () => {
		try {
			if (onLoading) onLoading(true)
			setLoading(true)

			if (checkingAccountId) {
				const response = await getByCheckingAccount(checkingAccountId)
				const historyData = Utils.Recharts.mapHistoryToData(response)
				setHistory(historyData)
			}
		} catch (error) {
			showError(error as string)
		} finally {
			setLoading(false)
			if (onLoading) onLoading(false)
		}
	}

	useEffect(() => {
		fetchData()
	}, [checkingAccountId, balance])

	if (loading) return <h1>Loading...</h1>

	return (
		<div className="p-2">
			<h1 className="text-xl font-bold mb-6">
				{t('checkingAccount.historyTitle')}
			</h1>
			<div style={{ width: '100%' }}>
				<ResponsiveContainer width="100%" height={300}>
					<LineChart
						width={500}
						height={300}
						data={history}
						margin={{
							top: 10,
							right: 30,
							left: 20,
							bottom: 10
						}}
					>
						<CartesianGrid strokeDasharray="3 3" />
						<XAxis dataKey="name" />
						<YAxis />
						<Line
							type="linear"
							dataKey="value"
							stroke={color ? `#${color}` : '#8884d8'}
							strokeWidth={5}
							dot={{ r: 5 }}
						/>
						<Tooltip content={<HistoryTooltipChart />} />
					</LineChart>
				</ResponsiveContainer>
			</div>
		</div>
	)
}

export default HistoryBalance
