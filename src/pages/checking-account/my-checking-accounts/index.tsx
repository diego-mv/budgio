import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import useCheckingAccount from '../../../hook/useCheckingAccount'
import { CheckingAccountDto } from '../../../models/checking-account.dto'
import useEmblaCarousel from 'embla-carousel-react'
import Carousel from '../../../components/carousel'
import { Card } from 'antd'

const MyCheckingAccounts = () => {
	const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })
	const { t } = useTranslation()
	const { getByUser } = useCheckingAccount()
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

			<Carousel loop>
				{checkingAccounts.map((checkingAccount, index) => (
					<Card
						key={checkingAccount.id}
						className={`min-w-80 min-h-52`}
						style={{ background: `#${checkingAccount.color}` }}
					>
						<h1>{index}</h1>
						<h2>{checkingAccount.name}</h2>
						<p>{checkingAccount.balance}</p>
					</Card>
				))}
			</Carousel>
		</div>
	)
}

export default MyCheckingAccounts
