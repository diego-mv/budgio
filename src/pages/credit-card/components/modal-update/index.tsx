import React from 'react'
import { ModalUpdateCreditCardProps } from './types'
import { Modal } from 'antd'

const ModalUpdateCreditCard: React.FC<ModalUpdateCreditCardProps> = ({
	isOpen,
	handleClose
}) => {
	return <Modal open={isOpen} onCancel={handleClose} footer={null}></Modal>
}

export default ModalUpdateCreditCard
