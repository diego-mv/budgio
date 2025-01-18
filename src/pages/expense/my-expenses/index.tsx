import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Card, Table, TablePaginationConfig, TableProps } from 'antd'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useAlertContext } from '../../../contexts/alert/AlertContext'
import useExpenseClient from '../../../hook/useExpenseClient'
import { usePagination } from '../../../hook/usePagination'
import ModalCreateExpense from '../components/modal-create'
import { getColumns } from './constants'
import { ExpenseTable } from './types'

const MyExpenses = () => {
	const { t } = useTranslation()
	const { getByUser, deleteMultiple } = useExpenseClient()
	const {
		data: expenses,
		page,
		pageSize,
		total,
		loading,
		setPageAndSize,
		refresh
	} = usePagination({
		fetchData: getByUser,
		initialPage: 1,
		initialPageSize: 10
	})
	const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false)
	const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([])
	const { showSuccess, showError } = useAlertContext()

	const rowSelection: TableProps<ExpenseTable>['rowSelection'] = {
		onChange: (_: React.Key[], selectedRows: ExpenseTable[]) => {
			setSelectedRowKeys(selectedRows.map((row) => row.id))
		},
		preserveSelectedRowKeys: false
	}

	const handleCreateExpense = () => {
		setIsCreateModalOpen(true)
	}

	const handleChangeTable = (pagination: TablePaginationConfig) => {
		setPageAndSize(pagination.current || 1, pagination.pageSize || 10)
	}

	const handleDeleteSelecteds = async () => {
		try {
			deleteMultiple(selectedRowKeys)
			setSelectedRowKeys([])
			refresh()
			showSuccess(t('expenses.deletedExpense'))
		} catch (error) {
			showError(t('errors.errorDelete'))
		}
	}

	const handleCloseCreate = async () => {
		setIsCreateModalOpen(false)
		await refresh()
	}

	return (
		<Card>
			<ModalCreateExpense
				isOpen={isCreateModalOpen}
				onClose={handleCloseCreate}
			/>

			<h1 className="text-2xl font-bold float-start">{t('expenses.title')}</h1>
			<div className="float-end">
				<Button
					disabled={selectedRowKeys.length === 0}
					type="primary"
					icon={<FontAwesomeIcon icon={faTrash} />}
					className="rounded-xl font-bold shadow-sm bg-red-700 hover:bg-red-950 disabled:bg-red-400 disabled:text-white  !important"
					onClick={handleDeleteSelecteds}
				>
					{t('expenses.deleteMultipleExpense')}
				</Button>
				<Button
					type="primary"
					icon={<FontAwesomeIcon icon={faPlus} />}
					className="rounded-xl font-bold shadow-sm ml-2"
					onClick={handleCreateExpense}
				>
					{t('expenses.addExpense')}
				</Button>
			</div>
			<hr className="mt-14 mb-6 opacity-50 rounded-full" />

			<Table<ExpenseTable>
				rowSelection={{ type: 'checkbox', ...rowSelection }}
				columns={getColumns(t)}
				dataSource={expenses.map(
					(expense): ExpenseTable => ({
						key: expense.id,
						...expense
					})
				)}
				pagination={{
					pageSize,
					current: page,
					total
				}}
				onChange={handleChangeTable}
				loading={loading}
			/>
		</Card>
	)
}

export default MyExpenses
