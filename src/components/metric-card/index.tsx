import React from 'react'
import { MetricCardProps } from './types'
import { Card, Col, Row, Skeleton } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const MetricCard: React.FC<MetricCardProps> = ({
	title,
	value,
	icon,
	loading,
	money = false,
	colors = false
}) => {
	const classColor =
		Number.parseFloat(value.toString()) && Number(value) <= 0
			? 'text-red-700'
			: 'text-green-700'

	return (
		<Card className="shadow-xl border-1 border-gray-100">
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
							{value}
						</>
					)}
				</Col>
			</Row>
		</Card>
	)
}

export default MetricCard
