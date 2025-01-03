import { Checkbox, Form } from 'antd'
import { useTranslation } from 'react-i18next'
import CustomButton from '../../../components/button'
import CustomDatePicker from '../../../components/datepicker'
import CustomInput from '../../../components/input'
import { useAlertContext } from '../../../contexts/alert/AlertContext'
import useExpenseClient from '../../../hook/useExpenseClient'
import { CreateExpenseDto } from '../../../models/expense.dto'
import { CreateExpenseForm, CreateExpenseProps } from './types'
import { useState } from 'react'

const CreateExpense: React.FC<CreateExpenseProps> = ({ onClose }) => {
	const { t } = useTranslation()
	const { create } = useExpenseClient()
	const { showSuccess, showError } = useAlertContext()
	const [form] = Form.useForm<CreateExpenseForm>()
	const [isInstallmentDisabled, setInstallmentDisabled] = useState(false)

	const onFinish = async (formData: CreateExpenseForm) => {
		try {
			const createExpense: CreateExpenseDto = {
				name: formData.name,
				dueDate: formData.dueDate,
				amount: Number(formData.amount),
				installments: Number(formData.installments),
				installmentAmount: Number(formData.installmentAmount),
				paid: formData.paid
			}

			await create(createExpense)
			showSuccess(t('expenses.expenseCreated'))
			form.resetFields()
			onClose()
		} catch (error) {
			showError(t('errors.onCreate'))
		}
	}

	const handleChangeForm = (_: any, values: CreateExpenseForm) => {
		if (values.installments <= 1) {
			form.setFieldsValue({ installmentAmount: values.amount })
			setInstallmentDisabled(true)
		} else {
			form.setFieldsValue(values)
			setInstallmentDisabled(false)
		}
	}

	return (
		<Form
			form={form}
			name="create-expense-form"
			onFinish={onFinish}
			autoComplete="off"
			layout="vertical"
			onValuesChange={handleChangeForm}
		>
			<Form.Item
				name="name"
				rules={[
					{
						required: true,
						message: t('general.requiredField')
					}
				]}
			>
				<CustomInput placeholder={t('general.name')} />
			</Form.Item>
			<Form.Item
				name="dueDate"
				rules={[
					{
						required: true,
						message: t('general.requiredField')
					}
				]}
			>
				<CustomDatePicker
					className="w-full"
					placeholder={t('expenses.dueDate')}
				/>
			</Form.Item>
			<Form.Item
				name="amount"
				rules={[
					{
						required: true,
						message: t('general.requiredField')
					}
				]}
			>
				<CustomInput type="number" placeholder={t('expenses.amount')} />
			</Form.Item>
			<Form.Item
				name="installments"
				rules={[
					{
						required: true,
						message: t('general.requiredField')
					}
				]}
			>
				<CustomInput type="number" placeholder={t('expenses.installments')} />
			</Form.Item>
			<Form.Item
				fieldId="installmentAmount"
				name="installmentAmount"
				rules={[
					{
						required: true,
						message: t('general.requiredField')
					}
				]}
			>
				<CustomInput
					readOnly={isInstallmentDisabled}
					disabled={isInstallmentDisabled}
					type="number"
					placeholder={t('expenses.installmentAmount')}
				/>
			</Form.Item>
			<Form.Item name="paid" valuePropName="checked" initialValue={false}>
				<Checkbox>{t('expenses.paid')}?</Checkbox>
			</Form.Item>
			<Form.Item>
				<CustomButton type="primary" block htmlType="submit">
					{t('general.save')}
				</CustomButton>
			</Form.Item>
		</Form>
	)
}

export default CreateExpense
