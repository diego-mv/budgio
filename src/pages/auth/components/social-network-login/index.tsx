import { Button } from 'antd'
import { CONSTANTS } from '../../../../constants'
import GithubLogo from '../../../../assets/logos/github.svg'
import GoogleLogo from '../../../../assets/logos/google.svg'

const SocialNetworkLogin = () => {
	const loginWithGithub = () => {
		window.location.href = `${CONSTANTS.API_URL}/auth/github`
	}

	const loginWithGoogle = () => {
		window.location.href = `${CONSTANTS.API_URL}/auth/google`
	}

	return (
		<div className="flex justify-center">
			<Button
				className="mr-2 shadow-lg border-gray-200 p-7"
				onClick={loginWithGithub}
				icon={<img width={20} src={GithubLogo} />}
			>
				GitHub
			</Button>
			<Button
				className="shadow-lg border-gray-200 p-7"
				onClick={loginWithGoogle}
				icon={<img width={20} src={GoogleLogo} />}
			>
				Google
			</Button>
		</div>
	)
}

export default SocialNetworkLogin
