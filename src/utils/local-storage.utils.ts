export const LocalStorage = {
	getUrlRedirect: () => {
		return localStorage?.getItem('url_redirect') || undefined
	},

	setUrlRedirect: (url: string) => {
		localStorage.setItem('url_redirect', url)
	},

	removeUrlRedirect: () => {
		localStorage.removeItem('url_redirect')
	},

	reset: () => {
		localStorage?.removeItem('url_redirect')
	}
}
