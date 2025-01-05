import {
	faHandHoldingDollar,
	faMoneyBillWave,
	faWallet
} from '@fortawesome/free-solid-svg-icons'
import { Col } from 'antd'
import { format } from 'date-fns'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import MetricCard from '../../../../components/metric-card'
import { useAlertContext } from '../../../../contexts/alert/AlertContext'
import useHistoryCheckingAccountClient from '../../../../hook/useHistoryCheckingAccountClient'
import { BalanceDifferenceDto } from '../../../../models/history-checking-account.dto'
import { MetricCardsCheckingAccountProps } from './types'

const MetricCardsCheckingAccount: React.FC<MetricCardsCheckingAccountProps> = ({
	checkingAccountId,
	onLoading,
	balance,
	loadingCheckingAccount
}) => {
	const { getLastEntry, getLastExpense } = useHistoryCheckingAccountClient()
	const { showError } = useAlertContext()
	const [lastEntry, setLastEntry] = useState<BalanceDifferenceDto>()
	const [lastExpense, setLastExpense] = useState<BalanceDifferenceDto>()
	const [loading, setLoading] = useState(true)
	const { t } = useTranslation()

	const fetchData = async () => {
		if (!checkingAccountId) return
		try {
			setLoading(true)
			const lastEntry = await getLastEntry(checkingAccountId)
			const lastExpense = await getLastExpense(checkingAccountId)
			setLastEntry(lastEntry)
			setLastExpense(lastExpense)
		} catch (error) {
			showError(error as string)
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		fetchData()
	}, [checkingAccountId, balance])

	return (
		<>
			<Col xl={8} lg={8} md={8} sm={24} xs={24}>
				<MetricCard
					money
					title={t('checkingAccount.currentBalance')}
					value={balance ?? 0}
					icon={faWallet}
					loading={loadingCheckingAccount}
					style={{ minHeight: '175px' }}
				/>
			</Col>
			<Col xl={8} lg={8} md={8} sm={24} xs={24}>
				<MetricCard
					money
					title={t('checkingAccount.lastEntry')}
					subtitle={
						lastEntry &&
						lastEntry?.date &&
						format(lastEntry?.date, 'dd/MM/yyyy')
					}
					value={lastEntry?.difference ?? 0}
					icon={faMoneyBillWave}
					colors
					loading={loadingCheckingAccount || loading}
					style={{ minHeight: '175px' }}
				/>
			</Col>
			<Col xl={8} lg={8} md={8} sm={24} xs={24}>
				<MetricCard
					money
					title={t('checkingAccount.lastExpense')}
					subtitle={
						lastExpense &&
						lastExpense.date &&
						format(lastExpense?.date, 'dd/MM/yyyy')
					}
					value={lastExpense?.difference ?? 0}
					icon={faHandHoldingDollar}
					colors
					loading={loadingCheckingAccount || loading}
					style={{ minHeight: '175px' }}
				/>
			</Col>
		</>
	)
}

export default MetricCardsCheckingAccount
