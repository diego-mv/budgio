import { ConfigProvider } from 'antd'
import { BrowserRouter } from 'react-router-dom'
import Layout from './pages/layout'
import { AlertProvider } from './contexts/alert/AlertContext'

function App() {
	return (
		<ConfigProvider
			theme={{
				token: {
					// //text
					// colorText: '#ffffff',
					// colorTextBase: '#ffffff',
					// colorBgTextHover: '#ffffff',
					// colorBgTextActive: '#ffffff',
					// colorTextDisabled: '#ffffff',
					// colorTextHeading: '#ffffff',
					// colorTextLabel: '#ffffff',
					// colorTextDescription: '#ffffff',
					// colorTextLightSolid: '#ffffff',
					// colorTextPlaceholder: '#444950',
					// colorTextSecondary: '#ffffff',
					// colorBgSolidActive: '#0D1117',
					// colorBgSolidHover: '#0D1117',
					// colorBgSolid: '#0D1117',
					// colorBgElevated: '#0D1117',
					// colorBorder: '#0D1117',
					// colorBgBase: '#0D1117',
					// colorBgContainer: '#0D1117',
					// colorFillContentHover: '#3f444e',
					// colorFillAlter: '#1e2127',
					// colorFillContent: '#181a1f',
					// colorBgContainerDisabled: '#2d333b',
					// colorBorderBg: '#30363d',
					// colorSplit: '#21262d',
					// fontWeightStrong: 800,
					// colorIcon: '#0D1117',
					// colorIconHover: '#0D1117',
					// colorHighlight: '#f5c00b',
					// controlOutline: '#30363d',
					// colorWarningOutline: '#f5c00b',
					// colorErrorOutline: '#f34b7d',
					// fontSizeIcon: 14,
					// controlOutlineWidth: 2,
					// controlItemBgHover: '#444950',
					// controlItemBgActive: '#444950',
					// controlItemBgActiveHover: '#1f6feb',
					// controlItemBgActiveDisabled: '#2d333b'
				}
			}}
		>
			<BrowserRouter>
				<AlertProvider>
					<Layout />
				</AlertProvider>
			</BrowserRouter>
		</ConfigProvider>
	)
}

export default App
