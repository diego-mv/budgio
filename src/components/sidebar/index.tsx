import {
	faCreditCard,
	faHome,
	faReceipt,
	faWallet
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Menu } from 'antd'
import Sider from 'antd/es/layout/Sider'
import { MenuItemType } from 'antd/es/menu/interface'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import Styles from './index.module.css'
import Logo from '../../assets/logos/logo.png'
const Sidebar = () => {
	const [collapsed, setCollapsed] = useState(false)
	const navigate = useNavigate()
	const { t } = useTranslation()

	const items: MenuItemType[] = [
		{
			key: 'home',
			label: t('general.home'),
			onClick: () => navigate('/'),
			icon: <FontAwesomeIcon icon={faHome} />
		},
		{
			key: 'credit-cards',
			label: t('general.creditCards'),
			onClick: () => navigate('/credit-cards'),
			icon: <FontAwesomeIcon icon={faCreditCard} />
		},
		{
			key: 'checking-accounts',
			label: t('general.checkingAccounts'),
			icon: <FontAwesomeIcon icon={faWallet} />,
			onClick: () => navigate('/checking-accounts')
		},
		{
			key: 'expenses',
			label: t('general.expenses'),
			icon: <FontAwesomeIcon icon={faReceipt} />,
			onClick: () => navigate('/expenses')
		}
	]
	return (
		<Sider
			collapsible
			collapsed={collapsed}
			onCollapse={(value) => setCollapsed(value)}
			className={Styles.sider}
			style={{ background: '#17252a' }}
		>
			<div className={Styles.sider_header}>
				<img
					className={
						collapsed
							? Styles.sider_header__img_collapsed
							: Styles.sider_header__img
					}
					src={Logo}
					alt="Logo"
				/>
			</div>
			<Menu
				theme="dark"
				mode="inline"
				items={items}
				style={{ background: '#17252a' }}
			/>
		</Sider>
	)
}

export default Sidebar
