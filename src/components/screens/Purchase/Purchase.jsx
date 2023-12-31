/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getData, updateData } from '../../../hooks/cfsHooks'
import { useStoreBy } from '../../../hooks/useStoreBy'
import { useGetDataQuery } from '../../../store/api/curr.api'
import { Loading } from './../../ui/Loading/Loading'
import styles from './Purchase.module.scss'
import { Valute } from './Valute'
import { Wallet } from './Wallet'
import { useNavigate } from 'react-router-dom';

export const Purchase = () => {
	const [input, setInput] = useState(0)
	const [inputError, setInputError] = useState(false)
	const [value, setValue] = useState(0)
	const [state, setState] = useState('edit')
	const [thisUser, setUser] = useState({})

	const user = useStoreBy('user')

	const { name } = useParams()

	const { isLoading, data } = useGetDataQuery()
  const navigate = useNavigate()
  
  if (!user.id) navigate('/account')
	useEffect(() => {


		getData('users', user.id, r => {
			setUser(r)
		})
	}, [user])

	const handleSubmit = e => {
		e.preventDefault()
		setInputError(false)

		if (input > thisUser.wallet.RUB.Value) {
			setInputError(true)
			return
		}

		if (thisUser.wallet) setState('loading')
		getData('users', user.id, r => {
			updateData('users', user.id, {
				wallet: {
					...r.wallet,
					[name]: {
						Value:
							(r.wallet[name] ? Number(r.wallet[name].Value) : 0) +
							Number(value),
						CharCode: name,
						Name: data.Valute[name].Name,
					},
					RUB: {
						Value: Number(r.wallet.RUB.Value) - Number(input),
						CharCode: 'RUB',
						Name: 'Российский рубль',
					},
				},
			})
			setState('success')
		})
	}

	return (
		<div className={styles.page}>
			{state === 'edit' ? (
				<>
					{!isLoading && (
						<>
							<h2>Приобретение валюты</h2>
							<form className={styles.form} onSubmit={e => handleSubmit(e)}>
								<Valute
									data={data}
									name={name}
									bg={{
										background:
											'linear-gradient(0deg, rgba(34,193,195,1) 0%, rgba(253,187,45,1) ',
									}}
								/>
								{thisUser?.wallet?.RUB && (
									<Wallet
										data={thisUser}
										bg={{
											background:
												'linear-gradient(90deg, rgb(131, 58, 180) 0%, rgb(253, 29, 29) 50%, rgb(252, 176, 69) 100%)',
										}}
									/>
								)}
								<p className={styles.value}>
									Вы получите:{' '}
									<span>
										{value} {data.Valute[name].CharCode}
									</span>
								</p>
								<input
									value={input}
									onChange={e => {
										setInput(e.target.value)
										setValue(
											(
												Number(e.target.value) /
												(Number(data.Valute[name].Value) /
													Number(data.Valute[name].Nominal))
											)
												.toString()
												.slice(0, 7)
										)
										console.log(data.Valute[name].Value)
									}}
									type='number'
									placeholder='Сумма'
								/>
								{inputError && (
									<p className={styles.inputError}>Недостаточно средств</p>
								)}
								<button disabled={input < 100}>Пополнить</button>
								<p style={{ textAlign: 'center' }}>
									Минимальная сумма покупки - на 100 Р
								</p>
							</form>
						</>
					)}
				</>
			) : state === 'success' ? (
				<p className={styles.success}>Счет успешно пополнен</p>
			) : (
				<Loading />
			)}
		</div>
	)
}
