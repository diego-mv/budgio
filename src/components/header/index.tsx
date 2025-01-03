import {
	faCircleUser,
	faLanguage,
	faRightFromBracket
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Layout, Menu } from 'antd'
import React from 'react'
import { useTranslation } from 'react-i18next'
import Styles from './index.module.css'
import { HeaderProps } from './types'
import { useAuthStore } from '../../stores/auth'
import { useNavigate } from 'react-router-dom'

const Header: React.FC<HeaderProps> = () => {
	const { isAuthenticated, user, logout } = useAuthStore()
	const firstname = user?.name || 'User'
	const { t, i18n } = useTranslation()
	const navigate = useNavigate()

	const changeLanguage = (language: string) => {
		i18n.changeLanguage(language)
	}

	const itemsHeader: any[] = [
		{
			label: t('general.language'),
			icon: <FontAwesomeIcon icon={faLanguage} style={{ color: 'white' }} />,
			key: 'language',
			className: Styles.language_item,
			children: [
				{
					label: t('general.spanish'),
					key: 'es',
					onClick: () => changeLanguage('es')
				},
				{
					label: t('general.english'),
					key: 'en',
					onClick: () => changeLanguage('en')
				}
			]
		}
	]

	const loggedHeaders = () => {
		const headers = itemsHeader
		headers.unshift({
			icon: <FontAwesomeIcon icon={faCircleUser} style={{ color: 'white' }} />,
			key: 'user',
			label: firstname,
			type: 'item',
			disabled: true,
			className: Styles.username_item,
			style: { color: 'white' }
		})
		headers.push({
			label: t('general.logout'),
			key: 'logout',
			icon: <FontAwesomeIcon icon={faRightFromBracket} />,
			onClick: () => logout(),
			style: { color: 'white' }
		})

		return headers
	}

	const unloggedHeaders = () => {
		const headers = itemsHeader
		headers.push({
			label: t('general.login'),
			key: 'login',
			icon: <FontAwesomeIcon icon={faCircleUser} />,
			onClick: () => navigate('/auth/login'),
			style: { color: 'white' }
		})
		return headers
	}

	return (
		<Layout.Header style={{ padding: 0, background: '#010409' }}>
			<Menu
				defaultActiveFirst={false}
				selectable={false}
				mode="horizontal"
				className={Styles.menu_logout}
				items={isAuthenticated ? loggedHeaders() : unloggedHeaders()}
			/>
		</Layout.Header>
	)
}

export default Header
