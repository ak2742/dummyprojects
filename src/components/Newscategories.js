import React from 'react'
import { Link } from 'react-router-dom'

function Newscategories(props) {

    let myStyle = {
        color: props.mode === 'dark' ? '#ffffff' : '#000000',
        backgroundColor: props.mode === 'dark' ? '#212529' : '#ffffff',
    }

    return (
        <ul className="navbar-nav me-auto mb-2 mb-lg-0 mx-3">
            <li className="nav-item dropdown">
                <Link className="nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Category
                </Link>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown" style={myStyle}>
                    <li><Link className="dropdown-item" style={myStyle} to="/news/all">All</Link></li>
                    <li><Link className="dropdown-item" style={myStyle} to="/news/business">Business</Link></li>
                    <li><Link className="dropdown-item" style={myStyle} to="/news/entertainment">Entertainment</Link></li>
                    <li><Link className="dropdown-item" style={myStyle} to="/news/health">Health</Link></li>
                    <li><Link className="dropdown-item" style={myStyle} to="/news/science">Science</Link></li>
                    <li><Link className="dropdown-item" style={myStyle} to="/news/sports">Sports</Link></li>
                    <li><Link className="dropdown-item" style={myStyle} to="/news/technology">Technology</Link></li>
                </ul>
            </li>
        </ul>
    )
}

export default Newscategories
