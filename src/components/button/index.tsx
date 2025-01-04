import { Button, ButtonProps } from 'antd'

const CustomButton = (props: ButtonProps) => {
	return (
		<Button
			{...props}
			className={`p-7 text-lg font-semibold ${props?.className}`}
		>
			{props.children}
		</Button>
	)
}

export default CustomButton
