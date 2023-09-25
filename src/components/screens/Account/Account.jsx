/* eslint-disable no-undef */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useStoreBy } from '../../../hooks/useStoreBy'
import styles from './Account.module.scss'

import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '../../../firebase'
import { LoadingMin } from '../../ui/Loading/LoadingMin'
export const Account = () => {
	const [userData, setUserData] = useState('')
	const [loading, setLoading] = useState(false)

	const user = useStoreBy('user')
	const { id } = useParams()

	const [myAcc, setMyAcc] = useState(false)

	const navigate = useNavigate()
	useEffect(() => {
		setLoading(true)
		const unsub = onSnapshot(
			doc(db, 'users', id),
			{ includeMetadataChanges: true },
			doc => {
				setUserData(doc.data())
				setLoading(false)
			}
		)

		if (!user) navigate('/account')
		if (user.id === id) setMyAcc(true)

		return unsub
	}, [])

	return (
		<>
			{loading ? (
				<LoadingMin />
			) : (
				<div className={styles.page}>
					<div className={styles.top}>
						<div className={styles.desc}>
							<p className={styles.name}>{userData.name}</p>
							<p className={styles.email}>{userData.email}</p>
						</div>
						<img src={userData.img} />
					</div>
					<div className={styles.items}>
						{userData.wallet
							? Object.keys(userData.wallet)
									.filter(
										key => userData.wallet[key].Value > 0 || key === 'RUB'
									)
									.sort((a, b) => {
										if (userData.wallet[a].CharCode === 'RUB') {
											return -1
										} else if (userData.wallet[b].CharCode === 'RUB') {
											return 1
										} else {
											return userData.wallet[b].Value - userData.wallet[a].Value
										}
									})
									.map(key => (
										<div key={key} className={styles.item}>
											<div className={styles.info}>
												<div className={styles.btns}>
													{userData.wallet[key].CharCode === 'RUB' ? (
														<Link to={'/replenishment'}>
															<button className={styles.more}>Пополнить</button>
														</Link>
													) : (
														<button className={styles.more}>
															Конвертировать
														</button>
													)}
												</div>
											</div>
											<p className={styles.itemValue}>
												{userData.wallet[key].Value}
											</p>
											<div className={styles.itemName}>
												<div className={styles.symbol}>
													{userData.wallet[key].CharCode}
												</div>
												<p>{userData.wallet[key].Name}</p>
											</div>
										</div>
									))
							: 'Загрузка..'}
					</div>
				</div>
			)}
		</>
	)
}
