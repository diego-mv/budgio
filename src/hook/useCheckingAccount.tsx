import apiClient from '../adapters/api/fetch-client'
import {
	CheckingAccountDto,
	CreateCheckingAccountDto,
	UpdateCheckingAccountDto
} from '../models/checking-account.dto'
import { useAuthStore } from '../stores/auth'

const useCheckingAccount = () => {
	const baseUrl = '/checking-account'
	const { token: accessToken } = useAuthStore()
	const token = accessToken || ''

	const getByUser = async (): Promise<CheckingAccountDto[]> => {
		try {
			const response = await apiClient.get<CheckingAccountDto[]>(
				`${baseUrl}/by-user`,
				token
			)
			return response
		} catch (error) {
			console.error('Client: Error on get checking accounts by user', error)
			throw error
		}
	}

	const create = async (checkingAccount: CreateCheckingAccountDto) => {
		try {
			const response = await apiClient.post<CheckingAccountDto>(
				`${baseUrl}`,
				token,
				checkingAccount
			)
			return response
		} catch (error) {
			console.error('Client: Error on create checking account', error)
			throw error
		}
	}

	const update = async (checkingAccount: UpdateCheckingAccountDto) => {
		try {
			const response = await apiClient.put<UpdateCheckingAccountDto>(
				`${baseUrl}`,
				token,
				checkingAccount
			)
			return response
		} catch (error) {
			console.error('Client: Error on update checking account', error)
			throw error
		}
	}

	const deleteCheckingAccount = async (id: string) => {
		try {
			await apiClient.delete(`${baseUrl}/${id}`, token)
		} catch (error) {
			console.error('Client: Error on delete checking account', error)
			throw error
		}
	}

	const deleteMultiple = async (ids: string[]) => {
		try {
			const promises = ids.map((id) => deleteCheckingAccount(id))
			Promise.allSettled(promises)
		} catch (error) {
			console.error('Client: Error on delete multiple checking account', error)
			throw error
		}
	}

	return { getByUser, create, update, deleteCheckingAccount, deleteMultiple }
}

export default useCheckingAccount
