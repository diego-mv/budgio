import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Layout, Menu } from 'antd'
import { Content, Footer } from 'antd/es/layout/layout'
import Sider from 'antd/es/layout/Sider'
import { MenuItemType } from 'antd/es/menu/interface'
import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import LogoApp from '../../assets/logos/logo.png'
import Navigation from '../../routes'
import { useAuthStore } from '../../stores/auth'
import HeaderApp from './components/header'
import { getSiderItems } from './constants'

const LayoutApp = () => {
	const { isAuthenticated, logout } = useAuthStore()
	const [collapsed, setCollapsed] = useState(true)
	const { t } = useTranslation()
	const navigate = useNavigate()

	const toggleSidebar = () => {
		setCollapsed(!collapsed)
	}

	const handleLogout = () => {
		setCollapsed(true)
		logout()
		navigate('/')
	}

	const navigateSider = (route: string) => {
		navigate(route)
		setCollapsed(true)
	}

	const siderItems = useMemo(
		(): MenuItemType[] =>
			getSiderItems({
				t,
				navigate: navigateSider
			}),
		[isAuthenticated, t]
	)

	return (
		<Layout
			className="min-h-screen"
			style={{
				height: '100vh',
				minHeight: '100vh'
			}}
		>
			{isAuthenticated && (
				<Sider
					collapsible
					trigger={null}
					collapsed={collapsed}
					theme="dark"
					className={`fixed transition-all duration-300 z-50 ${
						collapsed ? 'hidden' : 'block w-64'
					}`}
					style={{
						height: '100vh',
						minHeight: '100vh'
					}}
				>
					<div className="text-white p-4 m-auto">
						<img src={LogoApp} width={70} className="m-auto" />
					</div>
					<Menu
						theme="dark"
						mode="inline"
						selectable={false}
						items={siderItems}
					/>
					<Menu
						className="absolute bottom-0"
						theme="dark"
						mode="inline"
						items={[
							{
								label: t('general.logout'),
								key: 'logout',
								icon: <FontAwesomeIcon icon={faRightFromBracket} />,
								onClick: handleLogout
							}
						]}
					/>
				</Sider>
			)}
			<Layout>
				<HeaderApp toggleSidebar={toggleSidebar} sidebarCollapsed={collapsed} />
				<Content>
					<div
						className={`min-h-screen p-8 ml-0 ${collapsed ? '' : 'md:ml-52'}`}
					>
						<Navigation />
					</div>
					<Footer className="align-middle text-center text-gray-500 w-full">
						<span className="font-bold">Budgio</span>{' '}
						<span className="font-semibold">
							©{new Date().getFullYear()} {t('footer.footerText')}
						</span>
					</Footer>
				</Content>
			</Layout>
		</Layout>
	)
}

export default LayoutApp
