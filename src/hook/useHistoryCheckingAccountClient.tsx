import { useState } from 'react'
import apiClient from '../adapters/api/fetch-client'
import {
	BalanceDifferenceDto,
	HistoryCheckingAccountDto
} from '../models/history-checking-account.dto'
import { useAuthStore } from '../stores/auth'

const useHistoryCheckingAccountClient = () => {
	const [loading, setLoading] = useState<boolean>(false)
	const { token: accessToken } = useAuthStore()
	const token = accessToken || ''
	const baseUrl = '/history-checking-account'

	const getByCheckingAccount = async (
		checkingAccountId: string
	): Promise<HistoryCheckingAccountDto[]> => {
		try {
			setLoading(true)
			const response = await apiClient.get<HistoryCheckingAccountDto[]>(
				`${baseUrl}/by-checking-account/${checkingAccountId}`,
				token
			)
			if (!response) {
				throw new Error('No response from server')
			}
			return response
		} catch (error) {
			console.error('Client: Error on get history by checking account', error)
			throw error
		} finally {
			setLoading(false)
		}
	}

	const getLastIncome = async (
		checkingAccountId: string
	): Promise<BalanceDifferenceDto> => {
		try {
			setLoading(true)
			const response = await apiClient.get<BalanceDifferenceDto>(
				`${baseUrl}/last-income/${checkingAccountId}`,
				token
			)
			return response
		} catch (error) {
			console.error(
				'Client: Error on get last income of checking account',
				error
			)
			throw error
		} finally {
			setLoading(false)
		}
	}

	const getLastExpense = async (
		checkingAccountId: string
	): Promise<BalanceDifferenceDto> => {
		try {
			setLoading(true)
			const response = await apiClient.get<BalanceDifferenceDto>(
				`${baseUrl}/last-expense/${checkingAccountId}`,
				token
			)
			return response
		} catch (error) {
			console.error(
				'Client: Error on get last expense of checking account',
				error
			)
			throw error
		} finally {
			setLoading(false)
		}
	}

	return {
		getByCheckingAccount,
		getLastIncome,
		getLastExpense,
		loading
	}
}

export default useHistoryCheckingAccountClient
