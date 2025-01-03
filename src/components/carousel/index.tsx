import React, { useEffect, useState } from 'react'
import './index.css'
import { CarouselProps } from './types'

const Carousel: React.FC<CarouselProps> = ({
	children,
	loop = true,
	visibleSlides,
	onActiveChange,
	loading
}) => {
	const [currentIndex, setCurrentIndex] = useState(0)
	const totalSlides = React.Children.count(children)

	useEffect(() => {
		if (onActiveChange) {
			onActiveChange(currentIndex)
		}
	}, [currentIndex, onActiveChange])

	const goToNext = () => {
		setCurrentIndex((prev) =>
			loop ? (prev + 1) % totalSlides : Math.min(prev + 1, totalSlides - 1)
		)
	}

	const goToPrev = () => {
		setCurrentIndex((prev) =>
			loop ? (prev - 1 + totalSlides) % totalSlides : Math.max(prev - 1, 0)
		)
	}

	const getClassName = (index: number) => {
		const half = Math.floor(visibleSlides / 2)

		let className = 'slide'
		if (index === currentIndex) {
			className += ' active'
		} else if (index === (currentIndex - 1 + totalSlides) % totalSlides) {
			className += ' prev'
		} else if (index === (currentIndex + 1) % totalSlides) {
			className += ' next'
		}

		if (visibleSlides > 3) {
			if (index === (currentIndex - half - 1 + totalSlides) % totalSlides)
				className += ' prev-2'
			if (index === (currentIndex + half + 1) % totalSlides)
				className += ' next-2'
		}

		return className
	}

	const handleClick = (index: number) => {
		if (loading) return
		setCurrentIndex(index)
	}

	return (
		<div className="carousel-container">
			<button
				disabled={loading}
				className="carousel-button prev"
				onClick={goToPrev}
			>
				&#8249;
			</button>
			<div className="carousel-track">
				{React.Children.map(children, (child, index) => (
					<div
						className={getClassName(index)}
						onClick={() => handleClick(index)}
					>
						{child}
					</div>
				))}
			</div>
			<button
				disabled={loading}
				className="carousel-button next"
				onClick={goToNext}
			>
				&#8250;
			</button>
		</div>
	)
}

export default Carousel
