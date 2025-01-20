import { AggregationColor } from 'antd/es/color-picker/color'
import { CreditCardDto } from '../../../../models/credit-card.dto'

export interface AddCreditCardProps {
	handleAddCreditCard: (card: CreditCardDto) => void
}

export interface AddCreditCardForm {
	name: string
	dueDate: Date
	creditLimit: number
	color: AggregationColor
}
