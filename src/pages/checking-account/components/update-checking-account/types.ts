import { CheckingAccountDto } from '../../../../models/checking-account.dto'

export interface UpdateCheckingAccountProps {
	checkingAccount: CheckingAccountDto
	onUpdateCheckingAccount: (checkingAccount: CheckingAccountDto) => void
	open: boolean
	onClose: () => void
}
