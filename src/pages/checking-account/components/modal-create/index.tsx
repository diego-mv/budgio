import React from 'react'
import { ModalCreateCheckingAccountProps } from './types'
import { Modal } from 'antd'
import CreateCheckingAccount from '../../create'
import { useTranslation } from 'react-i18next'

const ModalCreateCheckingAccount: React.FC<ModalCreateCheckingAccountProps> = ({
	open,
	onClose,
	onCreate
}) => {
	const { t } = useTranslation()

	return (
		<Modal footer={null} open={open} onCancel={onClose}>
			<div className="">
				<h1 className="text-xl font-bold mt-4">
					{t('checkingAccount.createTitle')}
				</h1>
				<CreateCheckingAccount onCreate={onCreate} />
			</div>
		</Modal>
	)
}

export default ModalCreateCheckingAccount
