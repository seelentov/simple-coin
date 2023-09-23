import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { Header } from './ui/Header/Header'
//import { Footer } from './ui/Footer/Footer'
import { Container } from '../hoc/Container'
import { Home } from './screens/Home/Home';
export const App = () => {
	return (
		<>
			<BrowserRouter>
					<Header />
					<Container>
						<Routes>
							<Route path='/' element={<Home />} />
						</Routes>
					</Container>
				{/*}<Footer />{*/}
			</BrowserRouter>
		</>
	)
}
