import { Card, Col, Row } from 'antd'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import ManIllustration from '../../../assets/images/illustration.svg'
import { useAuthStore } from '../../../stores/auth'
import { Utils } from '../../../utils'
import FormLogin from '../components/form-login'
import SocialNetworkLogin from '../components/social-network-login'
import { useTranslation } from 'react-i18next'

const Login = () => {
	const { isAuthenticated } = useAuthStore()
	const { t } = useTranslation()
	const navigate = useNavigate()

	useEffect(() => {
		if (isAuthenticated) {
			const redirectUrl = Utils.LocalStorage.getUrlRedirect()
			if (redirectUrl) {
				Utils.LocalStorage.removeUrlRedirect()
				navigate(redirectUrl)
			}
		}
	}, [isAuthenticated, navigate])

	return (
		<div className="h-full w-auto m-auto" style={{ maxWidth: '1700px' }}>
			<Card>
				<Row gutter={[16, 16]}>
					<Col span={10}>
						<img
							className="rounded-3xl m-auto"
							src={ManIllustration}
							style={{ maxWidth: '650px' }}
						/>
					</Col>
					<Col
						span={14}
						className="flex justify-center align-middle items-center"
					>
						<div className="w-full px-32">
							<h1 className="text-2xl font-bold mb-4">{t('login.title')}</h1>
							<p className="text-gray-800 font-semibold mb-4">
								{t('login.message')}
							</p>
							<FormLogin />
							<div className="flex items-center justify-center my-4">
								<div className="flex-1 border-t border-gray-300"></div>
								<span className="mx-4 text-sm font-medium text-gray-500">
									{t('login.canAccesWith')}
								</span>
								<div className="flex-1 border-t border-gray-300"></div>
							</div>

							<SocialNetworkLogin />
						</div>
					</Col>
				</Row>
			</Card>
		</div>
	)
}

export default Login
