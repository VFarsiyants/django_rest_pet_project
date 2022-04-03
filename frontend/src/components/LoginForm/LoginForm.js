import { useState } from 'react'
import './LoginForm.css'

const LoginForm = (props) => {
    const [authData, setAuthData] = useState({ login: '', password: '' })
    function handleInput(event) {
        setAuthData(prevData => ({
            ...prevData,
            [event.target.name]: event.target.value
        }))
    }

    function handleSubmit(event) {
        event.preventDefault()
        props.login(authData.login, authData.password)
    }

    return (
        <form className="LoginForm" onSubmit={handleSubmit}>
            <input
                type='text'
                name="login"
                placeholder="Login"
                value={authData.login}
                onChange={handleInput}>
            </input>
            <input
                type='password'
                name="password"
                placeholder="Password"
                value={authData.password}
                onChange={handleInput}>
            </input>
            <button type='submit'>Login</button>
        </form>
    )
}

export default LoginForm