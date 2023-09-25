import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useActions } from '../../../hooks/useActions'
import { setCookieLogin } from './../../../service/cookieLogin'
import styles from './Login.module.scss'
import { Loading } from '../../ui/Loading/Loading'
import { useNavigate } from 'react-router-dom'

export const Login = () => {
	const { register, handleSubmit, reset } = useForm()

	const { setUser } = useActions()

	const [errors, setErrors] = useState([])
	const [loading, setLoading] = useState(false)

  const navigate = useNavigate()



	const onSubmit = data => {
		setLoading(true)
		setErrors([])
		const auth = getAuth()
		signInWithEmailAndPassword(auth, data.email, data.password)
			.then(({ user }) => {
				setUser({
					email: user.email,
					id: user.uid,
					token: user.accessToken,
				})
        setCookieLogin({
					id: user.uid,
					token: user.accessToken,
        })
        navigate(`/account/${user.uid}`)
			})
			.catch(e => {
        setLoading(false)
        reset()
				setErrors(['Неверный логин или пароль'])
				console.log(e)
			})
	}
	return (
		<>
      {loading && <Loading />}
			<h2>Вход в аккаунт</h2>
			<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
				<input {...register('email', {})} type='email' placeholder='E-mail' />
				<input
					{...register('password', {})}
					type='password'
					placeholder='Пароль'
				/>
				<div className={errors.length > 0 ? styles.errorsYes : styles.errorsNo}>
					{errors.length > 0 && errors.map((e, key) => <p key={key}>{e}</p>)}
				</div>
				<button>Войти</button>
			</form>
		</>
	)
}
