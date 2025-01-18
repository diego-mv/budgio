import { Modal } from 'antd'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { ModalAddBuyProps } from './types'
import AddBuyCreditCard from '../add-buy'

const ModalAddBuy: React.FC<ModalAddBuyProps> = ({
	creditCardId,
	isOpen,
	handleClose,
	handleAddBuy
}) => {
	const { t } = useTranslation()
	return (
		<Modal open={isOpen} onCancel={handleClose} footer={null}>
			<h2 className="text-2xl font-bold mb-4">{t('creditCard.addBuy')}</h2>
			<AddBuyCreditCard
				creditCardId={creditCardId}
				handleAddBuy={handleAddBuy}
			/>
		</Modal>
	)
}

export default ModalAddBuy
