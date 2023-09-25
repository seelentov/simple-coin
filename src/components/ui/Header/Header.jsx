/* eslint-disable react/prop-types */
import { useState } from 'react'
import { Link } from 'react-router-dom'
import styles from './Header.module.scss'

export const Header = ({ items }) => {
	const [state, setState] = useState(null)

	const handleClick = () => {
		setState(state === 'open' ? 'close' : 'open')
	}
	return (
		<header className={styles.header}>
			<div className={styles.nav}>
				<button
					className={
						styles.Bars +
						' ' +
						(state === 'open' ? styles.closeBars : styles.openBars)
					}
					onClick={() => handleClick()}
				>
					<div></div>
					<div></div>
					<div></div>
				</button>
				<p className={styles.logo}>SimpleCoin</p>
			</div>

			<div
				className={
					styles.menu +
					' ' +
					`${
						state === 'open'
							? styles.menuOpen
							: state === 'close'
							? styles.menuClose
							: ''
					}`
				}
			>
				{items.map((e, key) => {
          if(!e) return
					return (
						<Link key={key} to={e.href}>
							<button
								style={{ background: e.bg ? e.bg : 'transparent', color: e.color ? e.color : 'black' }}
								className={styles.links}
								onClick={() => handleClick()}
							>
								{e.name}
							</button>
						</Link>
					)
				})}
			</div>
			<div
				onClick={() => handleClick()}
				className={
					styles.wrapper + ' ' + (state === 'open' && styles.wrapperOpen)
				}
			></div>
		</header>
	)
}
