import React from 'react'
import { Fragment } from 'react'
import Header from '../general/Header'

const AboutUs = () => {
    return <Fragment>
        <Header />
        <div className="page-container">
            <h1 align="center">
                About Us
            </h1>
            <div className="body-container">
                <p>
                    We are a team of developers who are passionate about making healthcare more accessible to everyone.
                    Our goal is to provide a platform where patients can easily find doctors, hospitals, and other healthcare services.
                    We believe that everyone should have access to quality healthcare, and we are committed to making that a reality.
                </p>
                <div style={{paddingTop:'30px', fontSize:'14px'}}>
                    <h2>Team Members:</h2>
                    <ul>
                        <li>
                            <b>Anika Morshed</b>
                            <p>
                                CSE, BUET
                            </p>
                        </li>
                        <li>
                            <b>Atika Tabassum Suchi</b>
                            <p>
                                CSE, BUET
                            </p>
                        </li>
                        <li>
                            <b>Fariha Ifrat</b>
                            <p>
                                CSE, BUET
                            </p>
                        </li>
                        <li>
                            <b>Nabiha Tahseen Promi</b>
                            <p>
                                CSE, BUET
                            </p>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </Fragment>
}

export default AboutUs