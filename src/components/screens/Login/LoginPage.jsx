/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from 'react'
import styles from './Login.module.scss'
import { SignUp } from './SignUp';
import { Login } from './Login';
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react';
import { useStoreBy } from '../../../hooks/useStoreBy'

export const LoginPage = () => {
	const [page, setPage] = useState(true)

  const {id} = useStoreBy('user')

  const navigate = useNavigate()
	useEffect(() => {
		if (id) navigate(`/account/${id}`)

	}, [id])

	return (
		<div className={styles.page}>
			{page ? <Login /> : <SignUp />}
			<button onClick={() => setPage(!page)}>
				{page ? 'Хотите создать аккаунт?' : 'Уже есть аккаунт?'}
			</button>
		</div>
	)
}

