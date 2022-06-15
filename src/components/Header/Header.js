import { NavLink } from 'react-router-dom';
import './Header.css';
import logOutBlack from '../../images/header__out-symbol/out-black.svg'
import logOutWhite from '../../images/header__out-symbol/out-white.svg'
import menu from '../../images/header__menu/menu.svg';

function Header({ isLoggedIn, location, openLogPopup, loggOut, username }){
    return (
        <div className='header__container'>
            <div className='header__title'>NewsExplorer</div>
            <img src={menu} alt='log-out' className='header__menu'/>
            <div className='header__navbar'>
                <NavLink to='/' className={`header__redirect-home  
                               ${location === '/saved-news' ? 'header__redirect-home_black' : 'header__redirect-home_active'}
                               `}>Home</NavLink>
                {isLoggedIn 
                  ? <NavLink to='/saved-news' className={`header__redirect-saved
                                  ${location === '/saved-news' ? 'header__redirect-saved_active' : ''
                                  }`}>Saved Articles</NavLink>
                  : ''
                }
                {isLoggedIn === true ? <div  onClick={loggOut} className={`header__log-out ${location === '/saved-news' ? 'header__log-out_saved' : ''}`}>
                    <p className={`header__user ${location == '/saved-news' ? 'header__user_saved' : 'header__user_main'}`}>
                       {username}
                    </p>
                    <img src={location === '/saved-news' ? logOutBlack : logOutWhite} alt='log-out' className='header__out-symbol'/>
                </div> : <p onClick={openLogPopup}
                className={`header__log ${location === '/saved-news' ? 'header__log_saved-route' : ''}`}>Sign In</p>}
            </div>
        </div>
    )
}

export default Header;
