import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { Header } from './ui/Header/Header'
//import { Footer } from './ui/Footer/Footer'
import { Container } from '../hoc/Container'
import { useStoreBy } from './../hooks/useStoreBy'
import { Home } from './screens/Home/Home'
import { CurrencyMore } from './screens/CurrencyMore/CurrencyMore'

export const App = () => {
	const { id } = useStoreBy('user')
	return (
		<>
			<BrowserRouter>
				<Header
					items={[
						{ name: 'Аккаунт', href: `/${id}`, color: null },
						{ name: 'Валюты', href: `/`, color: null },
						{ name: 'Кошелек', href: `/wallet/${id}`, color: null },
						{ name: 'Пополнение', href: `/replenishing`, color: null },
            !id && { name: 'Войти', href: `/login`, color: null },
					]}
				/>
				<Container>
					<Routes>
						<Route path='/' element={<Home />} />
						<Route path='/currency/:id' element={<CurrencyMore />} />
					</Routes>
				</Container>
				{/*}<Footer />{*/}
			</BrowserRouter>
		</>
	)
}
