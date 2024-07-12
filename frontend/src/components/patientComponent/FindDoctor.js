import { React, Fragment } from 'react'
import '../general/general.css';
import '../general/header.css';
import img1 from '../general/logo.svg';
import img2 from '../general/user.svg';

const FindDoctor = () => {
    return <Fragment>
        <header>
            <div class="header-icons">
                <div class="logo-section">
                    <img src={img1} alt="logo" className="logo-icon" />
                    <div class="description">
                        Personal Healthcare Assistant
                    </div>
                </div>
                <button class="user-dashboard" >
                    <div class="user-section">
                        <img src={img2} alt="user" className="user-icon" />
                    </div>
                </button>
            </div>
        </header>
        <div>FindDoctor</div>
    </Fragment>
}

export default FindDoctor