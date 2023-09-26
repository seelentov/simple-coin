/* eslint-disable react/prop-types */

import styles from './Purchase.module.scss'

export const Wallet = ({ data, bg }) => {
	const wallet = data.wallet.RUB

	return (
		<div className={styles.itemWallet} style={bg}>
			<div className={styles.info}>
				<h2>Ваш кошелек</h2>
				<p>{wallet.Value}</p>
			</div>
			<div className={styles.symbol}>{wallet.CharCode}</div>
		</div>
	)
}
