import React, { useState } from 'react'
import './index.component.css'
import { CarouselProps } from './types'

const Carousel: React.FC<CarouselProps> = ({ children, loop = true }) => {
	const [currentIndex, setCurrentIndex] = useState(0)
	const totalSlides = React.Children.count(children)

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
		if (index === currentIndex) return 'slide active'
		if (index === (currentIndex - 1 + totalSlides) % totalSlides)
			return 'slide prev'
		if (index === (currentIndex + 1) % totalSlides) return 'slide next'
		return 'slide'
	}

	return (
		<div className="carousel-container">
			<button className="carousel-button prev" onClick={goToPrev}>
				&#8249;
			</button>
			<div className="carousel-track">
				{React.Children.map(children, (child, index) => (
					<div className={getClassName(index)}>{child}</div>
				))}
			</div>
			<button className="carousel-button next" onClick={goToNext}>
				&#8250;
			</button>
		</div>
	)
}

export default Carousel
