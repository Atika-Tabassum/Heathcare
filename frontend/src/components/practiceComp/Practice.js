import React, { Fragment } from 'react'
import './practice.css'
const Practice = () => {
    return <Fragment>
        <div className='login--container'>
            <div className='login--box'>
                <div className='login--inputs'>
                    <div className='login--name--input'>
                        <div style={{backgroundColor:'white', display:'inline-flex'}}>
                            Name:
                        </div>
                        <div>
                            <input className='input--name'
                                placeholder='Name'
                                style={{
                                    WebkitBackdropFilter: 'blur(5px)',
                                    backdropFilter: 'blur(5px)'
                                }}
                            >
                            </input>
                        </div>
                        <div className='login--password-input'>
                            <div>
                                password:
                            </div>
                            <div>
                                <input className='input--password' placeholder='password'>
                                </input>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </Fragment>
}

export default Practice