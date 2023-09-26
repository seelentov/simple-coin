/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getData, updateData } from '../../../hooks/cfsHooks'
import { useStoreBy } from '../../../hooks/useStoreBy'
import { useGetDataQuery } from '../../../store/api/curr.api'
import { Loading } from '../../ui/Loading/Loading'
import styles from './Convert.module.scss'
import { Valute } from './Valute'
import { Wallet } from './Wallet'

export const Convert = () => {
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

		if (input > thisUser.wallet[name].Value) {
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
							(r.wallet[name] ? Number(r.wallet[name].Value) : 0) -
							Number(input),
						CharCode: name,
						Name: data.Valute[name].Name,
					},
					RUB: {
						Value: Number(r.wallet.RUB.Value) + Number(value),
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
							<h2>Конвертация валюты</h2>
							<form className={styles.form} onSubmit={e => handleSubmit(e)}>
              {thisUser?.wallet?.RUB && (
									<Valute
									data={thisUser}
									name={name}
									bg={{
										background:
											'linear-gradient(0deg, rgba(34,193,195,1) 0%, rgba(253,187,45,1) ',
									}}
								/>
								)}
								
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
									Вы получите:
									<span>
										{value} RUB
									</span>
								</p>
								<input
									value={input}
									onChange={e => {
										setInput(e.target.value)
										setValue(
											(
												Number(e.target.value) * Number(data.Valute[name].Value)
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
								<button disabled={input <= 0}>Пополнить</button>
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
