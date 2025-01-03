import { Button } from 'antd'
import { CONSTANTS } from '../../../../constants'
import GithubLogo from '../../../../assets/logos/github_white.svg'
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
				type="text"
				className="mr-2 shadow-lg border-gray-200 p-7 font-semibold"
				onClick={loginWithGithub}
				icon={<img width={20} src={GithubLogo} />}
			>
				GitHub
			</Button>
			<Button
				type="text"
				className="shadow-lg border-gray-200 p-7 font-semibold"
				onClick={loginWithGoogle}
				icon={<img width={20} src={GoogleLogo} />}
			>
				Google
			</Button>
		</div>
	)
}

export default SocialNetworkLogin
