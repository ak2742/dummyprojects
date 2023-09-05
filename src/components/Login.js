import React, { useState } from 'react'
import { useHistory, Link } from 'react-router-dom'

function Login(props) {
    document.title = `Login | ${process.env.REACT_APP_NAME}`
    const host = `http://${process.env.REACT_APP_SERVER}`
    const history = useHistory()
    const [credentials, setCredentials] = useState({ email: "", password: "" })

    const onSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch(`${host}/api/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: credentials.email, password: credentials.password })
            });
            const responseJson = await response.json()
            if (responseJson.success) {
                localStorage.setItem('auth', responseJson.authToken)
                props.showAlert("success", "Logged into your account")
                history.push('/')

            } else {
                alert('Something went wrong')
            }
        } catch (error) {
            alert('Something went wrong')
        }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    return (
        <>
            <h3 className="text-center">Log in to use a secured drive</h3>
            <form onSubmit={onSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email Address</label>
                    <input type="email" placeholder="enter a registered email" name="email" value={credentials.email} onChange={onChange} className="form-control" id="email" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" placeholder="enter your password" minLength={8} name="password" value={credentials.password} onChange={onChange} className="form-control" id="password" required />
                </div>
                <button disabled={
                    credentials.email.length < 5 || credentials.password.length < 8
                } type="submit" className="btn btn-primary">Login</button>
            </form>
            <div className="d-flex">
                <Link className="text-primary my-3" to="/signup">Create a new account</Link>
            </div>
        </>
    )
}

export default Login