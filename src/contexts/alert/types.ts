export interface AlertContextData {
	showError: (message: string) => void
	showSuccess: (message: string) => void
	showAlert: (message: string) => void
}

export interface AlertProviderProps {
	children: React.ReactNode
}
