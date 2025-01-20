import { Button, Card, Col, Row } from 'antd'
import Meta from 'antd/es/card/Meta'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import ChartIllust from '../../../assets/images/chart-illust.png'
import DashboardIllust from '../../../assets/images/dashboard-illust.webp'
import SecurityIllust from '../../../assets/images/security-illust.jpg'
import Waves from '../../../assets/images/wave.png'
import { useAuthStore } from '../../../stores/auth'
import './index.css'
const Home = () => {
	const { isAuthenticated } = useAuthStore()
	const { t } = useTranslation()
	const navigate = useNavigate()

	const handleLogin = () => {
		navigate('/auth/login')
	}

	return (
		<Row gutter={[16, 16]} className="m-auto lg:w-4/5 xl:w-3/5">
			<Col span={24}>
				<Card className="">
					<Row>
						<Col
							xs={24}
							md={24}
							lg={24}
							xl={12}
							xxl={12}
							className="py-4 md:py-12"
						>
							<h1 className="masked-text text-3xl mt-14">{t('home.title')}</h1>
							<p className="font-semibold mt-8">{t('home.subtitle')}</p>

							{!isAuthenticated && (
								<Button
									type="primary"
									className="mt-8 rounded-3xl py-5 px-8 w-full md:w-auto lg:w-auto xl:w-auto font-bold text-lg"
									onClick={handleLogin}
								>
									{t('home.invite')}
								</Button>
							)}
						</Col>
						<Col xs={0} md={0} lg={0} xl={12} xxl={12}>
							<div className="flex justify-end items-end min-h-full">
								<img src={Waves} />
							</div>
						</Col>
					</Row>
				</Card>
			</Col>

			<Col xs={24} md={12} lg={8} xl={8} xxl={8}>
				<Card
					className="shadow-md min-h-[440px]"
					cover={<img className="" alt="example" src={ChartIllust} />}
				>
					<Meta
						title={t('home.card1Title')}
						description={t('home.card1Description')}
					/>
				</Card>
			</Col>
			<Col xs={24} md={12} lg={8} xl={8} xxl={8}>
				<Card
					className="shadow-md min-h-[440px]"
					cover={<img className="" alt="example" src={DashboardIllust} />}
				>
					<Meta
						title={t('home.card2Title')}
						description={t('home.card2Description')}
					/>
				</Card>
			</Col>
			<Col xs={24} md={12} lg={8} xl={8} xxl={8}>
				<Card
					className="shadow-md min-h-[440px]"
					cover={<img className="" alt="example" src={SecurityIllust} />}
				>
					<Meta
						title={t('home.card3Title')}
						description={t('home.card3Description')}
					/>
				</Card>
			</Col>
		</Row>
	)
}

export default Home
