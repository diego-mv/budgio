import { CreditCardDto } from '../../../../models/credit-card.dto'

export interface ModalAddCreditCardProps {
	isOpen: boolean
	handleClose: () => void
	handleAddCreditCard: (data: CreditCardDto) => void
}
