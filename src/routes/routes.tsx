import Pages from '../pages'
import { RouteList, TypeRoute } from './types'

const ROUTES: RouteList[] = [
	{
		Component: <Pages.Auth.Login />,
		name: 'login',
		path: '/auth/login',
		type: 'public'
	},
	{
		Component: <Pages.Auth.Callback />,
		name: 'callback',
		path: '/auth/callback',
		type: 'public'
	},
	{
		Component: <Pages.Home.Home />,
		name: 'home',
		path: '/',
		type: 'public'
	},
	{
		Component: <Pages.CreditCard.MyCreditCards />,
		name: 'credit-cards',
		path: '/credit-cards',
		type: 'private'
	},
	{
		Component: <Pages.CreditCard.CreateCreditCard />,
		name: 'create-credit-cards',
		path: '/credit-cards/create',
		type: 'private'
	},
	{
		Component: <Pages.CheckingAccount.MyCheckingAccounts />,
		name: 'checking-accounts',
		path: '/checking-accounts',
		type: 'private'
	},
	{
		Component: <Pages.Expense.MyExpenses />,
		name: 'expenses',
		path: '/expenses',
		type: 'private'
	}
]

const filterRoutesByType = (
	routes: RouteList[],
	type: keyof typeof TypeRoute
) =>
	routes.filter((route) => {
		if (Array.isArray(route.type)) {
			return route.type.includes(type)
		} else {
			return route.type === type
		}
	})

export const privateRoutes = filterRoutesByType(ROUTES, TypeRoute.private)

export const publicRoutes = filterRoutesByType(ROUTES, TypeRoute.public)
