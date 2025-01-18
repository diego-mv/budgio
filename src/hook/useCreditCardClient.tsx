import apiClient from '../adapters/api/fetch-client'
import {
	CreateCreditCardDto,
	CreditCardDto,
	UpdateCreditCardDto
} from '../models/credit-card.dto'
import { useAuthStore } from '../stores/auth'

const useCreditCardClient = () => {
	const baseUrl = '/credit-card'
	const { token: accessToken } = useAuthStore()
	const token = accessToken || ''

	const getByUser = async (): Promise<CreditCardDto[]> => {
		try {
			const response = await apiClient.get<CreditCardDto[]>(
				`${baseUrl}/by-user`,
				token
			)
			return response
		} catch (error) {
			console.error('Client: Error on get credit cards by user', error)
			throw error
		}
	}

	const create = async (creditCard: CreateCreditCardDto) => {
		try {
			const response = await apiClient.post<CreditCardDto>(
				`${baseUrl}`,
				token,
				creditCard
			)
			return response
		} catch (error) {
			console.error('Client: Error on create credit card', error)
			throw error
		}
	}

	const update = async (
		creditCard: UpdateCreditCardDto
	): Promise<CreditCardDto> => {
		try {
			const response = await apiClient.put<CreditCardDto>(
				`${baseUrl}`,
				token,
				creditCard
			)
			return response
		} catch (error) {
			console.error('Client: Error on update credit card', error)
			throw error
		}
	}

	const deleteCreditCard = async (id: string) => {
		try {
			await apiClient.delete(`${baseUrl}/${id}`, token)
		} catch (error) {
			console.error('Client: Error on delete credit card', error)
			throw error
		}
	}

	const deleteMultiple = async (ids: string[]) => {
		try {
			const promises = ids.map((id) => deleteCreditCard(id))
			Promise.allSettled(promises)
		} catch (error) {
			console.error('Client: Error on delete multiple credit card', error)
			throw error
		}
	}

	const importExpenses = async (creditCardId: string, formData: FormData) => {
		try {
			const response = await apiClient.uploadFormData(
				`/expense-credit-card/import-expenses/${creditCardId}`,
				token,
				formData
			)

			return response
		} catch (error) {
			console.error('Client: Error on import expenses to credit card', error)
			throw error
		}
	}

	return {
		getByUser,
		create,
		update,
		deleteCreditCard,
		deleteMultiple,
		importExpenses
	}
}

export default useCreditCardClient
