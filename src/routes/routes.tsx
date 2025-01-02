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
