import apiClient from '../adapters/api/fetch-client'
import {
	CreateExpenseCreditCardDto,
	ExpenseCreditCardDto
} from '../models/expense-credit-card.dto'
import { useAuthStore } from '../stores/auth'

const useExpenseCreditCardClient = () => {
	const baseUrl = '/expense-credit-card'
	const { token: accessToken } = useAuthStore()
	const token = accessToken || ''

	const create = async (expense: CreateExpenseCreditCardDto) => {
		try {
			const response = await apiClient.post<ExpenseCreditCardDto>(
				`${baseUrl}`,
				token,
				expense
			)
			return response
		} catch (error) {
			console.error('Client: Error on create expense credit card', error)
			throw error
		}
	}
	return { create }
}

export default useExpenseCreditCardClient
