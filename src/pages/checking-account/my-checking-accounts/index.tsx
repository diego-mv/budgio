import {
	faHandHoldingDollar,
	faMoneyBillWave,
	faPenToSquare,
	faScaleBalanced,
	faWallet
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Col, Row } from 'antd'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import CustomButton from '../../../components/button'
import Carousel from '../../../components/carousel'
import CreditCard from '../../../components/credit-card'
import MetricCard from '../../../components/metric-card'
import useCheckingAccount from '../../../hook/useCheckingAccount'
import { CheckingAccountDto } from '../../../models/checking-account.dto'
import { useAuthStore } from '../../../stores/auth'
import UpdateAmountCheckingAccount from '../components/update-amount'
import UpdateCheckingAccount from '../components/update-checking-account'

const MyCheckingAccounts = () => {
	const { user } = useAuthStore()
	const { t } = useTranslation()
	const { getByUser } = useCheckingAccount()
	const [loading, setLoading] = useState(true)
	const [checkingAccounts, setCheckiingAccounts] = useState<
		CheckingAccountDto[]
	>([])
	const [currentCheckingAccount, setCurrentCheckingAccount] =
		useState<CheckingAccountDto>({} as CheckingAccountDto)
	const [openUpdate, setOpenUpdate] = useState(false)
	const [openUpdateBalance, setOpenUpdateBalance] = useState(false)

	const fetchData = async () => {
		setLoading(true)
		const response = await getByUser()
		setCheckiingAccounts(response)
		setCurrentCheckingAccount(response[0])
		setLoading(false)
	}

	useEffect(() => {
		fetchData()
	}, [])

	const onChangeCarousel = (index: number) => {
		setCurrentCheckingAccount(checkingAccounts[index])
	}

	const handleOpenUpdateCheckingAccount = () => {
		setOpenUpdate(true)
	}

	const handleOpenUpdateBalance = () => {
		setOpenUpdateBalance(true)
	}

	const onCloseUpdate = () => {
		setOpenUpdate(false)
	}

	const onCloseUpdateBalance = () => {
		setOpenUpdateBalance(false)
	}

	const onUpdateCheckingAccount = async (
		checkingAccount: CheckingAccountDto
	) => {
		const currentIndex = checkingAccounts.findIndex(
			(checkingAccount) => checkingAccount.id === currentCheckingAccount.id
		)

		const copy = [...checkingAccounts]
		copy[currentIndex].name = checkingAccount.name
		copy[currentIndex].balance = checkingAccount.balance
		copy[currentIndex].color = checkingAccount.color
		copy[currentIndex].updatedAt = checkingAccount.updatedAt

		setCheckiingAccounts(copy)
	}

	const onUpdateBalance = async (amount: number) => {
		const currentIndex = checkingAccounts.findIndex(
			(checkingAccount) => checkingAccount.id === currentCheckingAccount.id
		)

		const copy = [...checkingAccounts]
		copy[currentIndex].balance = amount
		setCheckiingAccounts(copy)
		setOpenUpdateBalance(false)
	}

	return (
		<div>
			<UpdateCheckingAccount
				checkingAccount={currentCheckingAccount}
				open={openUpdate}
				onClose={onCloseUpdate}
				onUpdateCheckingAccount={onUpdateCheckingAccount}
			/>
			<UpdateAmountCheckingAccount
				open={openUpdateBalance}
				onClose={onCloseUpdateBalance}
				amount={currentCheckingAccount?.balance ?? 0}
				checkingAccountId={currentCheckingAccount?.id ?? ''}
				onUpdateAmount={onUpdateBalance}
			/>
			<h1 className="text-2xl font-bold">{t('checkingAccount.title')}</h1>

			<div className="mt-4 gap-4">
				<div className="w-full">
					<Carousel
						loop
						visibleSlides={5}
						onActiveChange={onChangeCarousel}
						loading={loading}
					>
						{checkingAccounts.map((checkingAccount) => (
							<CreditCard
								key={checkingAccount.id}
								name={user?.name || 'User'}
								bank={checkingAccount.name}
								color={checkingAccount.color}
							/>
						))}
					</Carousel>
				</div>

				<div className="w-full flex justify-center">
					<CustomButton
						className="rounded-xl font-bold shadow-sm ml-2"
						size="large"
						icon={<FontAwesomeIcon icon={faScaleBalanced} />}
						onClick={handleOpenUpdateBalance}
					>
						Actualizar saldo
					</CustomButton>
					<CustomButton
						className="rounded-xl font-bold shadow-sm ml-2"
						size="large"
						icon={<FontAwesomeIcon icon={faPenToSquare} />}
						onClick={handleOpenUpdateCheckingAccount}
					>
						Actualizar tarjeta
					</CustomButton>
				</div>

				<div className="w-full">
					<Row gutter={[16, 16]}>
						<Col xl={8} lg={8} md={8} sm={24} xs={24}>
							<MetricCard
								money
								title="Balance actual"
								value={currentCheckingAccount?.balance ?? 0}
								icon={faWallet}
								loading={loading}
							/>
						</Col>
						<Col xl={8} lg={8} md={8} sm={24} xs={24}>
							<MetricCard
								money
								title="Último ingreso"
								value={0}
								icon={faMoneyBillWave}
								loading={true}
							/>
						</Col>
						<Col xl={8} lg={8} md={8} sm={24} xs={24}>
							<MetricCard
								money
								title="Último gasto"
								value={-110}
								icon={faHandHoldingDollar}
								colors
								loading={true}
							/>
						</Col>
					</Row>
				</div>
			</div>
		</div>
	)
}

export default MyCheckingAccounts
