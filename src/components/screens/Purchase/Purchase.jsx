/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getData, updateData } from '../../../hooks/cfsHooks'
import { useStoreBy } from '../../../hooks/useStoreBy'
import { useGetDataQuery } from '../../../store/api/curr.api'
import { Loading } from './../../ui/Loading/Loading'
import styles from './Purchase.module.scss'

export const Purchase = () => {
	const [input, setInput] = useState('')
	const [value, setValue] = useState('')
	const [state, setState] = useState('edit')
	const [thisUser, setUser] = useState('edit')

	const user = useStoreBy('user')

	const { name } = useParams()

	const { isLoading, data } = useGetDataQuery()

	useEffect(() => {
		getData('users', user.id, r => {
			setUser(r)
		})
	}, [isLoading, user])

	const handleSubmit = e => {
		e.preventDefault()
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
								<Valute data={data} name={name} />
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
								<button>Пополнить</button>
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

const Valute = ({ data, name }) => {
	const curr =
		(data.Valute[name].Value - data.Valute[name].Previous) /
		data.Valute[name].Nominal

	return (
		<div className={styles.item}>
			<div className={styles.info}>
				<h2>{data.Valute[name].Name}</h2>
				<p>
					{(data.Valute[name].Value / data.Valute[name].Nominal)
						.toString()
						.slice(0, 6)}
					<span style={{ color: curr > 0 ? 'green' : 'red' }}>
						{curr > 0 ? ' ▲' : ' ▼'}
						{Math.abs(curr).toString().slice(0, 8)}
					</span>
				</p>
			</div>
			<div className={styles.symbol}>{data.Valute[name].CharCode}</div>
		</div>
	)
}
