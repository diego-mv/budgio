import { Layout as LayoutAnt, theme } from 'antd'
import { Content, Footer } from 'antd/es/layout/layout'
import { useTranslation } from 'react-i18next'
import Header from '../../components/header'
import Sidebar from '../../components/sidebar'
import Navigation from '../../routes'
import { useAuthStore } from '../../stores/auth'
import './index.css'

const Layout = () => {
	const { isAuthenticated } = useAuthStore()
	const { t } = useTranslation()

	const {
		token: { colorBgContainer, borderRadiusLG }
	} = theme.useToken()

	return (
		<LayoutAnt style={{ minHeight: '100vh', minWidth: '430px' }}>
			{/* {isAuthenticated && <Sidebar />} */}
			<LayoutAnt>
				<Header />

				<Content style={{ margin: '24px 16px 0' }}>
					<div
						style={{
							padding: 24,
							minHeight: 360,
							background: colorBgContainer,
							borderRadius: borderRadiusLG
						}}
					>
						<Navigation />
					</div>
				</Content>
				<Footer className="align-middle text-center text-gray-500">
					<span className="font-bold">Budgio</span>{' '}
					<span className="font-semibold">
						©{new Date().getFullYear()} {t('footer.footerText')}
					</span>
				</Footer>
			</LayoutAnt>
		</LayoutAnt>
	)
}

export default Layout
