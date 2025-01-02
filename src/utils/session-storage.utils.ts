export const SessionStorage = {
	getToken: () => {
		return sessionStorage?.getItem('token') || undefined
	},

	setToken: (token: string) => {
		sessionStorage?.setItem('token', token)
	},

	reset: () => {
		sessionStorage?.removeItem('token')
	}
}
