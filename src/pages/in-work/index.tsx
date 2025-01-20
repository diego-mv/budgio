import { useTranslation } from 'react-i18next'
import InWork from '../../assets/images/in_work.png'

const InWorkPage = () => {
	const { t } = useTranslation()
	return (
		<div className="w-full">
			<h1 className="masked-text text-3xl my-14 m-auto text-center">
				{t('general.inWork')}
			</h1>
			<img src={InWork} width={200} alt="In Work" className="m-auto" />
		</div>
	)
}

export default InWorkPage
