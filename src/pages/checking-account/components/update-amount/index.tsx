import { Form, Input, Modal } from 'antd'
import { useTranslation } from 'react-i18next'
import CustomButton from '../../../../components/button'
import CustomInput from '../../../../components/input'
import { useAlertContext } from '../../../../contexts/alert/AlertContext'
import useCheckingAccountClient from '../../../../hook/useCheckingAccount'
import { UpdateAmountProps, UpdateBalanceForm } from './types'
import { useEffect } from 'react'

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

	useEffect(() => {
		if (open) {
			form.setFieldsValue({ amount, description: '' })
		}
	}, [checkingAccountId, amount, open, form])

	const onSubmit = async (values: UpdateBalanceForm) => {
		try {
			const amount = Number(values.amount)
			if (isNaN(amount) || !Number.isInteger(amount)) {
				showError(t('errors.errorInteger'))
				return
			}

			await updateBalance(checkingAccountId, amount, values.description)
			onUpdateAmount(amount)
			showSuccess(t('checkingAccount.updatedBalance'))
		} catch (error) {
			showError('errors.onUpdate')
		}
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
							label={t('general.balance')}
							labelCol={{ span: 24 }}
							rules={[{ required: true }]}
							name="amount"
							id="amount"
						>
							<CustomInput />
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
							<CustomButton type="primary" block htmlType="submit">
								{t('general.save')}
							</CustomButton>
						</Form.Item>
					</Form>
				</>
			)}
		</Modal>
	)
}

export default UpdateAmountCheckingAccount
