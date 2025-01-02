import { useEffect } from 'react'
import { useAuthStore } from '../../../stores/auth'
import { useNavigate } from 'react-router-dom'
import Cookies from 'universal-cookie'
import { UserDto } from '../../../models/user.dto'

const Callback = () => {
	const { login } = useAuthStore()
	const navigate = useNavigate()
	const cookies = new Cookies()

	useEffect(() => {
		const handleCallback = async () => {
			const accessToken = cookies.get('access_token')
			const refreshToken = cookies.get('refresh_token')
			const userStr = cookies.get('user')
			const user = userStr as UserDto
			if (accessToken && refreshToken && user) {
				login(user, accessToken, refreshToken)
				navigate('/')
			} else {
				console.error('Error al obtener los tokens', {
					accessToken,
					refreshToken,
					user
				})
				navigate('/auth/login')
			}
		}

		handleCallback()
	}, [login, navigate])

	return <div>Loading...</div>
}

export default Callback
