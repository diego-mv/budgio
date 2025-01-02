import { Button, Form, Input } from 'antd'
import { FormLoginData } from './types'
import { useTranslation } from 'react-i18next'

const FormLogin = () => {
	const { t } = useTranslation()
	const onFinish = (values: FormLoginData) => {
		console.log('Datos del formulario:', values)
	}

	return (
		<Form
			name="login-form"
			onFinish={onFinish}
			initialValues={{ remember: true }}
			autoComplete="off"
			layout="vertical"
		>
			<Form.Item
				name="email"
				rules={[
					{
						required: true,
						message: 'Por favor, ingresa tu correo electrónico.'
					},
					{ type: 'email', message: 'El correo no es válido.' }
				]}
			>
				<Input className="p-4" placeholder="Correo Electrónico" />
			</Form.Item>

			<Form.Item
				label="Contraseña"
				name="password"
				rules={[
					{ required: true, message: 'Por favor, ingresa tu contraseña.' },
					{
						min: 6,
						message: 'La contraseña debe tener al menos 6 caracteres.'
					}
				]}
			>
				<Input.Password className="p-4" placeholder="Contraseña" />
			</Form.Item>

			<Form.Item>
				<Button
					className="p-7 text-lg font-semibold"
					type="primary"
					htmlType="submit"
					block
				>
					{t('login.button')}
				</Button>
			</Form.Item>
		</Form>
	)
}

export default FormLogin
