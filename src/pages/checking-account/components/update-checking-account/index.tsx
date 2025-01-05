import { ColorPicker, Form, Modal } from 'antd'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import CustomInput from '../../../../components/input'
import { UpdateCheckingAccountForm, UpdateCheckingAccountProps } from './types'
import CustomButton from '../../../../components/button'
import { UpdateCheckingAccountDto } from '../../../../models/checking-account.dto'
import useCheckingAccountClient from '../../../../hook/useCheckingAccount'
import { useAlertContext } from '../../../../contexts/alert/AlertContext'

const UpdateCheckingAccount: React.FC<UpdateCheckingAccountProps> = ({
	checkingAccount,
	onUpdateCheckingAccount,
	open,
	onClose
}) => {
	const { t } = useTranslation()
	const { update } = useCheckingAccountClient()
	const { showError, showSuccess } = useAlertContext()
	const [form] = Form.useForm<UpdateCheckingAccountForm>()

	useEffect(() => {
		if (checkingAccount && open) {
			form.setFieldsValue({
				name: checkingAccount.name,
				color: checkingAccount.color
			})
		}
	}, [checkingAccount, open])

	const onSubmit = async (values: any) => {
		try {
			const updateDto: UpdateCheckingAccountDto = {
				id: checkingAccount.id,
				name: values.name,
				color: values.color?.toHex ? values.color?.toHex() : values.color
			}

			const updated = await update(updateDto)
			showSuccess(t('checkingAccount.updateSuccess'))
			await onUpdateCheckingAccount(updated)
		} catch (error) {
			console.error(error)
			showError(t('errors.onUpdate'))
		}
	}

	if (!checkingAccount) return null

	return (
		<Modal open={open} footer={null} onCancel={onClose}>
			<h1 className="text-xl font-bold mt-4">
				{t('checkingAccount.updateTitle')}
			</h1>
			<Form
				form={form}
				className="py-4 pt-10"
				onFinish={onSubmit}
				initialValues={{
					name: checkingAccount.name,
					color: checkingAccount.color
				}}
			>
				<Form.Item
					name="name"
					id="name"
					label={t('general.name')}
					labelCol={{ span: 24 }}
				>
					<CustomInput />
				</Form.Item>
				<Form.Item
					name="color"
					id="color"
					label={t('general.color')}
					labelCol={{ span: 24 }}
				>
					<ColorPicker defaultFormat="hex" mode={'single'} />
				</Form.Item>
				<Form.Item>
					<CustomButton type="primary" block htmlType="submit">
						{t('general.save')}
					</CustomButton>
				</Form.Item>
			</Form>
		</Modal>
	)
}

export default UpdateCheckingAccount
