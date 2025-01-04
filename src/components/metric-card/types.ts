import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { ReactNode } from 'react'

export interface MetricCardProps {
	title: string
	value: number | string
	icon?: IconProp
	money?: boolean
	colors?: boolean
	loading?: boolean
}
