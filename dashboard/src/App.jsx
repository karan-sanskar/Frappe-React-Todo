import { FrappeProvider } from 'frappe-react-sdk'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Todo from './pages/Todo'

function App() {
	return (
		<FrappeProvider socketPort={import.meta.env.VITE_SOCKET_PORT} >
			<BrowserRouter basename={import.meta.env.VITE_BASE_PATH}>
				<Routes>
					<Route path="/login" element={<h1>Login</h1>}></Route>
					<Route path="/" element={<Todo/>}></Route>
				</Routes>
			</BrowserRouter>
		</FrappeProvider >
	)
}

export default App
