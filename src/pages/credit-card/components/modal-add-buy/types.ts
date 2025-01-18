import { ExpenseCreditCardDto } from '../../../../models/expense-credit-card.dto'

export interface ModalAddBuyProps {
	creditCardId: string
	isOpen: boolean
	handleClose: () => void
	handleAddBuy: (data: ExpenseCreditCardDto) => void
}
