import { Input, InputProps } from 'antd'

const CustomInput = (props: InputProps) => (
	<Input
		{...props}
		className="p-4 text-[#444950] font-semibold border border-gray-300 rounded-md bg-white hover:bg-white focus::bg-white active:bg-white focus-within:bg-white"
	/>
)

export default CustomInput
