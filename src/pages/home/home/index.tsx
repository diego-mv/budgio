import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Card, Col, Row } from 'antd'
import Meta from 'antd/es/card/Meta'
import { useNavigate } from 'react-router-dom'
import ChartIllust from '../../../assets/images/chart-illust.png'
import DashboardIllust from '../../../assets/images/dashboard-illust.webp'
import SecurityIllust from '../../../assets/images/security-illust.jpg'
import { useAuthStore } from '../../../stores/auth'
import Waves from '../../../assets/images/wave.png'
import './index.css'
const Home = () => {
	const { isAuthenticated } = useAuthStore()
	const navigate = useNavigate()

	const handleLogin = () => {
		navigate('/auth/login')
	}

	return (
		<Row gutter={[16, 16]} className="px-8 m-auto lg:w-4/5 xl:w-3/5">
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
							<h1 className="masked-text text-3xl mt-14">
								Gestiona tus gastos, optimiza tu dinero, vive tranquilo.
							</h1>
							<p className="font-semibold mt-8">
								Organiza, supervisa y optimiza tus finanzas de forma sencilla.
								Ingresa tus gastos, analiza el resumen de tus tarjetas de
								crédito y débito, y mantén un control completo de tu situación
								financiera, todo en un solo lugar.
							</p>

							{!isAuthenticated && (
								<Button
									type="primary"
									className="mt-8 rounded-3xl py-5 px-8 w-full md:w-auto lg:w-auto xl:w-auto font-bold text-lg"
									onClick={handleLogin}
								>
									¡Vamos! <FontAwesomeIcon icon={faArrowRight} />
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
						title="Gestiona tus Gastos de Forma Fácil"
						description="Nuestra app te permite registrar rápidamente tus gastos de tarjetas de crédito y débito, con un diseño intuitivo para que puedas visualizar tu saldo y administrar tus finanzas sin complicaciones."
					/>
				</Card>
			</Col>
			<Col xs={24} md={12} lg={8} xl={8} xxl={8}>
				<Card
					className="shadow-md min-h-[440px]"
					cover={<img className="" alt="example" src={DashboardIllust} />}
				>
					<Meta
						title="Todo en un solo lugar"
						description="Con nuestro dashboard interactivo, podrás visualizar en tiempo real tus gastos, balances y ahorros, lo que te ayudará a tomar decisiones informadas para optimizar tu economía."
					/>
				</Card>
			</Col>
			<Col xs={24} md={12} lg={8} xl={8} xxl={8}>
				<Card
					className="shadow-md min-h-[440px]"
					cover={<img className="" alt="example" src={SecurityIllust} />}
				>
					<Meta
						title="Nos tomamos muy en serio la seguridad de tus datos"
						description="Nunca te pediremos datos de tus tarjetas y solo manejamos información básica, garantizando tu privacidad en todo momento"
					/>
				</Card>
			</Col>
		</Row>
	)
}

export default Home
