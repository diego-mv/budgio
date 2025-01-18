import { AggregationColor } from 'antd/es/color-picker/color'

export interface AddCreditCardProps {
	handleAddCreditCard: () => void
}

export interface AddCreditCardForm {
	name: string
	dueDate: Date
	limit: number
	color: AggregationColor
}
