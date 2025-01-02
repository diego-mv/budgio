import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { useAuthStore } from '../stores/auth'
import { Utils } from '../utils'
import { privateRoutes, publicRoutes } from './routes'

const Navigation = () => {
	const { isAuthenticated } = useAuthStore()
	const location = useLocation()

	const handleSaveRedirect = () => {
		const url = location.pathname
		if (!isAuthenticated && !url.includes('auth') && url) {
			Utils.LocalStorage.setUrlRedirect(location.pathname)
			return <Navigate to="/auth/login" />
		}
	}

	return (
		<Routes>
			{publicRoutes.map((route) => (
				<Route key={route.name} path={route.path} element={route.Component} />
			))}

			{isAuthenticated &&
				privateRoutes.map((route) => (
					<Route key={route.name} path={route.path} element={route.Component} />
				))}
			<Route path="*" element={handleSaveRedirect()} />
		</Routes>
	)
}

export default Navigation
