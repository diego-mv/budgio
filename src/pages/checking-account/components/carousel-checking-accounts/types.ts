import { CheckingAccountDto } from '../../../../models/checking-account.dto'

export interface CarouselCheckingAccountProps {
	checkingAccounts: CheckingAccountDto[]
	onChangeCarousel: (index: number) => void
}
