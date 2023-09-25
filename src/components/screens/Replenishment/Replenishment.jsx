import { useState } from 'react'
import { useStoreBy } from '../../../hooks/useStoreBy'
import { Loading } from '../../ui/Loading/Loading'
import { getData, updateData } from './../../../hooks/cfsHooks'
import styles from './Replenishment.module.scss'

export const Replenishment = () => {
	const [input, setInput] = useState('')
	const [state, setState] = useState('edit')

	const { id } = useStoreBy('user')

	const handleSubmit = e => {
		e.preventDefault()
		setState('loading')
		getData('users', id, r => {
			updateData('users', id, {
				wallet: {
					...r.wallet,
					RUB: {
						Value: Number(r.wallet.RUB.Value) + Number(input),
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
					<h2>Пополнение кошелька</h2>
					<form className={styles.form} onSubmit={e => handleSubmit(e)}>
						<img
							className={styles.cart}
							src='/src/assets/Muga_Golden_Credit_Card.svg'
						/>
						<input
							value={input}
							onChange={e => setInput(e.target.value)}
							type='number'
							placeholder='Сумма'
						/>
						<button>Пополнить</button>
					</form>
				</>
			) : state === 'success' ? (
				<p className={styles.success}>Счет успешно пополнен</p>
			) : (
				<Loading />
			)}
		</div>
	)
}
