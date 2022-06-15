import { NavLink } from 'react-router-dom';
import facebookImage from '../../images/footer-container__facebook/Vector.svg';
import githubImage from '../../images/footer-container__git/Vector.svg';
import './Footer.css';

function Footer() {
  return (
    <div className='footer'>
      <p className='footer__rights'>
        &copy; 2022 Supersite, powered by News API
      </p>
      <div className='footer-container'>
        <NavLink to='' className='footer-container__home'>Home</NavLink>
        <a href='https://practicum.com/' className='footer-container__practicum'>Practicum by Yandex</a>
        <div className='footer__social'>
          <a href='https://facebook.com' className='footer__link'>
            <img
              src={githubImage}
              alt='Facebook symbol'
              className='footer-container__git'
            ></img>
          </a>
          <a href='https://github.com/leprinx' className='footer__link'>
            <img
              src={facebookImage}
              alt='GitHub symbol'
              className='footer-container__facebook'
            ></img>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Footer;
