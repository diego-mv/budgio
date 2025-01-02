import { CONSTANTS } from '../../constants'
import { Utils } from '../../utils'

export interface ApiClient {
	get<T>(url: string, params?: object): Promise<T>
	post<T>(url: string, data: object): Promise<T>
	put<T>(url: string, data: object): Promise<T>
	delete<T>(url: string): Promise<T>
}

const apiClient: ApiClient = {
	get: async <T>(url: string, params: object) => {
		const queryString = params
			? `?${new URLSearchParams(params as Record<string, string>).toString()}`
			: ''
		const response = await fetch(`${CONSTANTS.API_URL}${url}${queryString}`, {
			method: 'GET',
			headers: getHeaders()
		})
		return handleResponse<T>(response)
	},
	post: async <T>(url: string, data: any) => {
		const response = await fetch(`${CONSTANTS.API_URL}${url}`, {
			method: 'POST',
			headers: getHeaders(),
			body: JSON.stringify(data)
		})
		return handleResponse<T>(response)
	},
	put: async <T>(url: string, data: any) => {
		const response = await fetch(`${CONSTANTS.API_URL}${url}`, {
			method: 'PUT',
			headers: getHeaders(),
			body: JSON.stringify(data)
		})
		return handleResponse<T>(response)
	},
	delete: async <T>(url: string) => {
		const response = await fetch(`${CONSTANTS.API_URL}${url}`, {
			method: 'DELETE',
			headers: getHeaders()
		})
		return handleResponse<T>(response)
	}
}

const getHeaders = (): HeadersInit => {
	const token = Utils.SessionStorage.getToken()
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
