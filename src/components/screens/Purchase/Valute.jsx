/* eslint-disable react/prop-types */

import styles from './Purchase.module.scss'


export const Valute = ({ data, name, bg }) => {
	const curr =
		(data.Valute[name].Value - data.Valute[name].Previous) /
		data.Valute[name].Nominal

	return (
		<div className={styles.item} style={bg}>
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