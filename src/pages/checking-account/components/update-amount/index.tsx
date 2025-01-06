import { Form, Input, Modal, Popconfirm, Radio, RadioChangeEvent } from 'antd'
import { useTranslation } from 'react-i18next'
import CustomButton from '../../../../components/button'
import CustomInput from '../../../../components/input'
import { useAlertContext } from '../../../../contexts/alert/AlertContext'
import useCheckingAccountClient from '../../../../hook/useCheckingAccount'
import { UpdateAmountProps, UpdateBalanceForm } from './types'
import { useEffect, useState } from 'react'
import { UpdateBalanceCheckingAccountDto } from '../../../../models/checking-account.dto'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
	faArrowTrendDown,
	faArrowTrendUp,
	faBalanceScale,
	faMoneyBillTransfer
} from '@fortawesome/free-solid-svg-icons'
import { set } from 'date-fns'
import CustomInputNumber from '../../../../components/input-number'

const UpdateAmountCheckingAccount: React.FC<UpdateAmountProps> = ({
	checkingAccountId,
	onUpdateAmount,
	amount,
	open,
	onClose
}) => {
	const { updateBalance } = useCheckingAccountClient()
	const { showError, showSuccess } = useAlertContext()
	const { t } = useTranslation()
	const [form] = Form.useForm<UpdateBalanceForm>()
	const [isOpenConfirm, setIsOpenConfirm] = useState(false)
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		if (open) {
			form.setFieldsValue({ amount, description: '' })
		}

		;() => {
			setIsOpenConfirm(false)
		}
	}, [checkingAccountId, amount, open, form])

	const onSubmit = async (values: UpdateBalanceForm) => {
		try {
			const amount = Number(values.amount)
			if (isNaN(amount) || !Number.isInteger(amount)) {
				showError(t('errors.errorInteger'))
				return
			}
			setLoading(true)
			setIsOpenConfirm(false)
			const updateBalanceDto: UpdateBalanceCheckingAccountDto = {
				amount: amount,
				type: values.type,
				description: values.description
			}

			const updatedCheckingAccount = await updateBalance(
				checkingAccountId,
				updateBalanceDto
			)
			showSuccess(t('checkingAccount.updatedBalance'))
			form.resetFields()
			onUpdateAmount(updatedCheckingAccount.balance)
		} catch (error) {
			showError('errors.onUpdate')
		} finally {
			setLoading(false)
			setIsOpenConfirm(false)
		}
	}

	const onChangeType = (e: RadioChangeEvent) => {
		const value = e.target.value ?? 'balance'
		if (value === 'balance') {
			form.setFieldsValue({ amount: amount })
			return
		}

		form.setFieldsValue({ amount: 0 })
	}

	const confirmText = () => {
		const type = form.getFieldValue('type')
		const amount = form.getFieldValue('amount')

		switch (type) {
			case 'income':
				return t('checkingAccount.confirmUpdateIncome', { amount })
			case 'expense':
				return t('checkingAccount.confirmUpdateExpense', { amount })
			default:
				return t('checkingAccount.confirmUpdateBalance', { amount })
		}
	}

	const handleButtonSubmit = async () => {
		try {
			await form.validateFields(['type', 'amount'])
			setIsOpenConfirm(true)
		} catch (_) {
			setIsOpenConfirm(false)
		}
	}

	const handleCloseIsOpenConfirm = () => {
		setIsOpenConfirm(false)
	}

	return (
		<Modal open={open} footer={null} onCancel={onClose}>
			{open && (
				<>
					<h1 className="text-xl font-bold mt-4">
						{t('checkingAccount.updateBalanceTitle')}
					</h1>
					<Form
						form={form}
						className="py-4 pt-10"
						onFinish={onSubmit}
						initialValues={{ amount, description: '' }}
					>
						<Form.Item
							name="type"
							id="type"
							label={t('checkingAccount.typeUpdateBalance')}
							labelCol={{ span: 24 }}
							rules={[{ required: true }]}
						>
							<Radio.Group onChange={onChangeType}>
								<Radio.Button value="balance" className="min-w-30">
									<FontAwesomeIcon
										icon={faMoneyBillTransfer}
										color="blue"
										className="mr-2"
									/>
									{t('general.balance')}
								</Radio.Button>
								<Radio.Button value="income">
									<FontAwesomeIcon
										icon={faArrowTrendUp}
										color="green"
										className="mr-2"
									/>
									{t('general.income')}
								</Radio.Button>
								<Radio.Button value="expense">
									<FontAwesomeIcon
										icon={faArrowTrendDown}
										color="red"
										className="mr-2"
									/>
									{t('general.expense')}
								</Radio.Button>
							</Radio.Group>
						</Form.Item>
						<Form.Item
							label={t('general.amount')}
							labelCol={{ span: 24 }}
							rules={[
								{
									type: 'number',
									required: true,
									validateTrigger: 'onChange',
									validator: (_, value) => {
										if (value < 1 && form.getFieldValue('type') !== 'balance') {
											return Promise.reject(new Error(t('errors.errorZero')))
										}
										return Promise.resolve()
									}
								}
							]}
							name="amount"
							id="amount"
						>
							<CustomInputNumber />
						</Form.Item>
						<Form.Item
							label={`${t('general.description')} (${t('general.optional')})`}
							labelCol={{ span: 24 }}
							rules={[{ required: false }]}
							name="description"
							id="description"
						>
							<Input.TextArea rows={3} />
						</Form.Item>
						<Form.Item>
							<Popconfirm
								title={confirmText()}
								cancelText={t('general.cancel')}
								okText={t('general.changeConfirm')}
								description={t('general.changeConfirmSubtitle')}
								cancelButtonProps={{ className: 'font-bold p-4' }}
								okButtonProps={{ className: 'bg-yellow-600 font-bold p-4' }}
								onCancel={handleCloseIsOpenConfirm}
								onConfirm={() => {
									form.submit()
								}}
								open={isOpenConfirm && open}
								destroyTooltipOnHide
							>
								<CustomButton
									type="primary"
									block
									htmlType="button"
									onClick={handleButtonSubmit}
									loading={loading}
								>
									{t('general.save')}
								</CustomButton>
							</Popconfirm>
						</Form.Item>
					</Form>
				</>
			)}
		</Modal>
	)
}

export default UpdateAmountCheckingAccount
