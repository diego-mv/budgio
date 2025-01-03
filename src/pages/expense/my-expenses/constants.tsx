import { Badge, TableColumnsType } from 'antd'
import { ExpenseTable } from './types'
import { TFunction } from 'i18next'

export const getColumns = (t: TFunction): TableColumnsType<ExpenseTable> => [
	{
		title: t('expenses.dueDate'),
		dataIndex: 'dueDate',
		key: 'dueDate',
		render: (value: Date) => new Date(value).toLocaleDateString()
	},
	{
		title: t('general.name'),
		dataIndex: 'name',
		key: 'name'
	},
	{
		title: t('expenses.installmentAmount'),
		dataIndex: 'installmentAmount',
		key: 'installmentAmount'
	},
	{
		title: t('expenses.installments'),
		dataIndex: 'installments',
		key: 'installments'
	},
	{
		title: t('expenses.amount'),
		dataIndex: 'amount',
		key: 'amount'
	},
	{
		title: t('expenses.paid'),
		dataIndex: 'paid',
		key: 'paid',
		render: (value: boolean) =>
			value ? (
				<Badge count={'Si'} color="green" className="p-5" />
			) : (
				<Badge count={'No'} className="py-2 px-4  rounded-2xl" color="red" />
			)
	}
]
