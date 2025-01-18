import { Route, Routes } from 'react-router-dom'
import { useAuthStore } from '../stores/auth'
import { privateRoutes, publicRoutes } from './routes'

const Navigation = () => {
	const { isAuthenticated } = useAuthStore()

	return (
		<Routes>
			{publicRoutes.map((route) => (
				<Route key={route.name} path={route.path} element={route.Component} />
			))}

			{isAuthenticated &&
				privateRoutes.map((route) => (
					<Route key={route.name} path={route.path} element={route.Component} />
				))}
			<Route path="*" element={<h1>404 error</h1>} />
		</Routes>
	)
}

export default Navigation
