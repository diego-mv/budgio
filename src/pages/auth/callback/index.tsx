import { jwtDecode } from 'jwt-decode'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Cookies from 'universal-cookie'
import { UserDto } from '../../../models/user.dto'
import { useAuthStore } from '../../../stores/auth'

const Callback = () => {
	const { login } = useAuthStore()
	const navigate = useNavigate()
	const cookies = new Cookies()

	useEffect(() => {
		const handleCallback = async () => {
			const urlParams = new URLSearchParams(window.location.search)
			const accessToken = urlParams.get('access_token')
			const refreshToken = urlParams.get('refresh_token')

			if (accessToken && refreshToken) {
				try {
					const decodedToken: any = jwtDecode(accessToken)
					const user = decodedToken.user as UserDto

					if (user) {
						login(user, accessToken, refreshToken)
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
	}, [login, navigate])

	return <div>Loading...</div>
}

export default Callback
