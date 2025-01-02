import { ConfigProvider } from 'antd'
import { BrowserRouter } from 'react-router-dom'
import Layout from './pages/layout'

function App() {
	return (
		<ConfigProvider
			theme={{
				token: {
					colorPrimary: '#17252a',
					colorInfo: '#17252a',
					colorSuccess: '#2b7a78',
					colorWarning: '#3aafa9',
					colorError: '#def2f1',
					colorLink: '#17252a'
				}
			}}
		>
			<BrowserRouter>
				<Layout />
			</BrowserRouter>
		</ConfigProvider>
	)
}

export default App
