import { Alert } from 'antd'
import { createContext, useContext, useState } from 'react'
import { AlertContextData, AlertProviderProps } from './types'

export const AlertContext = createContext<AlertContextData>(
	{} as AlertContextData
)

export const useAlertContext = () => useContext(AlertContext)

export const AlertProvider: React.FC<AlertProviderProps> = ({ children }) => {
	const [type, setType] = useState<'success' | 'warning' | 'error'>('warning')
	const [message, setMessage] = useState<string>('')
	const [open, setOpen] = useState<boolean>(false)

	const showMessage = (
		message: string,
		type: 'success' | 'warning' | 'error'
	) => {
		setMessage(message)
		setType(type)
		setOpen(true)

		setTimeout(() => {
			setOpen(false)
		}, 2000)
	}

	const showAlert = (message: string) => {
		showMessage(message, 'warning')
	}

	const showError = (message: string) => {
		showMessage(message, 'error')
	}
	const showSuccess = (message: string) => {
		showMessage(message, 'success')
	}

	const values: AlertContextData = {
		showAlert,
		showError,
		showSuccess
	}

	return (
		<AlertContext.Provider value={values}>
			{open && message && (
				<Alert
					className="absolute z-50 bottom-10 right-10"
					message={message}
					type={type}
					showIcon
				/>
			)}
			{children}
		</AlertContext.Provider>
	)
}
