import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { uAC } from '../states/index'

function Login() {
    document.title = "Login"
    const dispatch = useDispatch()
    const history = useHistory()
    const { login, lostPass } = bindActionCreators(uAC, dispatch)

    useEffect(() => {
        if (localStorage.getItem("auth") !== null) {
            history.push('/')
        }
        // eslint-disable-next-line
    }, [])

    
    const [logging, setLogging] = useState(false)
    const [credentials, setCredentials] = useState({ email: "", password: "" })

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        setLogging(true)
        await login(credentials.email, credentials.password)
        history.push('/?src=login')
    }

    const resetBtn = async () => {
        let recMail = prompt("enter your email", credentials.email)
        if (recMail !== "") {
            setLogging(true)
            await lostPass(recMail)
            history.push('/verify?src=resetpassword')
        }
    }

    const joinBtn = async () => {
        history.push('/join')
    }

    return (
        <>
        {logging === true ? <h4 className="text-center">Please wait...</h4> : <>
            <form className="row" onSubmit={onSubmit}>
                <div className="mb-3 col-md-6 offset-md-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" minLength="5" maxLength="35" autoComplete="username" title="Please enter a valid value" value={credentials.email} onChange={onChange} className="form-control" id="email" name="email" required />
                </div>
                <div className="mb-3 col-md-6 offset-md-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" minLength="8" maxLength="35" autoComplete="current-password" title="Please enter a valid value" value={credentials.password} onChange={onChange} className="form-control" id="password" name="password" required />
                </div>
                <button type="submit" className="btn btn-primary col-md-2 offset-md-5">Login</button>
            </form>
            <div className="d-flex row">
                <div className="text-primary my-3 col-md-2 offset-md-4" role="button" onClick={joinBtn}>Create a new account</div>
                <div className="text-primary mx-3 my-3 col-md-2 offset-md-5" role="button" onClick={resetBtn}>Reset your password</div>
            </div></>}
        </>
    )
}

export default Login
