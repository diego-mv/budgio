import { Spin } from 'antd'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useAlertContext } from '../../../contexts/alert/AlertContext'
import useCheckingAccountClient from '../../../hook/useCheckingAccount'
import useModal from '../../../hook/useModal'
import { CheckingAccountDto } from '../../../models/checking-account.dto'
import ActionsCheckingAccount from '../components/actions-checking-account'
import CarouselCheckingAccounts from '../components/carousel-checking-accounts'
import DetailsCheckingAccount from '../components/details-checking-account'
import EmptyCheckingAccounts from '../components/empty-checking-accounts'
import ModalCreateCheckingAccount from '../components/modal-create'
import UpdateAmountCheckingAccount from '../components/update-amount'
import UpdateCheckingAccount from '../components/update-checking-account'

const MyCheckingAccounts = () => {
	const { t } = useTranslation()
	const { showError, showSuccess } = useAlertContext()
	const { getByUser, deleteCheckingAccount } = useCheckingAccountClient()
	const [loading, setLoading] = useState(true)
	const [checkingAccounts, setCheckingAccounts] = useState<
		CheckingAccountDto[]
	>([])
	const [currentCheckingAccount, setCurrentCheckingAccount] =
		useState<CheckingAccountDto>({} as CheckingAccountDto)

	const {
		isOpen: isOpenCreate,
		handleOpen: handleOpenCreate,
		handleClose: handleCloseCreate
	} = useModal()
	const {
		isOpen: isOpenUpdate,
		handleOpen: handleOpenUpdate,
		handleClose: handleCloseUpdate
	} = useModal()
	const {
		isOpen: isOpenBalance,
		handleOpen: handleOpenBalance,
		handleClose: handleCloseBalance
	} = useModal()

	const fetchData = async () => {
		setLoading(true)
		const response = await getByUser()
		setCheckingAccounts(response)
		setCurrentCheckingAccount(response[0])
		setLoading(false)
	}

	useEffect(() => {
		fetchData()
	}, [])

	const onChangeCarousel = (index: number) => {
		setCurrentCheckingAccount(checkingAccounts[index])
	}

	const onUpdateCheckingAccount = async (
		checkingAccount: CheckingAccountDto
	) => {
		const currentIndex = checkingAccounts.findIndex(
			(checkingAccount) => checkingAccount.id === currentCheckingAccount.id
		)

		const copy = [...checkingAccounts]
		copy[currentIndex].name = checkingAccount.name
		copy[currentIndex].color = checkingAccount.color

		setCheckingAccounts(copy)
		handleCloseUpdate()
	}

	const onUpdateBalance = async (amount: number) => {
		const currentIndex = checkingAccounts.findIndex(
			(checkingAccount) => checkingAccount.id === currentCheckingAccount.id
		)

		const copy = [...checkingAccounts]
		copy[currentIndex].balance = amount
		setCheckingAccounts(copy)
		handleCloseBalance()
	}

	const onCreateCheckingAccount = async (
		checkingAccount: CheckingAccountDto
	) => {
		setCheckingAccounts([...checkingAccounts, checkingAccount])
		handleCloseCreate()
	}

	const handleDeleteCeckingAccount = async () => {
		try {
			setLoading(true)
			await deleteCheckingAccount(currentCheckingAccount.id)
			showSuccess(t('checkingAccount.deleteSuccess'))
			fetchData()
		} catch (error) {
			showError(error as string)
		} finally {
			setLoading(false)
		}
	}

	if (loading) {
		return (
			<div className="w-full flex justify-center items-center h-full min-h-screen">
				<Spin size="large"></Spin>
			</div>
		)
	}

	return (
		<div>
			<ModalCreateCheckingAccount
				open={isOpenCreate}
				onClose={handleCloseCreate}
				onCreate={onCreateCheckingAccount}
			/>
			<UpdateCheckingAccount
				checkingAccount={currentCheckingAccount}
				open={isOpenUpdate}
				onClose={handleCloseUpdate}
				onUpdateCheckingAccount={onUpdateCheckingAccount}
			/>
			<UpdateAmountCheckingAccount
				open={isOpenBalance}
				onClose={handleCloseBalance}
				amount={currentCheckingAccount?.balance ?? 0}
				checkingAccountId={currentCheckingAccount?.id ?? ''}
				onUpdateAmount={onUpdateBalance}
			/>
			<h1 className="text-2xl font-bold">{t('checkingAccount.title')}</h1>

			<div className="mt-4 gap-4">
				{checkingAccounts.length > 0 ? (
					<>
						<CarouselCheckingAccounts
							checkingAccounts={checkingAccounts}
							onChangeCarousel={onChangeCarousel}
						/>
						<ActionsCheckingAccount
							handleDeleteCheckingAccount={handleDeleteCeckingAccount}
							handleOpenCreate={handleOpenCreate}
							handleOpenUpdateBalance={handleOpenBalance}
							handleOpenUpdateCheckingAccount={handleOpenUpdate}
						/>

						<div className="w-full mt-4">
							<DetailsCheckingAccount
								checkingAccount={currentCheckingAccount}
								loading={loading}
							/>
						</div>
					</>
				) : (
					<EmptyCheckingAccounts onOpenCreate={handleOpenCreate} />
				)}
			</div>
		</div>
	)
}

export default MyCheckingAccounts
