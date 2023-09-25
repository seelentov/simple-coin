/* eslint-disable react-hooks/exhaustive-deps */
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { Header } from './ui/Header/Header'
//import { Footer } from './ui/Footer/Footer'
import { Container } from '../hoc/Container'
import { useAuth } from '../hooks/useAuth'
import { useStoreBy } from './../hooks/useStoreBy'
import { Account } from './screens/Account/Account'
import { CurrencyMore } from './screens/CurrencyMore/CurrencyMore'
import { Home } from './screens/Home/Home'
import { LoginPage } from './screens/Login/LoginPage'
import { PageNotFound } from './screens/PageNotFound/PageNotFound'
import { IsAuth } from '../context/isAuth'
import { Replenishment } from './screens/Replenishment/Replenishment';
import { Purchase } from './screens/Purchase/Purchase'

export const App = () => {
	const { id } = useStoreBy('user')

	return (
		<>
			<BrowserRouter>
				<Header
					items={[
						useAuth() && {
							name: 'Аккаунт',
							href: `/account/${id}`,
							color: null,
							bg: null,
						},
						{ name: 'Валюты', href: `/`, color: null, bg: null },
						useAuth() && {
							name: 'Пополнение',
							href: `/replenishment`,
							color: null,
							bg: null,
						},
						!useAuth() && {
							name: 'Войти',
							href: `/account`,
							color: 'white',
							bg: 'black',
						},
					]}
				/>
				<Container>
					<IsAuth>
						<Routes>
							<Route path='/' element={<Home />} />
							<Route path='/currency/:id' element={<CurrencyMore />} />
							<Route path='/account' element={<LoginPage />} />
							<Route path='/account/:id' element={<Account />} />
							<Route path='*' element={<PageNotFound />} />
							<Route path='/replenishment' element={<Replenishment />} />
							<Route path='/purchase/:name' element={<Purchase />} />
						</Routes>
					</IsAuth>
				</Container>
				{/*}<Footer />{*/}
			</BrowserRouter>
		</>
	)
}
