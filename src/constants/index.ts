interface IConstantsEnv {
	API_URL: string
	ENVIRONMENT: 'production' | 'development'
}

export const CONSTANTS: IConstantsEnv = {
	API_URL: import.meta.env.VITE_API_URL,
	ENVIRONMENT: import.meta.env.VITE_ENVIRONMENT || 'development'
}
