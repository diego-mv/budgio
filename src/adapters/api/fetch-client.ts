import { CONSTANTS } from '../../constants'
import { Utils } from '../../utils'

export interface ApiClient {
	get<T>(url: string, token: string, params?: object): Promise<T>
	post<T>(url: string, token: string, data: object): Promise<T>
	put<T>(url: string, token: string, data: object): Promise<T>
	delete(url: string, token: string): Promise<void>
}

const apiClient: ApiClient = {
	get: async <T>(url: string, token: string, params?: object) => {
		const queryString = params
			? `?${new URLSearchParams(params as Record<string, string>).toString()}`
			: ''
		const response = await fetch(`${CONSTANTS.API_URL}${url}${queryString}`, {
			method: 'GET',
			headers: getHeaders(token)
		})
		return handleResponse<T>(response)
	},
	post: async <T>(url: string, token: string, data: any) => {
		const response = await fetch(`${CONSTANTS.API_URL}${url}`, {
			method: 'POST',
			headers: getHeaders(token),
			body: JSON.stringify(data)
		})
		return handleResponse<T>(response)
	},
	put: async <T>(url: string, token: string, data: any) => {
		const response = await fetch(`${CONSTANTS.API_URL}${url}`, {
			method: 'PUT',
			headers: getHeaders(token),
			body: JSON.stringify(data)
		})
		return handleResponse<T>(response)
	},
	delete: async (url: string, token: string): Promise<void> => {
		const response = await fetch(`${CONSTANTS.API_URL}${url}`, {
			method: 'DELETE',
			headers: getHeaders(token)
		})
	}
}

const getHeaders = (token: string): HeadersInit => {
	return {
		'Content-Type': 'application/json',
		...(token ? { Authorization: `Bearer ${token}` } : {})
	}
}

const handleResponse = async <T>(response: Response): Promise<T> => {
	if (!response.ok) {
		if (response.status === 401) {
			Utils.SessionStorage.reset()
			window.location.href = 'auth/login'
		}
		throw new Error(`HTTP Error: ${response.status}`)
	}
	return response.json()
}

export default apiClient
