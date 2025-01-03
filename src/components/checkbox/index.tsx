import { Checkbox, CheckboxProps } from 'antd'
import Styles from './index.module.css'

const CustomCheckbox = (props: CheckboxProps) => {
	return (
		<Checkbox className={Styles.custom_checkbox}>{props.children}</Checkbox>
	)
}

export default CustomCheckbox
