import React, { useEffect, useRef } from 'react'
import { Link, useLocation, useHistory } from 'react-router-dom';

export default function Navbar(props) {
    const location = useLocation()
    const history = useHistory()
    const ref = useRef(null);

    useEffect(() => {
        let prev_key = localStorage.getItem("mode")
        if (!prev_key) {
            localStorage.setItem("mode", "light")
        } else if (prev_key === "dark") {
            ref.current.click()
        }
    }, [])

    const logout = () => {
        let confirmOut = window.confirm('Do you really want to log out?')
        if (confirmOut) {
            localStorage.removeItem('auth')
            props.showAlert("success", "Logged out")
            history.push('/')

        } else {
            props.showAlert("info", "Something went wrong")
        }
    }
    
    let myStyle = {
        color: props.mode === 'dark' ? '#ffffff' : '#000000',
        backgroundColor: props.mode === 'dark' ? '#161928' : '#ffffff',
    }

    return (
        <nav className={`navbar navbar-expand-lg navbar-${props.mode} bg-${props.mode}`}>
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">{`${process.env.REACT_APP_NAME}`}</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === "/" && "active"}`} aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item dropdown">
                            <Link className="nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Services
                            </Link>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdown" style={myStyle}>
                                <li><Link className={`dropdown-item ${location.pathname === "/texteditor" && "active"}`} to="/texteditor" style={myStyle}>Text Editor</Link></li>
                                <li><Link className={`dropdown-item ${location.pathname === "/news/all" && "active"}`} to="/news/all" style={myStyle}>Latest News</Link></li>
                                <li><Link className={`dropdown-item ${location.pathname === "/docs" && "active"}`} to="/docs" style={myStyle}>Docs</Link></li>
                                <li><hr className="dropdown-divider" /></li>
                                <li><Link className={`dropdown-item ${location.pathname === "/my/home" && "active"}`} to="/my/home" style={myStyle}>My Home</Link></li>
                            </ul>
                        </li>
                    </ul>
                    <div className="form-check form-switch mx-3">
                        <input ref={ref} className="form-check-input" onClick={props.modes} type="checkbox" role="switch" id="flexSwitchCheckDefault" style={{ "cursor": "pointer" }} />
                        <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Dark mode</label>
                    </div>
                    {!localStorage.getItem('auth') ? <form className="d-flex"> <Link className="btn btn-outline-primary mx-1 my-1" to="/login">Login</Link>
                        <Link className="btn btn-outline-primary mx-1 my-1" to="/signup">Signup</Link></form> :
                        <button className="btn btn-outline-primary mx-1 my-1" onClick={logout}>Logout</button>}
                </div>
            </div>
        </nav>
    )
}