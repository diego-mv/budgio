import React, { useState } from 'react'
import './index.component.css'
import { CarouselProps } from './types'

const Carousel: React.FC<CarouselProps> = ({ children, loop = false }) => {
	const [currentIndex, setCurrentIndex] = useState(0)
	const totalSlides = children.length

	const getVisibleSlides = () => {
		if (!loop) {
			return children
		}

		return [
			children[(currentIndex - 1 + totalSlides) % totalSlides],
			children[currentIndex],
			children[(currentIndex + 1) % totalSlides]
		]
	}

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

	return (
		<div className="carousel-container">
			<button
				className="carousel-button prev"
				onClick={goToPrev}
				disabled={!loop && currentIndex === 0}
			>
				&#8249;
			</button>
			<div className="carousel-track">
				{getVisibleSlides().map((child, index) => (
					<div
						key={index}
						className={`carousel-slide ${index === 1 ? 'active' : ''}`}
					>
						{child}
					</div>
				))}
			</div>
			<button
				className="carousel-button next"
				onClick={goToNext}
				disabled={!loop && currentIndex === totalSlides - 1}
			>
				&#8250;
			</button>
		</div>
	)
}

export default Carousel
