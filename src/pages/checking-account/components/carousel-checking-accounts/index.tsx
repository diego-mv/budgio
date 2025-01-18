import React from 'react'
import { CarouselCheckingAccountProps } from './types'
import Carousel from '../../../../components/carousel'
import CreditCard from '../../../../components/credit-card'
import { useAuthStore } from '../../../../stores/auth'

const CarouselCheckingAccounts: React.FC<CarouselCheckingAccountProps> = ({
	checkingAccounts,
	onChangeCarousel
}) => {
	const { user } = useAuthStore()

	return (
		<Carousel loop visibleSlides={5} onActiveChange={onChangeCarousel}>
			{checkingAccounts.map((account) => (
				<CreditCard
					key={account.id}
					bank={account.name}
					color={account.color}
					name={user?.name || 'User'}
					type="debit"
				/>
			))}
		</Carousel>
	)
}

export default CarouselCheckingAccounts
