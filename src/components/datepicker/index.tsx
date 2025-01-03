import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { DatePicker } from 'antd'
import { DatePickerProps } from 'antd/es/date-picker'

const CustomDatePicker = (props: DatePickerProps) => {
	return (
		<DatePicker
			format={'DD/MM/YYYY'}
			{...props}
			suffixIcon={
				<FontAwesomeIcon className="text-[#444950]" icon={faCalendarAlt} />
			}
			className={`bg-white p-4 text-[#444950] font-semibold border border-gray-300 rounded-md cursor-pointer ${props.className}`}
		/>
	)
}

export default CustomDatePicker
