import button from '../../images/button_type_close/close.svg';
import { useEffect, useState } from 'react';
import './MobileNavbar.css'

function MobileNavbar(props){
    return (
        <div className='mobile-navbar__container'>
            <div className='mobile-navbar__header'>
                <div className='mobile-navbar__title'>NewsExplorer</div>
                <img src={button} alt='log-out' className='mobile-navbar__close'/>
            </div>
            <div className='mobile-navbar__menu'>
                <h2 className='mobile-navbar__home'>Home</h2>
                <button className='reset-button mobile-navbar__save-button' type='submit'>
                    Sign In
                </button>
            </div>
        </div>

    )
}

export default MobileNavbar;