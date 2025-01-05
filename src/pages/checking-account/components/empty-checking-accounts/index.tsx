import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Col, Row } from 'antd'
import React from 'react'
import { useTranslation } from 'react-i18next'
import CustomButton from '../../../../components/button'
import { EmptyCheckingAccountsProps } from './types'

const EmptyCheckingAccounts: React.FC<EmptyCheckingAccountsProps> = ({
	onOpenCreate
}) => {
	const { t } = useTranslation()

	return (
		<Row className="flex justify-center py-32">
			<Col className="text-center">
				<h1 className="font-bold text-3xl text-gray-900">
					{t('checkingAccount.emptyTitle')}
				</h1>
				<h2 className="font-bold text-xl text-gray-600 mt-2">
					{t('checkingAccount.emptySubtitle')}
				</h2>
				<CustomButton
					type="primary"
					className="rounded-xl font-bold shadow-sm mx-1 my-6"
					size="large"
					icon={<FontAwesomeIcon icon={faPlus} />}
					onClick={onOpenCreate}
				>
					{t('checkingAccount.createCard')}
				</CustomButton>
			</Col>
		</Row>
	)
}

export default EmptyCheckingAccounts
