/* eslint-disable react/prop-types */
import { useGetDataQuery } from '../../../store/api/curr.api'
import { LoadingMin } from '../../ui/Loading/LoadingMin'
import { Currency } from './../Currency/Currency';

export const Home = () => {
	const { isLoading, data } = useGetDataQuery()

	return (
		<>
			{isLoading ? (
				<LoadingMin />
			) : data ? (
				<Currency data={data} />
			) : (
				'Ошибка сервера'
			)}
		</>
	)
}


