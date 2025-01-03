import { Card } from 'antd'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Carousel from '../../../components/carousel'
import useCheckingAccount from '../../../hook/useCheckingAccount'
import { CheckingAccountDto } from '../../../models/checking-account.dto'
import CreditCard from '../../../components/credit-card'
import { useAuthStore } from '../../../stores/auth'

const MyCheckingAccounts = () => {
	const { user } = useAuthStore()
	const { t } = useTranslation()
	const { getByUser } = useCheckingAccount()
	const [loading, setLoading] = useState(false)
	const [checkingAccounts, setCheckiingAccounts] = useState<
		CheckingAccountDto[]
	>([])

	useEffect(() => {
		const fetchData = async () => {
			const response = await getByUser()
			setCheckiingAccounts(response)
		}

		fetchData()
	}, [])

	return (
		<div>
			<h1 className="text-2xl font-bold">{t('checkingAccount.title')}</h1>

			<Carousel
				loop
				visibleSlides={5}
				onActiveChange={(index) => {
					console.log(index)
				}}
				loading={loading}
			>
				{checkingAccounts.map((checkingAccount, index) => (
					<CreditCard
						name={user?.name || 'User'}
						bank={checkingAccount.name}
						color={checkingAccount.color}
					/>
				))}
			</Carousel>
		</div>
	)
}

export default MyCheckingAccounts
