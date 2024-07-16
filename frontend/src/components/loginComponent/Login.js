import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Header from '../general/Header';
import './loginpage.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userType, setUserType] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:3001/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password, userType }),
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('userId', JSON.stringify(data.userId)); // Save user info in localStorage
                localStorage.setItem('userType', data.userType); // Save userType as a string

                console.log('User type:', data.userType);
                console.log('User ID:', data.userId);

                if (data.userType.toLowerCase() === 'doctor') {
                    navigate(`/${data.userId}/doctorHome`);
                } else if (data.userType.toLowerCase() === 'patient') {
                    navigate(`/${data.userId}/home`);
                } else if (data.userType.toLowerCase() === 'hospital') {
                    navigate(`/${data.userId}/hospitalHome`);
                }
            } else {
                const data = await response.json();
                alert(data.message);
            }
        } catch (error) {
            console.error('Error logging in:', error);
            alert('An error occurred during login.');
        }
    };

    return (
        <React.Fragment>
            <Header />
            <div style={{ height: '500px' }}>
                <div className="login-title" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', fontSize: '30px' }}>
                    Login
                </div>
                <div className="login-container">
                    <form className="login-form" onSubmit={handleLogin}>
                        <div className="login-input">
                            <input
                                type="text"
                                placeholder="User email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="login-input">
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="login-input">
                            <div className="dropdown">
                                <div className="custom-select" style={{ width: 300 }}>
                                    <select
                                        style={{ width: '310px', fontFamily: 'Montserrat', fontSize: '13px', height: '35px' }}
                                        value={userType}
                                        onChange={(e) => setUserType(e.target.value)}
                                    >
                                        <option value="0">Select type:</option>
                                        <option value="doctor">Doctor</option>
                                        <option value="patient">Patient</option>
                                        <option value="hospital">Hospital</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="login-button">
                            <button className="login-btn">Login</button>
                        </div>
                        <div className="login-link">
                            <Link to="/patient/register">
                                <div className="link">Don't have an account? Sign up</div>
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </React.Fragment>
    );
};
export default Login;
