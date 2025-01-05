import { CheckingAccountDto } from '../../../models/checking-account.dto'

export interface CreateCheckingAccountProps {
	onCreate: (checkingAccount: CheckingAccountDto) => void
}
