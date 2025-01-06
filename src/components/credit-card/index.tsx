import React from 'react'
import { CreditCardProps } from './types'
import './index.css'
import Chip from '../../assets/images/credit-card-chip.svg'

const CreditCard: React.FC<CreditCardProps> = ({ name, bank, color }) => {
	const hexColor = `#${color}`
	const hexToRgba = (hex: string, alpha: number) => {
		const r = parseInt(hex.slice(1, 3), 16)
		const g = parseInt(hex.slice(3, 5), 16)
		const b = parseInt(hex.slice(5, 7), 16)
		return `rgba(${r}, ${g}, ${b}, ${alpha})`
	}

	const getRandPattern = (): React.CSSProperties => {
		const styles = [
			{
				background: `repeating-linear-gradient( 130deg, ${hexColor}, ${hexColor} 10px, ${hexToRgba(hexColor, 0.7)} 5px, ${hexToRgba(hexColor, 0.8)} 25px )`
			},
			{
				backgroundImage: `linear-gradient(135deg, ${hexColor} 25%, transparent 25%), linear-gradient(225deg, ${hexToRgba(hexColor, 0.8)} 25%, transparent 25%), linear-gradient(45deg, ${hexToRgba(hexColor, 0.8)} 25%, transparent 25%), linear-gradient(315deg, ${hexToRgba(hexColor, 0.8)} 25%, ${hexToRgba(hexColor, 0.7)} 25%)`,
				backgroundPosition: '10px 0, 10px 0, 0 0, 0 0',
				backgroundSize: '30px 30px',
				backgroundRepeat: 'repeat'
			},
			{
				backgroundImage: `linear-gradient(${hexColor} 3px, transparent 3px), linear-gradient(to right, ${hexColor} 3px, ${hexToRgba(hexColor, 0.8)} 3px)`,
				backgroundSize: '20px 20px'
			}
		]

		return styles[Math.floor(Math.random() * styles.length)]
	}

	return (
		<div
			className="credit_card_container select-none pointer-events-none"
			style={getRandPattern()}
		>
			<h1 className="bank_name">{bank}</h1>
			<img className="chip_illust" src={Chip} alt="Chip" />
			<p className="card_number">
				{[...Array(16)].map((_, index) => (
					<span
						key={index}
						className={`blurred_block ${(index + 1) % 4 === 0 ? 'mr-3' : ''}`}
					></span>
				))}
			</p>
			<p className="username">{name}</p>
			<span className="type_card">Type</span>
		</div>
	)
}

export default CreditCard
