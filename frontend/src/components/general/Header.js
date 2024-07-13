import { react, Fragment } from 'react'
import './general.css'
import './header.css'
import img1 from './logo.svg'
import { Link } from 'react-router-dom'

const Header = () => {
    const goHome = () => {
        window.location = '/home'
    }
    return <Fragment>
        <header>
            <div class="header-icons">
                <div class="logo-section">
                    {/* <Link to="/home" className="link-style"></Link> */}
                    <img src={img1} alt="logo" className="logo-icon" onClick={goHome} />
                    <div class="description">
                        Personal Healthcare Assistant
                    </div>
                </div>
            </div>
        </header>
    </Fragment>
}

export default Header