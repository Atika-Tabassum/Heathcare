import { react, Fragment } from 'react'
import './general.css'
import './header.css'
import img1 from './logo.svg'

const Header = () => {
    return <Fragment>
        <header>
            <div class="header-icons">
                <div class="logo-section">
                    <img src={img1} alt="logo" className="logo-icon" />
                    <div class="description">
                        Personal Healthcare Assistant
                    </div>
                </div>
            </div>
        </header>
    </Fragment>
}

export default Header