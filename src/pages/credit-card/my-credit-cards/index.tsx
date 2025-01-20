import {
	faChartLine,
	faCreditCard,
	faFileInvoiceDollar,
	faHourglassHalf
} from '@fortawesome/free-solid-svg-icons'
import { Col, Row } from 'antd'
import { differenceInDays, getDate, parseISO } from 'date-fns'
import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Carousel from '../../../components/carousel'
import CreditCard from '../../../components/credit-card'
import EmptyCards from '../../../components/empty-card'
import MetricCard from '../../../components/metric-card'
import { useAlertContext } from '../../../contexts/alert/AlertContext'
import useCreditCardClient from '../../../hook/useCreditCardClient'
import useModal from '../../../hook/useModal'
import { CreditCardDto } from '../../../models/credit-card.dto'
import { ExpenseCreditCardDto } from '../../../models/expense-credit-card.dto'
import { useAuthStore } from '../../../stores/auth'
import ActionsCreditCard from '../components/actions-credit-card'
import ModalAddBuy from '../components/modal-add-buy'
import ModalAddCreditCard from '../components/modal-add-credit-card'
import ModalUpdateCreditCard from '../components/modal-update'

const MyCreditCards = () => {
	const [currentCreditCard, setCurrentCreditCard] = useState<CreditCardDto>(
		{} as CreditCardDto
	)
	const [creditCards, setCreditCards] = useState<CreditCardDto[]>([])
	const { user } = useAuthStore()
	const { getByUser, deleteCreditCard } = useCreditCardClient()
	const [loading, setLoading] = useState(true)
	const { t } = useTranslation()
	const { showError, showSuccess } = useAlertContext()
	const {
		isOpen: isOpenAddBuy,
		handleClose: handleCloseAddBuy,
		handleOpen: handleOpenAddBuy
	} = useModal()
	const {
		isOpen: isOpenAddCard,
		handleClose: handleCloseAddCard,
		handleOpen: handleOpenAddCard
	} = useModal()
	const {
		isOpen: isOpenUpdate,
		handleClose: handleCloseUpdate,
		handleOpen: handleOpenUpdate
	} = useModal()

	const getDaysToPay = useMemo(() => {
		const today = new Date()
		const dueDate = parseISO(currentCreditCard?.dueDate?.toString() ?? '')
		const dayOfMonth = getDate(dueDate)
		const currentMonthTargetDate = new Date(
			today.getFullYear(),
			today.getMonth(),
			dayOfMonth
		)
		let daysUntilTarget

		if (currentMonthTargetDate.toDateString() === today.toDateString()) {
			daysUntilTarget = 0
		} else if (currentMonthTargetDate > today) {
			daysUntilTarget = differenceInDays(currentMonthTargetDate, today) + 1
		} else {
			const nextMonthTargetDate = new Date(
				today.getFullYear(),
				today.getMonth() + 1,
				dayOfMonth
			)
			daysUntilTarget = differenceInDays(nextMonthTargetDate, today) + 1
		}

		return daysUntilTarget
	}, [currentCreditCard?.id])

	const fetchData = async () => {
		try {
			setLoading(true)
			const creditCards = await getByUser()
			setCreditCards(creditCards)
		} catch (error) {
			console.error(error)
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		fetchData()
	}, [user])

	const handleChangeCarousel = (index: number) => {
		const current = creditCards[index]
		setCurrentCreditCard(current)
	}

	const handleDeleteCreditCard = async () => {
		try {
			await deleteCreditCard(currentCreditCard?.id)

			showSuccess(t('messages.successDelete'))
			await fetchData()
		} catch (error) {
			console.error(error)
			showError(t('errors.errorDelete'))
		}
	}

	const handleAddBuy = (_: ExpenseCreditCardDto) => {
		handleCloseAddBuy()
		// fetchData()
	}

	const handleAddCard = (_: CreditCardDto) => {
		handleCloseAddCard()
		fetchData()
	}

	if (loading) return <div>Loading...</div>

	return (
		<div>
			<ModalAddBuy
				creditCardId={currentCreditCard?.id}
				isOpen={isOpenAddBuy}
				handleClose={handleCloseAddBuy}
				handleAddBuy={handleAddBuy}
			/>
			<ModalAddCreditCard
				isOpen={isOpenAddCard}
				handleClose={handleCloseAddCard}
				handleAddCreditCard={handleAddCard}
			/>
			<ModalUpdateCreditCard
				isOpen={isOpenUpdate}
				handleClose={handleCloseUpdate}
			/>

			<h1 className="text-2xl font-bold">{t('creditCard.title')}</h1>
			<div className="mt-4 gap-4"></div>

			{creditCards.length > 0 ? (
				<>
					<Carousel onActiveChange={handleChangeCarousel} visibleSlides={5}>
						{creditCards.map((creditCard) => (
							<CreditCard
								key={creditCard.id}
								bank={creditCard.name}
								color={creditCard.color}
								name={user?.name || 'User'}
								type={'credit'}
							/>
						))}
					</Carousel>
					<ActionsCreditCard
						creditCardId={currentCreditCard?.id}
						handleDeleteCreditCard={handleDeleteCreditCard}
						handleOpenCreate={handleOpenAddCard}
						handleOpenUpdateCreditCard={handleOpenUpdate}
						handleOpenAddBuy={handleOpenAddBuy}
					/>

					<Row gutter={[16, 16]} className="mt-14">
						<Col xl={6} lg={8} md={8} sm={24} xs={24}>
							<MetricCard
								money
								icon={faCreditCard}
								title={t('creditCard.creditLimit')}
								value={currentCreditCard?.creditLimit || 0}
								loading={loading}
							/>
						</Col>
						<Col xl={6} lg={8} md={8} sm={24} xs={24}>
							<MetricCard
								money
								icon={faChartLine}
								title={t('creditCard.creditUsed')}
								value={50000}
								loading={true}
							/>
						</Col>
						<Col xl={6} lg={8} md={8} sm={24} xs={24}>
							<MetricCard
								money
								icon={faFileInvoiceDollar}
								title={t('creditCard.nextPayment')}
								value={1000000}
								loading={true}
							/>
						</Col>
						<Col xl={6} lg={8} md={8} sm={24} xs={24}>
							<MetricCard
								icon={faHourglassHalf}
								title={t('creditCard.daysToPay')}
								value={getDaysToPay}
								loading={loading}
							/>
						</Col>
					</Row>
				</>
			) : (
				<EmptyCards onOpenCreate={handleOpenAddCard} />
			)}
		</div>
	)
}

export default MyCreditCards
