import React from 'react'
import { MetricCardProps } from './types'
import { Card, Col, Row, Skeleton } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useTranslation } from 'react-i18next'

const MetricCard: React.FC<MetricCardProps> = ({
	title,
	subtitle,
	value,
	icon,
	loading,
	style,
	money = false,
	colors = false
}) => {
	const { i18n } = useTranslation()
	const classColor =
		Number.parseFloat(value.toString()) && Number(value) <= 0
			? 'text-red-700'
			: 'text-green-700'

	const formatMoney = () => {
		try {
			return new Intl.NumberFormat(
				i18n.language === 'en' ? 'en-US' : 'es-ES'
			).format(Number(value))
		} catch (_) {
			return value
		}
	}

	return (
		<Card className="shadow-xl border-1 border-gray-200" style={style}>
			<Row>
				{icon && (
					<Col span={24} className="text-lg font-semibold mb-3">
						<span className=" bg-gray-200 p-2 text-center align-middle rounded-full">
							<FontAwesomeIcon icon={icon} />
						</span>
					</Col>
				)}
				<Col span={24} className="text-sm font-semibold text-gray-600">
					{title}
				</Col>
				<Col span={24} className="text-xs font-semibold text-gray-600 my-1">
					{subtitle}
				</Col>
				<Col
					span={24}
					className={`text-3xl font-bold ${colors ? classColor : ''}`}
				>
					{loading ? (
						<Skeleton.Input
							active
							size={'large'}
							className="block max-w-2 !important"
						/>
					) : (
						<>
							{money && '$'}
							{money ? formatMoney() : value}
						</>
					)}
				</Col>
			</Row>
		</Card>
	)
}

export default MetricCard
