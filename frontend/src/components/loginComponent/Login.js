import React from 'react';
import { Fragment } from 'react';
import Header from '../general/Header';
import './loginpage.css';
import { Link } from 'react-router-dom';

const Login = () => {
    const goHome = () => {

    }
    return <Fragment>
        <Header />

        <body style={{ height: '500px' }}>
            <div class="login-title" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', fontSize: '30px' }}>
                Login
            </div>
            <div class="login-container">
                <form class="login-form">
                    <div class="login-input">
                        <input type="text" placeholder="Username" />
                    </div>
                    <div class="login-input">
                        <input type="password" placeholder="Password" />
                    </div>
                    <div className="login-input">
                        <div className="dropdown">
                            <div className="custom-select" style={{ width: 300 }}>
                                <select style={{ width: '310px', fontFamily: 'Montserrat', fontSize: '13px', height: '35px' }}>
                                    <option value="0">Select type:</option>
                                    <option value="1">Doctor</option>
                                    <option value="2">Patient</option>
                                    <option value="3">Hospital</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div class="login-button">
                        <button className='login-btn' onClick={goHome}>Login</button>
                    </div>
                    <div class="login-link">
                        <Link to="/signup">
                            <div className="link">Don't have an account? Sign up</div>
                        </Link>
                    </div>
                </form>
            </div>
        </body>
    </Fragment>
}

export default Login