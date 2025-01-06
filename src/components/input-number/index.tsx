import { InputNumber, InputNumberProps } from 'antd'

const CustomInputNumber = (props: InputNumberProps) => (
	<InputNumber
		{...props}
		className="p-4 w-full text-[#444950] font-semibold border border-gray-300 rounded-md bg-white hover:bg-white focus::bg-white active:bg-white focus-within:bg-white"
	/>
)

export default CustomInputNumber
