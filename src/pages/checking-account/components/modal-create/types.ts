import { CheckingAccountDto } from '../../../../models/checking-account.dto'

export interface ModalCreateCheckingAccountProps {
	open: boolean
	onCreate: (checkingAccount: CheckingAccountDto) => void
	onClose: () => void
}
