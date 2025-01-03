import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ExpenseDto } from '../../../models/expense.dto'

const MyCheckingAccounts = () => {
	const { t } = useTranslation()
	const [expenses, setExpenses] = useState<ExpenseDto[]>([])

	return (
		<div>
			<h2>{t('expenses.title')}</h2>
		</div>
	)
}

export default MyCheckingAccounts
