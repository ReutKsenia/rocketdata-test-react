import './Login.css'
import api from '../api/login'
import { useState, useContext } from 'react'
import { AuthContext } from '../AuthProvider'
import { useNavigate } from 'react-router-dom'

let regex = new RegExp('[a-z0-9]+@[a-z]+.[a-z]{2,3}')

const Login = () => {
  let navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState({ email: null, pass: null })

  const { changeAuth } = useContext(AuthContext)

  const loginHandler = async (e) => {
    e.preventDefault()
    if (email.trim().length === 0 && password.trim().length === 0) {
      setError({
        email: 'Эти поля не могут быть пустыми',
        pass: 'Эти поля не могут быть пустыми',
      })
      return
    }
    if (error.email || error.pass) return

    const response = await api.login(email, password)
    if (response.data === 'error') {
      setError({
        email: null,
        pass: 'Неверный логин или пароль',
      })
    } else {
      changeAuth(true)
      navigate('/profile')
    }
  }

  const emailChangeHandler = (event) => {
    if (
      regex.test(event.target.value.trim()) ||
      event.target.value.trim().length === 0
    ) {
      setError((prev) => {
        return { ...prev, email: null }
      })
    } else {
      setError((prev) => {
        return { ...prev, email: 'Укажите корректный email адрес' }
      })
    }
    setEmail(event.target.value)
  }

  const passwordChangeHandler = (event) => {
    if (
      event.target.value.trim().length < 8 &&
      event.target.value.trim().length > 0
    ) {
      setError((prev) => {
        return { ...prev, pass: 'Пароль должен содержать не менее 8 символов' }
      })
    } else {
      setError((prev) => {
        return { ...prev, pass: null }
      })
    }
    setPassword(event.target.value)
  }

  return (
    <div className='App'>
      <form onSubmit={loginHandler} className='LoginForm'>
        <h3>Вход</h3>
        <p>Для существующих пользователей</p>
        <label htmlFor='email'>
          Email:<span>*</span>
        </label>
        <input
          id='email'
          type='text'
          onChange={emailChangeHandler}
          value={email}
          className={error.email && 'invalid__input'}
        />
        <p className={'error'}>{error.email}</p>
        <label htmlFor='password'>
          Пароль:<span>*</span>
        </label>
        <input
          id='password'
          type='password'
          onChange={passwordChangeHandler}
          value={password}
          className={error.pass && 'invalid__input'}
        />
        <p className={'error'}>{error.pass}</p>
        <button type='submit'>Войти в систему</button>
      </form>
    </div>
  )
}

export default Login
