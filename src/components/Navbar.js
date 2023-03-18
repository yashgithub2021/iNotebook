import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


export const Navbar = () => {

    const name = localStorage.getItem('name')

    //Logout Function
    const navigate = useNavigate();
    const logout = () => {
        localStorage.removeItem('token')
        navigate('/login')
    }

    //Active link
    let location = useLocation();
    useEffect(() => {

    }, [location])

    return (
        <nav className="navbar sticky-top navbar-expand-lg navbar-dark bg-dark" data-bs-theme="dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">iNotebook</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} to="/about">About Me</Link>
                        </li>
                    </ul>
                    {!localStorage.getItem('token') ? <form>
                        <Link className="btn btn-primary mx-1" to="/login" role="button">Login </Link>
                        <Link className="btn btn-primary mx-1" to="/signup" role="button">Signup</Link>
                    </form> :
                        // 
                        <div className="dropstart">
                            <button className="btn btn-success dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Welcome {name}
                            </button>
                            <ul className="dropdown-menu dropdown-menu-dark">
                                <li><Link onClick={logout} className="dropdown-item" to="/login" role="button">Logout</Link></li>
                            </ul>
                        </div>
                    }

                </div>
            </div>
        </nav>
    )
}
