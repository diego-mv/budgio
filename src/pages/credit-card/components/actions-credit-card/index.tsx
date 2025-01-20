import {
	faFileImport,
	faFileInvoice,
	faPenToSquare,
	faPlus,
	faTrash
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Col, Popconfirm, Row, Upload } from 'antd'
import { UploadChangeParam, UploadFile } from 'antd/es/upload'
import { UploadRequestOption } from 'rc-upload/lib/interface'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import CustomButton from '../../../../components/button'
import { useAlertContext } from '../../../../contexts/alert/AlertContext'
import useCreditCardClient from '../../../../hook/useCreditCardClient'
import { ActionsCreditCardProps } from './types'
import './index.css'

const ActionsCreditCard: React.FC<ActionsCreditCardProps> = ({
	creditCardId,
	handleDeleteCreditCard,
	handleOpenCreate,
	handleOpenUpdateCreditCard,
	handleOpenAddBuy
}) => {
	const { importExpenses } = useCreditCardClient()
	const [uploading, setUploading] = useState(false)
	const { t } = useTranslation()
	const { showSuccess, showError } = useAlertContext()

	const handleChange = async (info: UploadChangeParam<UploadFile<any>>) => {
		if (info.file.status === 'uploading') {
			setUploading(true)
		}
		if (info.file.status === 'done') {
			showSuccess(t('creditCard.importBuySuccess'))
			setUploading(false)
		} else if (info.file.status === 'error') {
			showError(t('errors.errorImport'))
			setUploading(false)
		}
	}

	const uploadRequest = async (options: UploadRequestOption<any>) => {
		const { file, onSuccess, onError } = options
		try {
			const formData = new FormData()
			formData.append('file', file)
			await importExpenses(creditCardId, formData)

			onSuccess?.(null, file)
		} catch (error) {
			onError?.(error as Error)
		}
	}

	return (
		<Row gutter={[16, 16]} className="w-full flex justify-between items-center">
			<Col
				xs={24}
				md={12}
				lg={12}
				span={12}
				className="flex sm:justify-end justify-center"
			>
				<CustomButton
					className="rounded-xl font-bold shadow-sm mx-0 sm:w-auto w-full"
					size="large"
					icon={<FontAwesomeIcon icon={faFileInvoice} />}
					onClick={handleOpenAddBuy}
				>
					{t('creditCard.addBuy')}
				</CustomButton>
			</Col>
			<Col
				xs={24}
				md={12}
				lg={12}
				span={12}
				className="flex sm:justify-start justify-center"
			>
				<Upload
					className="upload-expense-card rounded-xl font-bold shadow-sm mx-0 sm:w-auto w-full"
					rootClassName="rounded-xl font-bold shadow-sm mx-0 sm:w-auto w-full"
					accept=".xlsx"
					customRequest={uploadRequest}
					onChange={handleChange}
					showUploadList={false}
					disabled={uploading}
				>
					<CustomButton
						className="w-full"
						size="large"
						icon={<FontAwesomeIcon icon={faFileImport} />}
					>
						{t('creditCard.importBuy')}
					</CustomButton>
				</Upload>
			</Col>
			<Col
				span={24}
				className="
xs:mt-4 sm:mt-2 md:mt-2 flex justify-center
lg:absolute lg:right-10 xl:absolute xl:right-10"
			>
				<CustomButton
					className="rounded-xl font-bold shadow-sm mx-1"
					size="large"
					icon={<FontAwesomeIcon icon={faPenToSquare} />}
					onClick={handleOpenUpdateCreditCard}
				></CustomButton>
				<CustomButton
					type="primary"
					icon={<FontAwesomeIcon icon={faPlus} />}
					className="mx-1 rounded-2xl"
					onClick={handleOpenCreate}
				></CustomButton>
				<Popconfirm
					title={t('creditCard.deleteConfirm')}
					onConfirm={handleDeleteCreditCard}
					okText={t('general.yes')}
					cancelText={t('general.cancel')}
					placement="leftBottom"
					className="font-bold"
					okType="primary"
					cancelButtonProps={{
						className: 'font-bold p-4 shadow-lg'
					}}
					okButtonProps={{
						className: 'font-bold p-4 shadow-lg bg-red-700'
					}}
				>
					<CustomButton
						icon={<FontAwesomeIcon icon={faTrash} />}
						className="mx-1 rounded-2xl bg-red-700 text-white"
					></CustomButton>
				</Popconfirm>
			</Col>
		</Row>
	)
}
export default ActionsCreditCard
