import { useTranslation } from 'react-i18next'

const HistoryTooltipChart: React.FC<{
	active?: any
	payload?: any
	label?: any
}> = ({ active, label, payload }) => {
	const { t } = useTranslation()
	const value = payload[0]?.payload?.value || 0
	const description = payload[0]?.payload?.data?.description || ''

	return (
		<div className="bg-gray-300 rounded-2xl p-4 font-semibold">
			<p>
				{t('general.date')}: {label || ''}
			</p>
			<p>
				{t('general.balance')}: {value}
			</p>
			{description && (
				<p>
					{t('general.description')}: {description}
				</p>
			)}
		</div>
	)
}

export default HistoryTooltipChart
