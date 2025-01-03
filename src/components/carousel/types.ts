export interface CarouselProps {
	children: React.ReactNode[]
	loop?: boolean
	visibleSlides: 3 | 5
	onActiveChange: (index: number) => void
	loading?: boolean
}
