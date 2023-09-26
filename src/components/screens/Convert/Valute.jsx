/* eslint-disable react/prop-types */

import styles from './Convert.module.scss'


export const Valute = ({ data, name, bg }) => {

	return (
		<div className={styles.item} style={bg}>
			<div className={styles.info}>
				<h2>{data.wallet[name].Name}</h2>
				<p>
					{(data.wallet[name].Value)
						.toString()
						.slice(0, 6)}
				</p>
			</div>
			<div className={styles.symbol}>{data.wallet[name].CharCode}</div>
		</div>
	)
}