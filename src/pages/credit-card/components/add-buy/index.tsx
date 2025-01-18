import { Form } from 'antd'
import React, { useState } from 'react'
import CustomDatePicker from '../../../../components/datepicker'
import { useAlertContext } from '../../../../contexts/alert/AlertContext'
import useCreditCardClient from '../../../../hook/useCreditCardClient'
import useExpenseCreditCardClient from '../../../../hook/useExpenseCreditCardClient'
import { CreateExpenseCreditCardDto } from '../../../../models/expense-credit-card.dto'
import { AddBuyForm, AddBuyProps } from './types'
import { useTranslation } from 'react-i18next'
import CustomInput from '../../../../components/input'
import CustomInputNumber from '../../../../components/input-number'
import CustomButton from '../../../../components/button'

const AddBuyCreditCard: React.FC<AddBuyProps> = ({
	creditCardId,
	handleAddBuy
}) => {
	const {} = useCreditCardClient()
	const [loading, setLoading] = useState(false)
	const { create } = useExpenseCreditCardClient()
	const { showError, showSuccess } = useAlertContext()
	const { t } = useTranslation()

	const onSubmit = async (values: AddBuyForm) => {
		try {
			setLoading(true)
			const createDto: CreateExpenseCreditCardDto = {
				creditCardId,
				name: values.name,
				issueDate: values.issueDate,
				totalInstallments: values.totalInstallments,
				installmentAmount: values.installmentAmount,
				totalCost: values.totalCost
			}

			const expensse = await create(createDto)
			showSuccess(t('creditCard.buyCreated'))
			handleAddBuy(expensse)
		} catch (error) {
			showError(t('errors.onCreate'))
		} finally {
			setLoading(false)
		}
	}

	return (
		<Form onFinish={onSubmit} disabled={loading}>
			<Form.Item
				label={t('general.name')}
				labelCol={{ span: 24 }}
				id="name"
				name="name"
				required
			>
				<CustomInput required />
			</Form.Item>
			<Form.Item
				label={t('creditCard.issueDate')}
				labelCol={{ span: 24 }}
				id="issueDate"
				name="issueDate"
				rules={[{ required: true }]}
			>
				<CustomDatePicker className="w-full" />
			</Form.Item>
			<Form.Item
				label={t('creditCard.totalInstallments')}
				labelCol={{ span: 24 }}
				id="totalInstallments"
				name="totalInstallments"
				required
			>
				<CustomInputNumber />
			</Form.Item>
			<Form.Item
				label={t('creditCard.installmentAmount')}
				labelCol={{ span: 24 }}
				id="installmentAmount"
				name="installmentAmount"
				required
			>
				<CustomInputNumber />
			</Form.Item>
			<Form.Item
				label={t('creditCard.totalCost')}
				labelCol={{ span: 24 }}
				id="totalCost"
				name="totalCost"
				required
			>
				<CustomInputNumber />
			</Form.Item>

			<Form.Item>
				<CustomButton block type="primary" htmlType="submit" loading={loading}>
					{t('general.save')}
				</CustomButton>
			</Form.Item>
		</Form>
	)
}

export default AddBuyCreditCard
