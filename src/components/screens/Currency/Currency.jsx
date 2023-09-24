/* eslint-disable react/prop-types */
import { formatDate } from './../../../service/formatDate'
import styles from './Currency.module.scss'
import { Link } from 'react-router-dom'


export const Currency = ({ data }) => {

  const sortedKeys = Object.keys(data.Valute).sort((a, b) => {
    const currA = (data.Valute[a].Value - data.Valute[a].Previous) / data.Valute[a].Nominal;
    const currB = (data.Valute[b].Value - data.Valute[b].Previous) / data.Valute[b].Nominal;
    return currB - currA;
  });

	return (
		<div className={(styles.page)}>
			<p className={styles.date}>
				Последнee обновлениe: {formatDate(data.Date)}
			</p>
			<div className={styles.items}>
				{sortedKeys.map(key => {
					const curr = (data.Valute[key].Value - data.Valute[key].Previous) / data.Valute[key].Nominal

					return (
						<div key={key} className={styles.item}>
							<div className={styles.info}>
								<h2>{data.Valute[key].Name}</h2>
								<p>
									{(data.Valute[key].Value / data.Valute[key].Nominal).toString()
											.slice(0, 6)}
									<span style={{ color: curr > 0 ? 'green' : 'red' }}>
										{curr > 0 ? ' ▲' : ' ▼'}
										{Math.abs(curr)
											.toString()
											.slice(0, 8)}
									</span>
								</p>
                <div className={styles.btns}>
								<Link to={`/currency/${key}`}>
									<button className={styles.more}>Подробнее</button>
								</Link>
                <Link to={`/currency/${key}`}>
                <button className={styles.buy}>Купить</button>
								</Link>
								

                </div>
							</div>
							<div className={styles.symbol}>{data.Valute[key].CharCode}</div>
						</div>
					)
				})}
			</div>
		</div>
	)
}
