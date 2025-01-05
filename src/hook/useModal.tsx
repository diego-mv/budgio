import React from 'react'

const useModal = () => {
	const [isOpen, setIsOpen] = React.useState(false)

	const handleOpen = () => setIsOpen(true)

	const handleClose = () => setIsOpen(false)

	return { handleOpen, handleClose, isOpen }
}

export default useModal
