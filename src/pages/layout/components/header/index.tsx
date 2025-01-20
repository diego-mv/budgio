import { faBars, faLanguage } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Dropdown, MenuProps } from 'antd'
import { Header } from 'antd/es/layout/layout'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../../../stores/auth'

const HeaderApp: React.FC<{
	toggleSidebar: () => void
	sidebarCollapsed: boolean
}> = ({ toggleSidebar, sidebarCollapsed }) => {
	const { isAuthenticated } = useAuthStore()
	const { t, i18n } = useTranslation()
	const navigate = useNavigate()

	const changeLanguage = (language: string) => {
		i18n.changeLanguage(language)
	}

	const languageItems: MenuProps['items'] = [
		{
			label: t('general.spanish'),
			key: 'es'
		},
		{
			label: t('general.english'),
			key: 'en'
		}
	]

	const handleMenuClick = (e: any) => {
		const language = e.key
		changeLanguage(language)
	}

	const handleLogin = () => {
		navigate('/auth/login')
	}

	return (
		<Header
			className={`bg-white shadow-md flex items-center p-4 transition-all duration-300 ${isAuthenticated ? 'justify-between' : 'justify-end'} ${sidebarCollapsed ? 'ml-0' : 'ml-52'}`}
		>
			{isAuthenticated && (
				<Button
					className="border-[0.5px] border-opacity-30"
					icon={<FontAwesomeIcon icon={faBars} />}
					onClick={toggleSidebar}
				/>
			)}
			<div className="flex items-center">
				<Dropdown menu={{ items: languageItems, onClick: handleMenuClick }}>
					<Button
						className="border-0"
						icon={<FontAwesomeIcon icon={faLanguage} />}
					></Button>
				</Dropdown>
				{!isAuthenticated && (
					<Button
						type="link"
						className="ml-4 font-semibold"
						onClick={() => {
							handleLogin()
						}}
					>
						{t('general.login')}
					</Button>
				)}
			</div>
		</Header>
	)
}

export default HeaderApp
