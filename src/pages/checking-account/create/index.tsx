import { ColorPicker, Form } from 'antd'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import CustomButton from '../../../components/button'
import CustomInput from '../../../components/input'
import { useAlertContext } from '../../../contexts/alert/AlertContext'
import useCheckingAccountClient from '../../../hook/useCheckingAccount'
import { CreateCheckingAccountDto } from '../../../models/checking-account.dto'
import { CreateCheckingAccountProps } from './types'

const CreateCheckingAccount: React.FC<CreateCheckingAccountProps> = ({
	onCreate
}) => {
	const [loading, setLoading] = useState(false)

	const { t } = useTranslation()
	const { showError, showSuccess } = useAlertContext()
	const { create } = useCheckingAccountClient()
	const [form] = Form.useForm()

	const onSubmit = async (values: any) => {
		try {
			if (isNaN(values.balance) || !Number.isInteger(Number(values.balance))) {
				showError(t('errors.errorInteger'))
				return
			}

			setLoading(true)
			const createDto: CreateCheckingAccountDto = {
				name: values.name,
				balance: Number(values.balance),
				color: values.color.toHex()
			}

			const checkingAccount = await create(createDto)
			onCreate && onCreate(checkingAccount)
			form.resetFields()
			showSuccess(t('checkingAccount.createSuccess'))
		} catch (error) {
			showError(error as string)
		} finally {
			setLoading(false)
		}
	}

	return (
		<Form className="mt-4" onFinish={onSubmit} form={form}>
			<Form.Item
				label={t('general.name')}
				labelCol={{ span: 24 }}
				name="name"
				id="name"
				rules={[{ required: true }]}
			>
				<CustomInput disabled={loading} />
			</Form.Item>
			<Form.Item
				label={t('general.balance')}
				labelCol={{ span: 24 }}
				name="balance"
				id="balance"
				rules={[{ required: true }]}
			>
				<CustomInput disabled={loading} />
			</Form.Item>
			<Form.Item
				label={t('general.color')}
				labelCol={{ span: 24 }}
				name="color"
				id="color"
				rules={[{ required: true }]}
			>
				<ColorPicker format="hex" disabled={loading} />
			</Form.Item>
			<Form.Item>
				<CustomButton block type="primary" htmlType="submit" loading={loading}>
					{t('general.save')}
				</CustomButton>
			</Form.Item>
		</Form>
	)
}

export default CreateCheckingAccount
