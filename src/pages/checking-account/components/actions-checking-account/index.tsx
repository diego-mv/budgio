import {
	faPenToSquare,
	faPlus,
	faScaleBalanced,
	faTrash
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Col, Popconfirm, Row } from 'antd'
import React from 'react'
import { useTranslation } from 'react-i18next'
import CustomButton from '../../../../components/button'
import { ActionsCheckingAccountProps } from './types'

const ActionsCheckingAccount: React.FC<ActionsCheckingAccountProps> = ({
	handleOpenUpdateBalance,
	handleOpenUpdateCheckingAccount,
	handleOpenCreate,
	handleDeleteCheckingAccount
}) => {
	const { t } = useTranslation()

	return (
		<Row gutter={[16, 16]} className="w-full flex justify-between items-center">
			<Col
				xs={24}
				md={12}
				lg={12}
				span={12}
				className="flex sm:justify-end justify-center"
			>
				<CustomButton
					className="rounded-xl font-bold shadow-sm ml-2 mx-1"
					size="large"
					icon={<FontAwesomeIcon icon={faScaleBalanced} />}
					onClick={handleOpenUpdateBalance}
				>
					{t('checkingAccount.updateBalance')}
				</CustomButton>{' '}
			</Col>{' '}
			<Col
				xs={24}
				md={12}
				lg={12}
				span={12}
				className="flex sm:justify-start justify-center"
			>
				<CustomButton
					className="rounded-xl font-bold shadow-sm mx-1"
					size="large"
					icon={<FontAwesomeIcon icon={faPenToSquare} />}
					onClick={handleOpenUpdateCheckingAccount}
				>
					{t('checkingAccount.updateCard')}
				</CustomButton>
			</Col>
			<Col
				span={24}
				className="
xs:mt-4 sm:mt-2 md:mt-2 flex justify-center
lg:absolute lg:right-10 xl:absolute xl:right-10"
			>
				<CustomButton
					type="primary"
					icon={<FontAwesomeIcon icon={faPlus} />}
					className="mx-1 rounded-2xl"
					onClick={handleOpenCreate}
				></CustomButton>
				<Popconfirm
					title={t('checkingAccount.deleteConfirm')}
					onConfirm={handleDeleteCheckingAccount}
					okText={t('general.yes')}
					cancelText={t('general.cancel')}
					placement="leftBottom"
					className="font-bold"
					okType="primary"
					cancelButtonProps={{
						className: 'font-bold p-4 shadow-lg'
					}}
					okButtonProps={{
						className: 'font-bold p-4 shadow-lg bg-red-700'
					}}
				>
					<CustomButton
						icon={<FontAwesomeIcon icon={faTrash} />}
						className="mx-1 rounded-2xl bg-red-700 text-white"
					></CustomButton>
				</Popconfirm>
			</Col>
		</Row>
	)
}

export default ActionsCheckingAccount
