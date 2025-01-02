const API_ENDPOINTS = {
	AUTH: {
		login: 'auth/login',
		updatePassword: 'auth/password'
	},
	USER: {
		create: 'user',
		updateRole: 'user/role'
	},
	ROLE: {
		getAll: 'role',
		create: 'role'
	},
	SUBJECT: {
		getAll: 'subject',
		create: 'subject'
	}
}

export default API_ENDPOINTS
