import React from 'react'
import { ModalAddCreditCardProps } from './types'
import { Modal } from 'antd'
import FormAddCreditCard from '../add-credit-card'
import { useTranslation } from 'react-i18next'

const ModalAddCreditCard: React.FC<ModalAddCreditCardProps> = ({
	isOpen,
	handleAddCreditCard,
	handleClose
}) => {
	const { t } = useTranslation()

	return (
		<Modal open={isOpen} onCancel={handleClose} footer={null}>
			<h2 className="text-2xl font-bold mb-4">{t('creditCard.addNewCard')}</h2>
			<FormAddCreditCard handleAddCreditCard={handleAddCreditCard} />
		</Modal>
	)
}

export default ModalAddCreditCard
