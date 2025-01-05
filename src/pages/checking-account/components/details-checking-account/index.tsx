import { Card, Col, Row } from 'antd'
import React from 'react'
import HistoryBalance from '../history-balance'
import MetricCardsCheckingAccount from '../metric-cards'
import { DetailCheckingAccountProps } from './types'

const DetailsCheckingAccount: React.FC<DetailCheckingAccountProps> = ({
	checkingAccount,
	loading
}) => {
	if (!checkingAccount) {
		return <></>
	}

	return (
		<div>
			<Row gutter={[16, 16]}>
				<MetricCardsCheckingAccount
					checkingAccountId={checkingAccount.id}
					balance={checkingAccount.balance}
					loadingCheckingAccount={loading ?? false}
				/>
				<Col span={24}>
					<Card>
						<HistoryBalance
							checkingAccountId={checkingAccount.id}
							balance={checkingAccount.balance}
							color={checkingAccount.color}
						/>
					</Card>
				</Col>
			</Row>
		</div>
	)
}

export default DetailsCheckingAccount
