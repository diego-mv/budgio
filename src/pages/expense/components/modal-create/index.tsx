import { Modal } from 'antd'
import React from 'react'
import CreateExpense from '../../create'
import { ModalCreateExpenseProps } from './types'
import { useTranslation } from 'react-i18next'

const ModalCreateExpense: React.FC<ModalCreateExpenseProps> = ({
	isOpen,
	onClose
}) => {
	const { t } = useTranslation()

	const handleClose = () => {
		onClose()
	}

	return (
		<Modal open={isOpen} footer={null} onClose={onClose} onCancel={onClose}>
			<h1 className="mb-6 text-2xl font-bold">{t('expenses.addExpense')}</h1>
			<CreateExpense onClose={handleClose} />
		</Modal>
	)
}

export default ModalCreateExpense
