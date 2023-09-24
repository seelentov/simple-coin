/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios'
import { useEffect, useRef, useState } from 'react'
import { formatOnlyDate } from '../../../service/formatDate'
import { useGetDataQuery } from '../../../store/api/curr.api'
import { LoadingMin } from '../../ui/Loading/LoadingMin'
import { calculatePercentage } from './../../../service/calculatePercentage'
import { formatOnlyDayMonth } from './../../../service/formatDate'
import styles from './CurrencyChart.module.scss'

export const CurrencyChart = ({ valute }) => {
	const { isLoading, data } = useGetDataQuery()
	const [history, setHistory] = useState([])
	const [loading, setLoading] = useState(true)
	const [info, setInfo] = useState([])

	const [middle, setMiddle] = useState([])
	const [middleDate, setMiddleDate] = useState([])
	const [range, setRange] = useState(31)
	const scrollRef = useRef()

	useEffect(() => {
		let everyData = []
		let middleData = []
		let middleDate = []
		setLoading(true)
		const getMonthData = async (url, count = 0) => {
			if (count >= range) {
				setHistory([...everyData.reverse()])
				setMiddle([Math.max(...middleData), Math.min(...middleData)])
				setMiddleDate([...middleDate.reverse()])
				setLoading(false)
				console.log(middleDate)
				return
			}
    
			const response = await axios.get(url)
			everyData.push({
				date: response.data.Date,
				currency:
					response.data.Valute[valute].Value /
					response.data.Valute[valute].Nominal,
				diff:
					(response.data.Valute[valute].Value -
						response.data.Valute[valute].Previous) /
					response.data.Valute[valute].Nominal,
			})
			middleData.push(
				Number(
					response.data.Valute[valute].Value /
						response.data.Valute[valute].Nominal
				)
			)
			if (range < 32 && count % 5 === 0) {
				middleDate.push(response.data.Date)
			}

			if (response.data.PreviousURL) {
				getMonthData(response.data.PreviousURL, count + 1)
			}
		}

		if (data && data.PreviousURL) {
			getMonthData('https://www.cbr-xml-daily.ru/daily_json.js')
		}
	}, [isLoading, data, range])

	const changeInfo = info => {
		setInfo(info)
	}
  
	return (
		<>
			{loading && <LoadingMin />}
			<div className={styles.range}>
				<button
					style={{
						background: range === 7 ? 'white' : 'black',
						color: range === 7 ? 'black' : 'white',
					}}
					onClick={() => setRange(7)}
				>
					За неделю
				</button>
				<button
					style={{
						background: range === 31 ? 'white' : 'black',
						color: range === 31 ? 'black' : 'white',
					}}
					onClick={() => setRange(31)}
				>
					За месяц
				</button>
				<button
					style={{
						background: range === 365 ? 'white' : 'black',
						color: range === 365 ? 'black' : 'white',
					}}
					onClick={() => setRange(365)}
				>
					За год
				</button>
			</div>
			<div className={styles.container}>
				<div className={styles.graphCurr}>
					<div className={styles.graphCurrNums}>
						<p>{parseInt(middle[0])}</p>
						<p>{parseInt((middle[0] - middle[1]) / 2 + middle[1])}</p>
						<p>{parseInt(middle[1])}</p>
					</div>
					<div className={styles.graphCurrLine}></div>
				</div>
				<div className={styles.graph}>
					<div className={styles.items} ref={scrollRef}>
						{!loading &&
							history.map((e, key) => {
								const diag =
									calculatePercentage(middle[0], middle[1], e.currency) * 0.5
								return (
									<div
										key={key}
										className={styles.item}
										style={{ top: `${diag}%` }}
										onMouseEnter={() =>
											changeInfo([e.date, e.currency, e.diff])
										}
									>
										<div className={styles.point}>
											<p
												className={styles.diff}
												style={{ color: e.diff > 0 ? 'green' : 'red' }}
											>
												{e.diff > 0 ? '▲' : '▼'}
											</p>
										</div>
										<div className={styles.line}></div>
									</div>
								)
							})}
					</div>
					<div className={styles.graphDate}>
						<div className={styles.graphDateLine}></div>
						<div className={styles.graphDateNums}>
							{middleDate.length > 0 ? middleDate.map((e, key) => (
								<p key={key}>{formatOnlyDayMonth(e)}</p>
							)) : ''}
						</div>
					</div>
				</div>
			</div>
			<div className={styles.info}>
				<p className={styles.infoDate}>
					{info[0] ? formatOnlyDate(info[0]) : 'Наведитесь на график'}
				</p>
				{info[2] && info[1] && (
					<div className={styles.infoValue}>
						<p className={styles.infoCurr}>
							{info[1] && info[1].toString().slice(0, 6) + ' ' + valute}
						</p>
						<p
							className={styles.infoDiff}
							style={{ color: info[2] > 0 ? 'green' : 'red' }}
						>
							{info[2] > 0 ? '▲' : info[2] < 0 ? '▼' : null}
							{info[2]
								? Math.abs(info[2]).toString().slice(0, 6) + ' ' + valute
								: null}
						</p>
					</div>
				)}
			</div>
		</>
	)
}
