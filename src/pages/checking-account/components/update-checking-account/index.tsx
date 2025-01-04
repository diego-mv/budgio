import React from 'react'
import { UpdateCheckingAccountProps } from './types'
import { Modal } from 'antd'

const UpdateCheckingAccount: React.FC<UpdateCheckingAccountProps> = ({
	checkingAccount,
	onUpdateCheckingAccount,
	open,
	onClose
}) => {
	return (
		<Modal open={open} footer={null} onCancel={onClose}>
			aa
		</Modal>
	)
}

export default UpdateCheckingAccount
