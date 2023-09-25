/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/prop-types */

import { useParams } from 'react-router-dom'
import { useAuth } from '../../../hooks/useAuth'
import { useGetDataQuery } from '../../../store/api/curr.api'
import { LoadingMin } from './../../ui/Loading/LoadingMin'
import { CurrencyChart } from './CurrencyChart'
import styles from './CurrencyMore.module.scss'
import { Link } from 'react-router-dom';

export const CurrencyMore = () => {
	const { id } = useParams()
	const { isLoading, data } = useGetDataQuery()
	return (
		<>
			{isLoading ? (
				<LoadingMin />
			) : data ? (
				<div className={styles.page}>
					<div className={styles.chart}>
						<CurrencyChart valute={id} />
					</div>

					<div className={styles.info}>
						<h2 className={styles.name}>{data.Valute[id].Name}</h2>
						<div className={styles.values}>
							<p className={styles.value}>
								{(data.Valute[id].Value / data.Valute[id].Nominal)
									.toString()
									.slice(0, 6)}
							</p>
							<p className={styles.curr}>
								<span
									style={{
										color:
											(data.Valute[id].Value - data.Valute[id].Previous) /
												data.Valute[id].Nominal >
											0
												? 'green'
												: 'red',
									}}
								>
									{data.Valute[id].Value - data.Valute[id].Previous > 0
										? ' ▲'
										: ' ▼'}
									{Math.abs(
										(data.Valute[id].Value - data.Valute[id].Previous) /
											data.Valute[id].Nominal
									)
										.toString()
										.slice(0, 8)}
								</span>
							</p>
						</div>
					</div>
					{useAuth() && (
						<Link to={`/purchase/${data.Valute[id].CharCode}`}>
							<button className={styles.buy}>Приобрести</button>
						</Link>
					)}
					<div className={styles.symbol}>
						<div className={styles.symbol}>{data.Valute[id].CharCode}</div>
					</div>
				</div>
			) : (
				'Ошибка сервера'
			)}
		</>
	)
}
