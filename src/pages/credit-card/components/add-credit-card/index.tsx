import { ColorPicker, Form } from 'antd'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import CustomButton from '../../../../components/button'
import CustomDatePicker from '../../../../components/datepicker'
import CustomInput from '../../../../components/input'
import CustomInputNumber from '../../../../components/input-number'
import { AddCreditCardForm, AddCreditCardProps } from './types'
import useCreditCardClient from '../../../../hook/useCreditCardClient'
import { useAlertContext } from '../../../../contexts/alert/AlertContext'
import { CreateCreditCardDto } from '../../../../models/credit-card.dto'

const FormAddCreditCard: React.FC<AddCreditCardProps> = ({
	handleAddCreditCard: handleAddBuy
}) => {
	const { t } = useTranslation()
	const { create } = useCreditCardClient()
	const [loading, setLoading] = useState(false)
	const { showError, showSuccess } = useAlertContext()

	const onSubmit = async (values: AddCreditCardForm) => {
		try {
			setLoading(true)
			const createDto: CreateCreditCardDto = {
				name: values.name,
				color: values.color?.toHex(),
				creditLimit: values.limit,
				dueDate: values.dueDate
			}

			await create(createDto)
			showSuccess(t('creditCard.buyCreated'))
			handleAddBuy()
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
				label={t('creditCard.creditLimit')}
				labelCol={{ span: 24 }}
				id="creditLimit"
				name="creditLimit"
				rules={[{ required: true }]}
			>
				<CustomInputNumber />
			</Form.Item>
			<Form.Item
				label={t('creditCard.dueDate')}
				labelCol={{ span: 24 }}
				id="dueDate"
				name="dueDate"
				required
			>
				<CustomDatePicker className="w-full" />
			</Form.Item>
			<Form.Item
				label={t('general.color')}
				labelCol={{ span: 24 }}
				id="color"
				name="color"
				required
			>
				<ColorPicker
					format="hex"
					defaultFormat="hex"
					size="large"
					mode={'single'}
				/>
			</Form.Item>
			<Form.Item>
				<CustomButton block type="primary" htmlType="submit" loading={loading}>
					{t('general.save')}
				</CustomButton>
			</Form.Item>
		</Form>
	)
}

export default FormAddCreditCard
