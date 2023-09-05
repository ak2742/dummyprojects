import React, { useState } from 'react'
import { useHistory, Link } from 'react-router-dom'

function Signup(props) {
    document.title = `Signup | ${process.env.REACT_APP_NAME}`
    const host = `http://${process.env.REACT_APP_SERVER}`
    const history = useHistory()
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "" })

    const onSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch(`${host}/api/auth/join`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password })
            });
            const responseJson = await response.json()
            if (responseJson.authToken) {
                localStorage.setItem('auth', responseJson.authToken)
                props.showAlert("success", "New Account Created")
                history.push('/')

            } else {
                console.log(response.json())
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
            <h3 className="text-center">Sign up for free</h3>
            <form onSubmit={onSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Full Name</label>
                    <input type="text" placeholder="min 3 chars" minLength={3} name="name" value={credentials.name} onChange={onChange} className="form-control" id="name" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email Address</label>
                    <input type="email" placeholder="valid email ID" name="email" value={credentials.email} onChange={onChange} className="form-control" id="email" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" placeholder="use a strong password" minLength={8} name="password" value={credentials.password} onChange={onChange} className="form-control" id="password" required />
                </div>
                <button disabled={
                    credentials.name.length < 3 || credentials.email.length < 5 || credentials.password.length < 8
                } type="submit" className="btn btn-primary">Join</button>
            </form>
            <div className="d-flex">
                <Link className="text-primary my-3" to="/login">Already have an account</Link>
            </div>
        </>
    )
}

export default Signup
