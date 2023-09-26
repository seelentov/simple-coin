/* eslint-disable no-undef */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useStoreBy } from '../../../hooks/useStoreBy'
import styles from './Account.module.scss'
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '../../../firebase'
import { LoadingMin } from '../../ui/Loading/LoadingMin'
import { useActions } from './../../../hooks/useActions';
import { clearCookieLogin } from '../../../service/cookieLogin'


export const Account = () => {
	const [userData, setUserData] = useState('')
	const [loading, setLoading] = useState(false)

	const user = useStoreBy('user')
	const { id } = useParams()

	const { clearUser } = useActions()

	const navigate = useNavigate()
  if (!user.id) navigate('/account')

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
						<div></div>
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
												<p className={styles.itemValue}>
													{userData.wallet[key].Value.toString().slice(0, 9)}
												</p>
												<div className={styles.btns}>
													{userData.wallet[key].CharCode === 'RUB' ? (
														<Link to={'/replenishment'}>
															<button className={styles.more}>Пополнить</button>
														</Link>
													) : (
														<Link
															to={`/convert/${userData.wallet[key].CharCode}`}
														>
															<button className={styles.more}>
																Конвертировать
															</button>
														</Link>
													)}
												</div>
											</div>

											<div className={styles.itemName}>
												<div className={styles.symbol}>
													{userData.wallet[key].CharCode}
												</div>
												<p>{userData.wallet[key].Name}</p>
											</div>
										</div>
									))
							: 'Загрузка..'}
              <button
						className={styles.quit}
						onClick={() => {
							clearCookieLogin()
							clearUser()
						}}
					>
						Выйти
					</button>
					</div>
					
				</div>
			)}
		</>
	)
}
