import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { Loading } from '../../ui/Loading/Loading'
import { addToData } from './../../../hooks/cfsHooks'
import { useActions } from './../../../hooks/useActions'
import styles from './Login.module.scss'

export const SignUp = () => {
	const { setUser } = useActions()

	const [fbErrors, setErrors] = useState([])
	const [loading, setLoading] = useState(false)

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm()

	const navigate = useNavigate()

	const onSubmit = data => {
		setLoading(true)
		setErrors([])
		const auth = getAuth()
		createUserWithEmailAndPassword(auth, data.email, data.password)
			.then(({ user }) => {
				setUser({
					email: user.email,
					id: user.uid,
					token: user.accessToken,
				})
				addToData('users', user.uid, {
					email: data.email,
					name: data.name,
					img: '/src/assets/no-photo.jpg',
					wallet: {
						RUB: {
							Value: 0,
							CharCode: 'RUB',
							Name: 'Российский рубль',
						},
					},
				})
				navigate(`/account/${user.uid}`)
			})
			.catch(e => {
				setLoading(false)
				if (e.message.includes('password')) {
					console.log(e)
					setErrors([['Пароль должен быть более 6-ти символов', ...errors]])
				}
				if (e.message.includes('invalid-email')) {
					console.log(e)
					if (!errors.includes('Используйте валидный e-mail')) {
						setErrors([['Используйте валидный e-mail']])
					}
				}
				if (e.message.includes('email-already-in-use')) {
					console.log(e)
					setErrors([['Этот e-mail уже используется другим пользователем']])
				}
				setLoading(false)
			})
	}

	return (
		<>
			{loading && <Loading />}
			<h2>Регистрация</h2>
			<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
				<input
					{...register('name', {
						required: 'Имя пользователя обязательно',
					})}
					type='text'
					placeholder='Имя'
				/>
				<input {...register('email', {})} type='text' placeholder='E-mail' />
				<input
					{...register('password', {})}
					type='password'
					placeholder='Пароль'
				/>
				<div
					className={fbErrors.length > 0 ? styles.errorsYes : styles.errorsNo}
				>
					{fbErrors.length > 0 &&
						fbErrors.map((e, key) => <p key={key}>{e}</p>)}
				</div>
				<button>Создать аккаунт</button>
			</form>
		</>
	)
}
