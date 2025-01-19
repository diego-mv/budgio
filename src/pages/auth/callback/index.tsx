import { jwtDecode } from 'jwt-decode'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserDto } from '../../../models/user.dto'
import { useAuthStore } from '../../../stores/auth'

const Callback = () => {
	const { login } = useAuthStore()
	const navigate = useNavigate()

	useEffect(() => {
		const handleCallback = async () => {
			const urlParams = new URLSearchParams(window.location.search)
			const accessToken = urlParams.getAll('access_token')[0]
			const refreshToken = urlParams.getAll('refresh_token')[0]

			if (accessToken && refreshToken) {
				try {
					const decodedToken: UserDto = jwtDecode(accessToken)

					if (decodedToken) {
						login(decodedToken, accessToken, refreshToken)
						navigate('/')
					} else {
						throw new Error(
							'No se pudo obtener el usuario desde el access token'
						)
					}
				} catch (error) {
					console.error(
						'Error al decodificar el access token o obtener el usuario',
						error
					)
					navigate('/auth/login')
				}
			} else {
				console.error('Error al obtener los tokens de la URL', {
					accessToken,
					refreshToken
				})
				navigate('/auth/login')
			}
		}

		handleCallback()
	}, [navigate, login])

	return <div>Loading...</div>
}

export default Callback
