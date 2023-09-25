/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'
import { Loading } from '../components/ui/Loading/Loading'
import { getData } from '../hooks/cfsHooks'
import { useActions } from '../hooks/useActions'

export const IsAuth = ({ children }) => {
	const [loading, setLoading] = useState(false)

	const { setUser } = useActions()
	const thisUser = Cookies.get('id')
	useEffect(() => {
		setLoading(true)
		//clearCookieLogin() //Очистить id, token в cookie

		if (!thisUser) {
			return setLoading(false)
		} else {
			getData('users', thisUser, r => {
				setUser({
					email: r.email,
					id: thisUser,
					token: Cookies.get('token'),
					name: r.name,
					img: r.img,
				})
			})
				.then(() => setLoading(false))
				.catch((e) => {
          console.error(e)
          setLoading(false)
        }
        )
		}
	}, [thisUser])

	return <>{loading ? <Loading /> : children}</>
}
