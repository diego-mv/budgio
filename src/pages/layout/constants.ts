import { MenuItemType } from 'antd/es/menu/interface'
import { TFunction } from 'i18next'

export const getSiderItems = (props: {
	t: TFunction
	navigate: (route: string) => void
}): MenuItemType[] => {
	const { t, navigate } = props

	const items: MenuItemType[] = [
		{
			key: 'home',
			label: t('general.home'),
			onClick: () => {
				navigate('/')
			}
		},
		{
			key: 'credit-cards',
			label: t('general.creditCards'),
			onClick: () => {
				navigate('/credit-cards')
			}
		},
		{
			key: 'checking-accounts',
			label: t('general.checkingAccounts'),
			onClick: () => {
				navigate('/checking-accounts')
			}
		},
		{
			key: 'expenses',
			label: t('general.expenses'),
			onClick: () => {
				navigate('/expenses')
			}
		}
	]

	return items
}
