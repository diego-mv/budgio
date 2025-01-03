import apiClient from '../adapters/api/fetch-client'
import { PaginatedData } from '../models'
import {
	CreateExpenseDto,
	ExpenseDto,
	UpdateExpenseDto
} from '../models/expense.dto'
import { useAuthStore } from '../stores/auth'

const useExpenseClient = () => {
	const { token: accessToken } = useAuthStore()
	const token = accessToken || ''

	const getByUser = async (
		page: number,
		pageSize: number
	): Promise<PaginatedData<ExpenseDto>> => {
		try {
			const response = await apiClient.get<PaginatedData<ExpenseDto>>(
				'/expense/by-user',
				token,
				{
					page,
					pageSize
				}
			)
			return response
		} catch (error) {
			console.error('Client: Error on get expenses by user', error)
			throw error
		}
	}

	const create = async (expense: CreateExpenseDto) => {
		try {
			const response = await apiClient.post<ExpenseDto>(
				'/expense',
				token,
				expense
			)
			return response
		} catch (error) {
			console.error('Client: Error on create expense', error)
			throw error
		}
	}

	const update = async (expense: UpdateExpenseDto) => {
		try {
			const response = await apiClient.put<ExpenseDto>(
				'/expense',
				token,
				expense
			)
			return response
		} catch (error) {
			console.error('Client: Error on update expense', error)
			throw error
		}
	}

	const deleteExpense = async (id: string) => {
		try {
			await apiClient.delete(`/expense/${id}`, token)
		} catch (error) {
			console.error('Client: Error on delete expense', error)
			throw error
		}
	}

	const deleteMultiple = async (ids: string[]) => {
		try {
			const promises = ids.map((id) => deleteExpense(id))
			Promise.allSettled(promises)
		} catch (error) {
			console.error('Client: Error on delete multiple expenses', error)
			throw error
		}
	}

	return { getByUser, create, update, deleteExpense, deleteMultiple }
}

export default useExpenseClient
